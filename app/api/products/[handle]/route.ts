import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { 
  successResponse, 
  errorResponse, 
  notFoundResponse,
  handleApiError, 
  formatProduct
} from '@/lib/api-utils'

interface RouteParams {
  params: {
    handle: string
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { handle } = params

    if (!handle) {
      return errorResponse('Product handle is required')
    }

    const { data: product, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('handle', handle)
      .eq('available', true)
      .single()

    if (error || !product) {
      return notFoundResponse('Product not found')
    }

    const formattedProduct = formatProduct(product)

    return successResponse(formattedProduct)
  } catch (error) {
    return handleApiError(error)
  }
}
