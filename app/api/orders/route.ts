import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { 
  successResponse, 
  errorResponse,
  unauthorizedResponse,
  handleApiError,
  requireAuth,
  validateRequestBody,
  getPaginationParams,
  createPaginationResponse
} from '@/lib/api-utils'
import { createOrderSchema } from '@/lib/validations'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request)
    const { searchParams } = new URL(request.url)
    const { limit, offset } = getPaginationParams(searchParams)

    const { data: orders, error, count } = await supabaseAdmin
      .from('orders')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      throw new Error(error.message)
    }

    return successResponse(
      createPaginationResponse(orders || [], count || 0, limit, offset)
    )
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
    const validatedData = validateRequestBody(createOrderSchema, body)

    // Validate that the user_id matches the authenticated user
    if (validatedData.user_id !== user.id) {
      return errorResponse('Invalid user ID')
    }

    // Validate inventory for all items
    for (const item of validatedData.items) {
      const { data: product, error } = await supabaseAdmin
        .from('products')
        .select('inventory_quantity, available')
        .eq('id', item.product_id)
        .single()

      if (error || !product) {
        return errorResponse(`Product ${item.product_id} not found`)
      }

      if (!product.available) {
        return errorResponse(`Product ${item.product_id} is not available`)
      }

      if (product.inventory_quantity < item.quantity) {
        return errorResponse(`Insufficient inventory for product ${item.product_id}`)
      }
    }

    // Create order
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        user_id: validatedData.user_id,
        total_amount: validatedData.total_amount,
        shipping_address: validatedData.shipping_address,
        billing_address: validatedData.billing_address,
        payment_method: validatedData.payment_method,
        items: validatedData.items,
        status: 'pending',
        payment_status: 'pending'
      })
      .select()
      .single()

    if (orderError) {
      throw new Error(orderError.message)
    }

    // Update inventory
    for (const item of validatedData.items) {
      const { error: inventoryError } = await supabaseAdmin
        .rpc('decrement_inventory', {
          product_id: item.product_id,
          quantity: item.quantity
        })

      if (inventoryError) {
        console.error('Failed to update inventory:', inventoryError)
        // In a real app, you might want to implement compensation logic here
      }
    }

    // Clear user's cart
    await supabaseAdmin
      .from('cart')
      .delete()
      .eq('user_id', user.id)

    return successResponse(order, 'Order created successfully')
  } catch (error) {
    if (error instanceof Error && error.message.includes('Authentication required')) {
      return unauthorizedResponse()
    }
    return handleApiError(error)
  }
}
