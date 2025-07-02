import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { 
  successResponse, 
  errorResponse, 
  handleApiError, 
  formatProduct,
  getPaginationParams,
  createPaginationResponse
} from '@/lib/api-utils'
import { productFiltersSchema } from '@/lib/validations'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Parse and validate filters
    const filters = productFiltersSchema.parse({
      category: searchParams.get('category') || undefined,
      features: searchParams.get('features')?.split(',') || undefined,
      price_min: searchParams.get('price_min') ? parseFloat(searchParams.get('price_min')!) : undefined,
      price_max: searchParams.get('price_max') ? parseFloat(searchParams.get('price_max')!) : undefined,
      search: searchParams.get('search') || undefined,
      sort: searchParams.get('sort') || undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20,
      offset: searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0,
    })

    // Build query
    let query = supabaseAdmin
      .from('products')
      .select('*', { count: 'exact' })
      .eq('available', true)

    // Apply filters
    if (filters.category) {
      query = query.eq('category', filters.category)
    }

    if (filters.features && filters.features.length > 0) {
      query = query.overlaps('features', filters.features)
    }

    if (filters.price_min) {
      query = query.gte('price', filters.price_min)
    }

    if (filters.price_max) {
      query = query.lte('price', filters.price_max)
    }

    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
    }

    // Apply sorting
    switch (filters.sort) {
      case 'price_asc':
        query = query.order('price', { ascending: true })
        break
      case 'price_desc':
        query = query.order('price', { ascending: false })
        break
      case 'title':
        query = query.order('title', { ascending: true })
        break
      default:
        query = query.order('created_at', { ascending: false })
    }

    // Apply pagination
    query = query.range(filters.offset, filters.offset + filters.limit - 1)

    const { data: products, error, count } = await query

    if (error) {
      throw new Error(error.message)
    }

    // Format products for frontend
    const formattedProducts = products?.map(formatProduct) || []

    return successResponse(
      createPaginationResponse(formattedProducts, count || 0, filters.limit, filters.offset)
    )
  } catch (error) {
    return handleApiError(error)
  }
}
