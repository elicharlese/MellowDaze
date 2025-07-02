import { NextRequest } from 'next/server'
import { 
  successResponse, 
  handleApiError,
  getUserFromRequest
} from '@/lib/api-utils'

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request)
    
    if (!user) {
      return successResponse(null)
    }

    // Return user without sensitive data
    const { password_hash, ...userWithoutPassword } = user

    return successResponse(userWithoutPassword)
  } catch (error) {
    return handleApiError(error)
  }
}
