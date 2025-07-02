import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { 
  successResponse, 
  errorResponse,
  handleApiError,
  getUserFromRequest,
  getSessionId,
  validateRequestBody
} from '@/lib/api-utils'
import { addToCartSchema, updateCartItemSchema } from '@/lib/validations'

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request)
    const sessionId = getSessionId(request)

    let query = supabaseAdmin
      .from('cart')
      .select(`
        *,
        products:product_id (
          id,
          title,
          handle,
          price,
          images,
          inventory_quantity
        )
      `)

    if (user) {
      query = query.eq('user_id', user.id)
    } else {
      query = query.eq('session_id', sessionId)
    }

    const { data: cartItems, error } = await query

    if (error) {
      throw new Error(error.message)
    }

    // Format cart items
    const formattedItems = cartItems?.map(item => ({
      id: item.id,
      quantity: item.quantity,
      product: {
        id: item.products.id,
        title: item.products.title,
        handle: item.products.handle,
        price: item.products.price,
        image: item.products.images?.[0] || null,
        inventory_quantity: item.products.inventory_quantity
      },
      variant_id: item.variant_id
    })) || []

    // Calculate totals
    const subtotal = formattedItems.reduce((total, item) => 
      total + (item.product.price * item.quantity), 0
    )

    return successResponse({
      items: formattedItems,
      itemCount: formattedItems.reduce((total, item) => total + item.quantity, 0),
      subtotal: subtotal.toFixed(2),
      total: subtotal.toFixed(2) // Add tax calculation later
    })
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = validateRequestBody(addToCartSchema, body)
    
    const user = await getUserFromRequest(request)
    const sessionId = getSessionId(request)

    // Check if product exists and is available
    const { data: product, error: productError } = await supabaseAdmin
      .from('products')
      .select('id, inventory_quantity, available')
      .eq('id', validatedData.product_id)
      .single()

    if (productError || !product) {
      return errorResponse('Product not found')
    }

    if (!product.available) {
      return errorResponse('Product is not available')
    }

    if (product.inventory_quantity < validatedData.quantity) {
      return errorResponse('Insufficient inventory')
    }

    // Check if item already exists in cart
    let existingItemQuery = supabaseAdmin
      .from('cart')
      .select('*')
      .eq('product_id', validatedData.product_id)

    if (validatedData.variant_id) {
      existingItemQuery = existingItemQuery.eq('variant_id', validatedData.variant_id)
    }

    if (user) {
      existingItemQuery = existingItemQuery.eq('user_id', user.id)
    } else {
      existingItemQuery = existingItemQuery.eq('session_id', sessionId)
    }

    const { data: existingItem } = await existingItemQuery.single()

    if (existingItem) {
      // Update existing item
      const newQuantity = existingItem.quantity + validatedData.quantity

      if (newQuantity > product.inventory_quantity) {
        return errorResponse('Insufficient inventory')
      }

      const { error } = await supabaseAdmin
        .from('cart')
        .update({ 
          quantity: newQuantity,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingItem.id)

      if (error) {
        throw new Error(error.message)
      }
    } else {
      // Create new item
      const { error } = await supabaseAdmin
        .from('cart')
        .insert({
          user_id: user?.id || null,
          session_id: user ? null : sessionId,
          product_id: validatedData.product_id,
          variant_id: validatedData.variant_id || null,
          quantity: validatedData.quantity
        })

      if (error) {
        throw new Error(error.message)
      }
    }

    return successResponse(null, 'Item added to cart')
  } catch (error) {
    return handleApiError(error)
  }
}
