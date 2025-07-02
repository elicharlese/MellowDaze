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
    productId: string
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireAuth(request)
    const { productId } = params

    const { error } = await supabaseAdmin
      .from('wishlist')
      .delete()
      .eq('user_id', user.id)
      .eq('product_id', productId)

    if (error) {
      throw new Error(error.message)
    }

    return successResponse(null, 'Product removed from wishlist')
  } catch (error) {
    if (error instanceof Error && error.message.includes('Authentication required')) {
      return unauthorizedResponse()
    }
    return handleApiError(error)
  }
}
