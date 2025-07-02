import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { 
  successResponse, 
  notFoundResponse,
  unauthorizedResponse,
  handleApiError,
  requireAuth
} from '@/lib/api-utils'

interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireAuth(request)
    const { id } = params

    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (error || !order) {
      return notFoundResponse('Order not found')
    }

    return successResponse(order)
  } catch (error) {
    if (error instanceof Error && error.message.includes('Authentication required')) {
      return unauthorizedResponse()
    }
    return handleApiError(error)
  }
}
