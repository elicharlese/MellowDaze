import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { 
  successResponse, 
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

    // Get the current product to determine category
    const { data: currentProduct } = await supabaseAdmin
      .from('products')
      .select('category')
      .eq('handle', handle)
      .single()

    if (!currentProduct) {
      return successResponse([])
    }

    // Get related products from the same category
    const { data: products, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('category', currentProduct.category)
      .neq('handle', handle)
      .eq('available', true)
      .limit(4)

    if (error) {
      throw new Error(error.message)
    }

    const formattedProducts = products?.map(formatProduct) || []

    return successResponse(formattedProducts)
  } catch (error) {
    return handleApiError(error)
  }
}
