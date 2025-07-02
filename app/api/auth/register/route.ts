import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { 
  successResponse, 
  errorResponse, 
  handleApiError,
  hashPassword,
  signToken,
  validateRequestBody
} from '@/lib/api-utils'
import { createUserSchema } from '@/lib/validations'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = validateRequestBody(createUserSchema, body)

    // Check if user already exists
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', validatedData.email)
      .single()

    if (existingUser) {
      return errorResponse('User already exists with this email')
    }

    // Hash password
    const hashedPassword = await hashPassword(validatedData.password)

    // Create user
    const userId = uuidv4()
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .insert({
        id: userId,
        email: validatedData.email,
        first_name: validatedData.first_name,
        last_name: validatedData.last_name,
        password_hash: hashedPassword,
      })
      .select('id, email, first_name, last_name')
      .single()

    if (error) {
      throw new Error(error.message)
    }

    // Generate JWT token
    const token = await signToken({ userId: user.id })

    return successResponse({
      user,
      token
    }, 'User created successfully')
  } catch (error) {
    return handleApiError(error)
  }
}
