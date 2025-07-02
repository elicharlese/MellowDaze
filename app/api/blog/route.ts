import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { 
  successResponse, 
  handleApiError,
  getPaginationParams,
  createPaginationResponse
} from '@/lib/api-utils'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const { limit, offset } = getPaginationParams(searchParams)
    const tag = searchParams.get('tag')
    const search = searchParams.get('search')

    let query = supabaseAdmin
      .from('blog_posts')
      .select('*', { count: 'exact' })
      .eq('published', true)

    if (tag) {
      query = query.contains('tags', [tag])
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%,content.ilike.%${search}%`)
    }

    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    const { data: posts, error, count } = await query

    if (error) {
      throw new Error(error.message)
    }

    return successResponse(
      createPaginationResponse(posts || [], count || 0, limit, offset)
    )
  } catch (error) {
    return handleApiError(error)
  }
}
