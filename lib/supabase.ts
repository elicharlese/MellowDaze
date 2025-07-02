import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client for frontend operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for backend operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          first_name?: string | null
          last_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          handle: string
          title: string
          description: string | null
          description_html: string | null
          price: number
          compare_at_price: number | null
          category: string
          tags: string[]
          featured: boolean
          available: boolean
          inventory_quantity: number
          images: string[]
          variants: any[]
          features: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          handle: string
          title: string
          description?: string | null
          description_html?: string | null
          price: number
          compare_at_price?: number | null
          category: string
          tags?: string[]
          featured?: boolean
          available?: boolean
          inventory_quantity?: number
          images?: string[]
          variants?: any[]
          features?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          handle?: string
          title?: string
          description?: string | null
          description_html?: string | null
          price?: number
          compare_at_price?: number | null
          category?: string
          tags?: string[]
          featured?: boolean
          available?: boolean
          inventory_quantity?: number
          images?: string[]
          variants?: any[]
          features?: string[]
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total_amount: number
          shipping_address: any
          billing_address: any
          payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
          payment_method: string
          items: any[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total_amount: number
          shipping_address: any
          billing_address: any
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
          payment_method: string
          items: any[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total_amount?: number
          shipping_address?: any
          billing_address?: any
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
          payment_method?: string
          items?: any[]
          updated_at?: string
        }
      }
      wishlist: {
        Row: {
          id: string
          user_id: string
          product_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string
        }
      }
      cart: {
        Row: {
          id: string
          user_id: string | null
          session_id: string | null
          product_id: string
          variant_id: string | null
          quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          session_id?: string | null
          product_id: string
          variant_id?: string | null
          quantity: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          session_id?: string | null
          product_id?: string
          variant_id?: string | null
          quantity?: number
          updated_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string | null
          author: string
          published: boolean
          featured_image: string | null
          tags: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt?: string | null
          author: string
          published?: boolean
          featured_image?: string | null
          tags?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string | null
          author?: string
          published?: boolean
          featured_image?: string | null
          tags?: string[]
          updated_at?: string
        }
      }
    }
  }
}
