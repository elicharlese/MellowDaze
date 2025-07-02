import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { 
  successResponse, 
  errorResponse,
  notFoundResponse,
  handleApiError,
  getUserFromRequest,
  getSessionId,
  validateRequestBody
} from '@/lib/api-utils'
import { updateCartItemSchema } from '@/lib/validations'

interface RouteParams {
  params: {
    id: string
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params
    const body = await request.json()
    const validatedData = validateRequestBody(updateCartItemSchema, body)
    
    const user = await getUserFromRequest(request)
    const sessionId = getSessionId(request)

    // Get cart item
    let query = supabaseAdmin
      .from('cart')
      .select('*, products:product_id (inventory_quantity)')
      .eq('id', id)

    if (user) {
      query = query.eq('user_id', user.id)
    } else {
      query = query.eq('session_id', sessionId)
    }

    const { data: cartItem, error } = await query.single()

    if (error || !cartItem) {
      return notFoundResponse('Cart item not found')
    }

    if (validatedData.quantity === 0) {
      // Remove item
      const { error: deleteError } = await supabaseAdmin
        .from('cart')
        .delete()
        .eq('id', id)

      if (deleteError) {
        throw new Error(deleteError.message)
      }

      return successResponse(null, 'Item removed from cart')
    } else {
      // Update quantity
      if (validatedData.quantity > cartItem.products.inventory_quantity) {
        return errorResponse('Insufficient inventory')
      }

      const { error: updateError } = await supabaseAdmin
        .from('cart')
        .update({ 
          quantity: validatedData.quantity,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)

      if (updateError) {
        throw new Error(updateError.message)
      }

      return successResponse(null, 'Cart updated')
    }
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params
    
    const user = await getUserFromRequest(request)
    const sessionId = getSessionId(request)

    let query = supabaseAdmin
      .from('cart')
      .delete()
      .eq('id', id)

    if (user) {
      query = query.eq('user_id', user.id)
    } else {
      query = query.eq('session_id', sessionId)
    }

    const { error } = await query

    if (error) {
      throw new Error(error.message)
    }

    return successResponse(null, 'Item removed from cart')
  } catch (error) {
    return handleApiError(error)
  }
}
