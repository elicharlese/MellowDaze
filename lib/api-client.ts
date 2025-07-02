// Client-side API utilities for making requests to our backend

const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

class ApiClient {
  private baseURL: string
  private token: string | null = null
  private sessionId: string | null = null

  constructor() {
    this.baseURL = API_BASE_URL
    
    // Initialize session ID for guest users
    if (typeof window !== 'undefined') {
      this.sessionId = localStorage.getItem('session-id') || this.generateSessionId()
      localStorage.setItem('session-id', this.sessionId)
    }
  }

  private generateSessionId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
  }

  setToken(token: string | null) {
    this.token = token
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('auth-token', token)
        document.cookie = `auth-token=${token}; path=/; max-age=${7 * 24 * 60 * 60}` // 7 days
      } else {
        localStorage.removeItem('auth-token')
        document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      }
    }
  }

  getToken(): string | null {
    if (this.token) return this.token
    
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth-token')
    }
    
    return null
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<{ success: boolean; data?: T; error?: string }> {
    const url = `${this.baseURL}/api${endpoint}`
    const token = this.getToken()

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    if (this.sessionId) {
      headers['x-session-id'] = this.sessionId
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      const result = await response.json()
      return result
    } catch (error) {
      console.error('API request failed:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Request failed'
      }
    }
  }

  // Auth methods
  async login(email: string, password: string) {
    const result = await this.request<{ user: any; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })

    if (result.success && result.data?.token) {
      this.setToken(result.data.token)
    }

    return result
  }

  async register(email: string, password: string, firstName?: string, lastName?: string) {
    const result = await this.request<{ user: any; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ 
        email, 
        password, 
        first_name: firstName, 
        last_name: lastName 
      }),
    })

    if (result.success && result.data?.token) {
      this.setToken(result.data.token)
    }

    return result
  }

  async logout() {
    this.setToken(null)
    return { success: true }
  }

  async getMe() {
    return this.request<any>('/auth/me')
  }

  // Products methods
  async getProducts(filters: {
    category?: string
    features?: string[]
    search?: string
    sort?: string
    limit?: number
    offset?: number
  } = {}) {
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          params.set(key, value.join(','))
        } else {
          params.set(key, value.toString())
        }
      }
    })

    return this.request<any>(`/products?${params}`)
  }

  async getProduct(handle: string) {
    return this.request<any>(`/products/${handle}`)
  }

  async getRelatedProducts(handle: string) {
    return this.request<any[]>(`/products/${handle}/related`)
  }

  // Cart methods
  async getCart() {
    return this.request<any>('/cart')
  }

  async addToCart(productId: string, quantity: number = 1, variantId?: string) {
    return this.request<any>('/cart', {
      method: 'POST',
      body: JSON.stringify({
        product_id: productId,
        quantity,
        variant_id: variantId
      }),
    })
  }

  async updateCartItem(itemId: string, quantity: number) {
    return this.request<any>(`/cart/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    })
  }

  async removeFromCart(itemId: string) {
    return this.request<any>(`/cart/${itemId}`, {
      method: 'DELETE',
    })
  }

  // Wishlist methods
  async getWishlist() {
    return this.request<any[]>('/wishlist')
  }

  async addToWishlist(productId: string) {
    return this.request<any>('/wishlist', {
      method: 'POST',
      body: JSON.stringify({ product_id: productId }),
    })
  }

  async removeFromWishlist(productId: string) {
    return this.request<any>(`/wishlist/${productId}`, {
      method: 'DELETE',
    })
  }

  // Orders methods
  async getOrders(limit?: number, offset?: number) {
    const params = new URLSearchParams()
    if (limit) params.set('limit', limit.toString())
    if (offset) params.set('offset', offset.toString())

    return this.request<any>(`/orders?${params}`)
  }

  async getOrder(orderId: string) {
    return this.request<any>(`/orders/${orderId}`)
  }

  async createOrder(orderData: any) {
    return this.request<any>('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    })
  }

  // Blog methods
  async getBlogPosts(filters: {
    tag?: string
    search?: string
    limit?: number
    offset?: number
  } = {}) {
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.set(key, value.toString())
      }
    })

    return this.request<any>(`/blog?${params}`)
  }

  async getBlogPost(slug: string) {
    return this.request<any>(`/blog/${slug}`)
  }

  // Contact methods
  async submitContactForm(data: {
    name: string
    email: string
    subject: string
    message: string
  }) {
    return this.request<any>('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
}

// Export singleton instance
export const apiClient = new ApiClient()

// Hook for React components
export function useApi() {
  return apiClient
}
