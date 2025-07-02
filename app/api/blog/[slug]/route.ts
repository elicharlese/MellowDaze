import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { 
  successResponse, 
  notFoundResponse,
  handleApiError
} from '@/lib/api-utils'

interface RouteParams {
  params: {
    slug: string
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = params

    const { data: post, error } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error || !post) {
      return notFoundResponse('Blog post not found')
    }

    return successResponse(post)
  } catch (error) {
    return handleApiError(error)
  }
}
