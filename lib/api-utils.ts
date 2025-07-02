import { NextResponse } from 'next/server'
import { supabaseAdmin } from './supabase'
import { SignJWT, jwtVerify } from 'jose'
import bcrypt from 'bcryptjs'

// JWT utilities
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret')

export async function signToken(payload: any, expirationTime = '7d') {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch (error) {
    return null
  }
}

// Password utilities
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

// API Response utilities
export function successResponse(data?: any, message?: string) {
  return NextResponse.json({
    success: true,
    data,
    message,
  })
}

export function errorResponse(error: string, status = 400) {
  return NextResponse.json({
    success: false,
    error,
  }, { status })
}

export function unauthorizedResponse(message = 'Unauthorized') {
  return NextResponse.json({
    success: false,
    error: message,
  }, { status: 401 })
}

export function notFoundResponse(message = 'Not found') {
  return NextResponse.json({
    success: false,
    error: message,
  }, { status: 404 })
}

export function serverErrorResponse(message = 'Internal server error') {
  return NextResponse.json({
    success: false,
    error: message,
  }, { status: 500 })
}

// Auth utilities
export async function getUserFromRequest(request: Request) {
  try {
    const authorization = request.headers.get('Authorization')
    if (!authorization?.startsWith('Bearer ')) {
      return null
    }

    const token = authorization.substring(7)
    const payload = await verifyToken(token)
    
    if (!payload?.userId) {
      return null
    }

    const { data: user } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', payload.userId)
      .single()

    return user
  } catch (error) {
    return null
  }
}

export async function requireAuth(request: Request) {
  const user = await getUserFromRequest(request)
  if (!user) {
    throw new Error('Authentication required')
  }
  return user
}

// Pagination utilities
export function getPaginationParams(searchParams: URLSearchParams) {
  const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100)
  const offset = Math.max(parseInt(searchParams.get('offset') || '0'), 0)
  const page = Math.floor(offset / limit) + 1
  
  return { limit, offset, page }
}

export function createPaginationResponse(data: any[], total: number, limit: number, offset: number) {
  const pages = Math.ceil(total / limit)
  
  return {
    success: true,
    data,
    pagination: {
      total,
      limit,
      offset,
      pages,
      current_page: Math.floor(offset / limit) + 1,
      has_next: offset + limit < total,
      has_prev: offset > 0,
    }
  }
}

// Validation utilities
export function validateRequestBody(schema: any, body: any) {
  try {
    return schema.parse(body)
  } catch (error: any) {
    throw new Error(`Validation error: ${error.message}`)
  }
}

// Session utilities
export function getSessionId(request: Request): string {
  const sessionId = request.headers.get('x-session-id') || generateSessionId()
  return sessionId
}

export function generateSessionId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// Product utilities
export function formatProduct(product: any) {
  return {
    ...product,
    priceRange: {
      minVariantPrice: {
        amount: product.price.toString(),
        currencyCode: 'USD'
      }
    },
    featuredImage: product.images?.[0] ? {
      url: product.images[0],
      altText: product.title
    } : null,
    images: {
      nodes: product.images?.map((url: string, index: number) => ({
        id: `image-${index}`,
        url,
        altText: product.title
      })) || []
    },
    variants: {
      nodes: product.variants || [{
        id: `variant-${product.id}`,
        title: 'Default Title',
        price: {
          amount: product.price.toString(),
          currencyCode: 'USD'
        },
        availableForSale: product.available,
        quantityAvailable: product.inventory_quantity
      }]
    }
  }
}

// Error handling
export function handleApiError(error: any) {
  console.error('API Error:', error)
  
  if (error.message.includes('Validation error')) {
    return errorResponse(error.message, 400)
  }
  
  if (error.message.includes('Authentication required')) {
    return unauthorizedResponse()
  }
  
  if (error.message.includes('Not found')) {
    return notFoundResponse()
  }
  
  return serverErrorResponse('An unexpected error occurred')
}

// File upload utilities
export function validateImageFile(file: File) {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
  const maxSize = 5 * 1024 * 1024 // 5MB
  
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG, and WebP images are allowed.')
  }
  
  if (file.size > maxSize) {
    throw new Error('File size too large. Maximum size is 5MB.')
  }
  
  return true
}

// URL utilities
export function createProductUrl(handle: string) {
  return `/products/${handle}`
}

export function createSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Cache utilities
export function getCacheKey(prefix: string, ...parts: string[]) {
  return [prefix, ...parts].join(':')
}

export function setCacheHeaders(response: NextResponse, maxAge = 300) {
  response.headers.set('Cache-Control', `public, max-age=${maxAge}, s-maxage=${maxAge}`)
  return response
}
