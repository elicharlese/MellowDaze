import { useState, useEffect, useCallback } from 'react'
import { apiClient } from '@/lib/api-client'
import { useToast } from '@/hooks/use-toast'

interface Product {
  id: string
  handle: string
  title: string
  description?: string
  price: number
  compare_at_price?: number
  category: string
  tags: string[]
  featured: boolean
  available: boolean
  inventory_quantity: number
  images: string[]
  variants: any[]
  features: string[]
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  featuredImage?: {
    url: string
    altText: string
  }
}

interface ProductFilters {
  category?: string
  features?: string[]
  price_min?: number
  price_max?: number
  search?: string
  sort?: string
  limit?: number
  offset?: number
}

interface ProductsState {
  products: Product[]
  isLoading: boolean
  error: string | null
  pagination: {
    total: number
    limit: number
    offset: number
    pages: number
    current_page: number
    has_next: boolean
    has_prev: boolean
  } | null
}

export function useProducts(initialFilters?: ProductFilters) {
  const [state, setState] = useState<ProductsState>({
    products: [],
    isLoading: true,
    error: null,
    pagination: null,
  })
  const [filters, setFilters] = useState<ProductFilters>(initialFilters || {})
  const { toast } = useToast()

  const loadProducts = useCallback(async (filterParams?: ProductFilters) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))
      
      const params = filterParams || filters
      const response = await apiClient.getProducts(params)
      
      if (response.success && response.data) {
        setState({
          products: response.data,
          isLoading: false,
          error: null,
          pagination: response.pagination,
        })
      } else {
        throw new Error('Failed to load products')
      }
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }))
      
      toast({
        title: "Failed to load products",
        description: error.message,
        variant: "destructive",
      })
    }
  }, [filters, toast])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  const updateFilters = useCallback((newFilters: Partial<ProductFilters>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    loadProducts(updatedFilters)
  }, [filters, loadProducts])

  const resetFilters = useCallback(() => {
    const resetFilters = { limit: 20, offset: 0 }
    setFilters(resetFilters)
    loadProducts(resetFilters)
  }, [loadProducts])

  const loadMore = useCallback(() => {
    if (state.pagination?.has_next) {
      const newOffset = (state.pagination.offset || 0) + (state.pagination.limit || 20)
      updateFilters({ offset: newOffset })
    }
  }, [state.pagination, updateFilters])

  const search = useCallback((query: string) => {
    updateFilters({ search: query, offset: 0 })
  }, [updateFilters])

  const sortBy = useCallback((sort: string) => {
    updateFilters({ sort, offset: 0 })
  }, [updateFilters])

  const filterByCategory = useCallback((category: string) => {
    updateFilters({ category, offset: 0 })
  }, [updateFilters])

  return {
    ...state,
    filters,
    updateFilters,
    resetFilters,
    loadMore,
    search,
    sortBy,
    filterByCategory,
    refresh: () => loadProducts(),
  }
}

// Hook for single product
export function useProduct(handle: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const response = await apiClient.getProduct(handle)
        
        if (response.success && response.data) {
          setProduct(response.data)
        } else {
          throw new Error('Product not found')
        }
      } catch (error: any) {
        setError(error.message)
        toast({
          title: "Failed to load product",
          description: error.message,
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (handle) {
      loadProduct()
    }
  }, [handle, toast])

  return {
    product,
    isLoading,
    error,
  }
}

// Hook for related products
export function useRelatedProducts(handle: string) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadRelatedProducts = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const response = await apiClient.getRelatedProducts(handle)
        
        if (response.success && response.data) {
          setProducts(response.data)
        } else {
          setProducts([])
        }
      } catch (error: any) {
        setError(error.message)
        setProducts([])
      } finally {
        setIsLoading(false)
      }
    }

    if (handle) {
      loadRelatedProducts()
    }
  }, [handle])

  return {
    products,
    isLoading,
    error,
  }
}
