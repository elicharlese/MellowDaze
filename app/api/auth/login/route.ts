import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { 
  successResponse, 
  errorResponse, 
  handleApiError,
  verifyPassword,
  signToken,
  validateRequestBody
} from '@/lib/api-utils'
import { loginSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = validateRequestBody(loginSchema, body)

    // Get user by email
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('id, email, first_name, last_name, password_hash')
      .eq('email', validatedData.email)
      .single()

    if (error || !user) {
      return errorResponse('Invalid email or password', 401)
    }

    // Verify password
    const isValidPassword = await verifyPassword(validatedData.password, user.password_hash)
    
    if (!isValidPassword) {
      return errorResponse('Invalid email or password', 401)
    }

    // Generate JWT token
    const token = await signToken({ userId: user.id })

    // Return user without password hash
    const { password_hash, ...userWithoutPassword } = user

    return successResponse({
      user: userWithoutPassword,
      token
    }, 'Login successful')
  } catch (error) {
    return handleApiError(error)
  }
}
