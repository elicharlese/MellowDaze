import { cache } from "react"

// Updated implementation that uses our backend API
// This provides a bridge between the frontend components and our database

const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export const getProducts = cache(async ({ first = 10, category = "", search = "", sort = "" } = {}) => {
  try {
    const params = new URLSearchParams({
      limit: first.toString(),
      ...(category && { category }),
      ...(search && { search }),
      ...(sort && { sort })
    })

    const response = await fetch(`${API_BASE_URL}/api/products?${params}`, {
      next: { revalidate: 300 } // Cache for 5 minutes
    })

    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }

    const result = await response.json()
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch products')
    }

    return result.data.data || []
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
})

export const getProduct = cache(async (handle: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/${handle}`, {
      next: { revalidate: 300 }
    })

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error('Failed to fetch product')
    }

    const result = await response.json()
    
    if (!result.success) {
      return null
    }

    return result.data
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
})

export const getRelatedProducts = cache(async (currentProductId: string) => {
  try {
    // First get the current product to find its handle
    const response = await fetch(`${API_BASE_URL}/api/products`, {
      next: { revalidate: 300 }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }

    const result = await response.json()
    
    if (!result.success) {
      return []
    }

    const currentProduct = result.data.data.find((p: any) => p.id === currentProductId)
    
    if (!currentProduct) {
      return []
    }

    const relatedResponse = await fetch(`${API_BASE_URL}/api/products/${currentProduct.handle}/related`, {
      next: { revalidate: 300 }
    })

    if (!relatedResponse.ok) {
      return []
    }

    const relatedResult = await relatedResponse.json()
    
    return relatedResult.success ? relatedResult.data : []
  } catch (error) {
    console.error('Error fetching related products:', error)
    return []
  }
})

export const getCollection = cache(async (handle: string) => {
  try {
    // Collections are essentially categories in our system
    const response = await fetch(`${API_BASE_URL}/api/products?category=${handle}`, {
      next: { revalidate: 300 }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch collection')
    }

    const result = await response.json()
    
    if (!result.success) {
      return {
        title: handle.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        products: { nodes: [] }
      }
    }

    return {
      title: handle.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      products: { nodes: result.data.data || [] }
    }
  } catch (error) {
    console.error('Error fetching collection:', error)
    return {
      title: handle.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      products: { nodes: [] }
    }
  }
})
