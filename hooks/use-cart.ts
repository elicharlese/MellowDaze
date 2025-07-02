import { useState, useEffect } from 'react'
import { apiClient } from '@/lib/api-client'
import { useToast } from '@/hooks/use-toast'

interface CartItem {
  id: string
  quantity: number
  product: {
    id: string
    title: string
    handle: string
    price: number
    image: string | null
    inventory_quantity: number
  }
  variant_id?: string
}

interface CartData {
  items: CartItem[]
  itemCount: number
  subtotal: string
  total: string
}

export function useCart() {
  const [cart, setCart] = useState<CartData>({
    items: [],
    itemCount: 0,
    subtotal: '0.00',
    total: '0.00',
  })
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = async () => {
    try {
      setIsLoading(true)
      const response = await apiClient.getCart()
      
      if (response.success && response.data) {
        setCart(response.data)
      }
    } catch (error: any) {
      console.error('Failed to load cart:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const addToCart = async (productId: string, variantId?: string, quantity: number = 1) => {
    try {
      const response = await apiClient.addToCart({
        product_id: productId,
        variant_id: variantId,
        quantity,
      })
      
      if (response.success) {
        await loadCart() // Refresh cart
        toast({
          title: "Added to cart",
          description: "Item has been added to your cart.",
        })
        return { success: true }
      } else {
        throw new Error(response.error || 'Failed to add to cart')
      }
    } catch (error: any) {
      toast({
        title: "Failed to add to cart",
        description: error.message,
        variant: "destructive",
      })
      return { success: false, error: error.message }
    }
  }

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      const response = await apiClient.updateCartItem(itemId, { quantity })
      
      if (response.success) {
        await loadCart() // Refresh cart
        if (quantity === 0) {
          toast({
            title: "Item removed",
            description: "Item has been removed from your cart.",
          })
        } else {
          toast({
            title: "Cart updated",
            description: "Item quantity has been updated.",
          })
        }
        return { success: true }
      } else {
        throw new Error(response.error || 'Failed to update cart')
      }
    } catch (error: any) {
      toast({
        title: "Failed to update cart",
        description: error.message,
        variant: "destructive",
      })
      return { success: false, error: error.message }
    }
  }

  const removeFromCart = async (itemId: string) => {
    try {
      const response = await apiClient.removeFromCart(itemId)
      
      if (response.success) {
        await loadCart() // Refresh cart
        toast({
          title: "Item removed",
          description: "Item has been removed from your cart.",
        })
        return { success: true }
      } else {
        throw new Error(response.error || 'Failed to remove from cart')
      }
    } catch (error: any) {
      toast({
        title: "Failed to remove from cart",
        description: error.message,
        variant: "destructive",
      })
      return { success: false, error: error.message }
    }
  }

  const clearCart = async () => {
    try {
      // Remove all items one by one
      for (const item of cart.items) {
        await apiClient.removeFromCart(item.id)
      }
      await loadCart() // Refresh cart
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart.",
      })
      return { success: true }
    } catch (error: any) {
      toast({
        title: "Failed to clear cart",
        description: error.message,
        variant: "destructive",
      })
      return { success: false, error: error.message }
    }
  }

  return {
    cart,
    isLoading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    refreshCart: loadCart,
  }
}
