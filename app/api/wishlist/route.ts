import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { 
  successResponse, 
  errorResponse,
  unauthorizedResponse,
  handleApiError,
  requireAuth,
  validateRequestBody
} from '@/lib/api-utils'
import { addToWishlistSchema } from '@/lib/validations'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request)

    const { data: wishlistItems, error } = await supabaseAdmin
      .from('wishlist')
      .select(`
        *,
        products:product_id (
          id,
          title,
          handle,
          price,
          images
        )
      `)
      .eq('user_id', user.id)

    if (error) {
      throw new Error(error.message)
    }

    const formattedItems = wishlistItems?.map((item: any) => ({
      id: item.id,
      product: {
        id: item.products.id,
        title: item.products.title,
        handle: item.products.handle,
        price: item.products.price,
        image: item.products.images?.[0] || null
      },
      created_at: item.created_at
    })) || []

    return successResponse(formattedItems)
  } catch (error) {
    if (error instanceof Error && error.message.includes('Authentication required')) {
      return unauthorizedResponse()
    }
    return handleApiError(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request)
    const body = await request.json()
    const validatedData = validateRequestBody(addToWishlistSchema, body)

    // Check if product exists
    const { data: product, error: productError } = await supabaseAdmin
      .from('products')
      .select('id')
      .eq('id', validatedData.product_id)
      .single()

    if (productError || !product) {
      return errorResponse('Product not found')
    }

    // Check if already in wishlist
    const { data: existingItem } = await supabaseAdmin
      .from('wishlist')
      .select('id')
      .eq('user_id', user.id)
      .eq('product_id', validatedData.product_id)
      .single()

    if (existingItem) {
      return errorResponse('Product already in wishlist')
    }

    // Add to wishlist
    const { error } = await supabaseAdmin
      .from('wishlist')
      .insert({
        user_id: user.id,
        product_id: validatedData.product_id
      })

    if (error) {
      throw new Error(error.message)
    }

    return successResponse(null, 'Product added to wishlist')
  } catch (error) {
    if (error instanceof Error && error.message.includes('Authentication required')) {
      return unauthorizedResponse()
    }
    return handleApiError(error)
  }
}
