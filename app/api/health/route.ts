import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { successResponse, errorResponse } from '@/lib/api-utils'

export async function GET(request: NextRequest) {
  try {
    // Check database connection
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('count')
      .limit(1)

    if (error) {
      throw new Error(`Database connection failed: ${error.message}`)
    }

    // Check environment variables
    const requiredEnvVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'SUPABASE_SERVICE_ROLE_KEY'
    ]

    const missingEnvVars = requiredEnvVars.filter(
      varName => !process.env[varName]
    )

    if (missingEnvVars.length > 0) {
      throw new Error(`Missing environment variables: ${missingEnvVars.join(', ')}`)
    }

    return successResponse({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      database: 'connected',
      services: {
        supabase: 'connected',
        nextjs: 'running'
      }
    })
  } catch (error: any) {
    return errorResponse(`Health check failed: ${error.message}`, 503)
  }
}
