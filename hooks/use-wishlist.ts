import { useState, useEffect } from 'react'
import { apiClient } from '@/lib/api-client'
import { useToast } from '@/hooks/use-toast'

interface WishlistItem {
  id: string
  product: {
    id: string
    title: string
    handle: string
    price: number
    image: string | null
  }
  created_at: string
}

export function useWishlist() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadWishlist()
  }, [])

  const loadWishlist = async () => {
    try {
      setIsLoading(true)
      const response = await apiClient.getWishlist()
      
      if (response.success && response.data) {
        setWishlist(response.data)
      }
    } catch (error: any) {
      console.error('Failed to load wishlist:', error)
      // Don't show error toast for unauthenticated users
      if (!error.message.includes('Authentication required')) {
        toast({
          title: "Failed to load wishlist",
          description: error.message,
          variant: "destructive",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const addToWishlist = async (product: {
    id: string
    title: string
    handle: string
    price: number
    image: string | null
  }) => {
    try {
      const response = await apiClient.addToWishlist({ product_id: product.id })
      
      if (response.success) {
        await loadWishlist() // Refresh wishlist
        toast({
          title: "Added to wishlist",
          description: `${product.title} has been added to your wishlist.`,
        })
        return { success: true }
      } else {
        throw new Error(response.error || 'Failed to add to wishlist')
      }
    } catch (error: any) {
      toast({
        title: "Failed to add to wishlist",
        description: error.message,
        variant: "destructive",
      })
      return { success: false, error: error.message }
    }
  }

  const removeFromWishlist = async (productId: string) => {
    try {
      const response = await apiClient.removeFromWishlist(productId)
      
      if (response.success) {
        await loadWishlist() // Refresh wishlist
        toast({
          title: "Removed from wishlist",
          description: "Item has been removed from your wishlist.",
        })
        return { success: true }
      } else {
        throw new Error(response.error || 'Failed to remove from wishlist')
      }
    } catch (error: any) {
      toast({
        title: "Failed to remove from wishlist",
        description: error.message,
        variant: "destructive",
      })
      return { success: false, error: error.message }
    }
  }

  const isInWishlist = (productId: string): boolean => {
    return wishlist.some(item => item.product.id === productId)
  }

  const toggleWishlist = async (product: {
    id: string
    title: string
    handle: string
    price: number
    image: string | null
  }) => {
    if (isInWishlist(product.id)) {
      return removeFromWishlist(product.id)
    } else {
      return addToWishlist(product)
    }
  }

  return {
    wishlist,
    isLoading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    refreshWishlist: loadWishlist,
  }
}
