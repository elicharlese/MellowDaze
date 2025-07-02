import { z } from 'zod'

// User schemas
export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
})

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

// Product schemas
export const productSchema = z.object({
  id: z.string().uuid(),
  handle: z.string(),
  title: z.string(),
  description: z.string().optional(),
  description_html: z.string().optional(),
  price: z.number().positive(),
  compare_at_price: z.number().positive().optional(),
  category: z.string(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  available: z.boolean().default(true),
  inventory_quantity: z.number().int().min(0).default(0),
  images: z.array(z.string()).default([]),
  variants: z.array(z.any()).default([]),
  features: z.array(z.string()).default([]),
})

export const createProductSchema = productSchema.omit({ id: true })

export const updateProductSchema = createProductSchema.partial()

// Order schemas
export const addressSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  address1: z.string(),
  address2: z.string().optional(),
  city: z.string(),
  province: z.string(),
  zip: z.string(),
  country: z.string(),
  phone: z.string().optional(),
})

export const orderItemSchema = z.object({
  product_id: z.string().uuid(),
  variant_id: z.string().optional(),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
  title: z.string(),
})

export const orderSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
  total_amount: z.number().positive(),
  shipping_address: addressSchema,
  billing_address: addressSchema,
  payment_status: z.enum(['pending', 'paid', 'failed', 'refunded']),
  payment_method: z.string(),
  items: z.array(orderItemSchema),
})

export const createOrderSchema = z.object({
  user_id: z.string().uuid(),
  total_amount: z.number().positive(),
  shipping_address: addressSchema,
  billing_address: addressSchema,
  payment_method: z.string(),
  items: z.array(orderItemSchema),
})

// Cart schemas
export const cartItemSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid().optional(),
  session_id: z.string().optional(),
  product_id: z.string().uuid(),
  variant_id: z.string().optional(),
  quantity: z.number().int().positive(),
})

export const addToCartSchema = z.object({
  product_id: z.string().uuid(),
  variant_id: z.string().optional(),
  quantity: z.number().int().positive().default(1),
})

export const updateCartItemSchema = z.object({
  quantity: z.number().int().min(0),
})

// Wishlist schemas
export const wishlistItemSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  product_id: z.string().uuid(),
})

export const addToWishlistSchema = z.object({
  product_id: z.string().uuid(),
})

// Blog schemas
export const blogPostSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string().optional(),
  author: z.string(),
  published: z.boolean().default(false),
  featured_image: z.string().optional(),
  tags: z.array(z.string()).default([]),
})

export const createBlogPostSchema = blogPostSchema.omit({ id: true })

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(10),
})

// Product filters schema
export const productFiltersSchema = z.object({
  category: z.string().optional(),
  features: z.array(z.string()).optional(),
  price_min: z.number().positive().optional(),
  price_max: z.number().positive().optional(),
  search: z.string().optional(),
  sort: z.enum(['title', 'price_asc', 'price_desc', 'created_at']).optional(),
  limit: z.number().int().positive().max(100).default(20),
  offset: z.number().int().min(0).default(0),
})

// API Response schemas
export const apiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  message: z.string().optional(),
  error: z.string().optional(),
})

export const paginatedResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(z.any()),
  pagination: z.object({
    total: z.number(),
    limit: z.number(),
    offset: z.number(),
    pages: z.number(),
  }),
})

// Type exports
export type User = z.infer<typeof userSchema>
export type CreateUser = z.infer<typeof createUserSchema>
export type Login = z.infer<typeof loginSchema>
export type Product = z.infer<typeof productSchema>
export type CreateProduct = z.infer<typeof createProductSchema>
export type UpdateProduct = z.infer<typeof updateProductSchema>
export type Order = z.infer<typeof orderSchema>
export type CreateOrder = z.infer<typeof createOrderSchema>
export type CartItem = z.infer<typeof cartItemSchema>
export type AddToCart = z.infer<typeof addToCartSchema>
export type UpdateCartItem = z.infer<typeof updateCartItemSchema>
export type WishlistItem = z.infer<typeof wishlistItemSchema>
export type AddToWishlist = z.infer<typeof addToWishlistSchema>
export type BlogPost = z.infer<typeof blogPostSchema>
export type CreateBlogPost = z.infer<typeof createBlogPostSchema>
export type ContactForm = z.infer<typeof contactFormSchema>
export type ProductFilters = z.infer<typeof productFiltersSchema>
export type ApiResponse = z.infer<typeof apiResponseSchema>
export type PaginatedResponse = z.infer<typeof paginatedResponseSchema>
