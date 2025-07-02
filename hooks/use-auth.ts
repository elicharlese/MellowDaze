import { useState, useEffect } from 'react'
import { apiClient } from '@/lib/api-client'
import { useToast } from '@/hooks/use-toast'

interface User {
  id: string
  email: string
  first_name?: string
  last_name?: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })
  const { toast } = useToast()

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await apiClient.getProfile()
      if (response.success && response.data) {
        setState({
          user: response.data,
          isLoading: false,
          isAuthenticated: true,
        })
      } else {
        setState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        })
      }
    } catch (error) {
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      })
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.login({ email, password })
      
      if (response.success && response.data) {
        setState({
          user: response.data.user,
          isLoading: false,
          isAuthenticated: true,
        })
        
        toast({
          title: "Welcome back!",
          description: "You have been successfully logged in.",
        })
        
        return { success: true }
      } else {
        throw new Error(response.error || 'Login failed')
      }
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      })
      return { success: false, error: error.message }
    }
  }

  const register = async (data: { email: string; password: string; first_name?: string; last_name?: string }) => {
    try {
      const response = await apiClient.register(data)
      
      if (response.success && response.data) {
        setState({
          user: response.data.user,
          isLoading: false,
          isAuthenticated: true,
        })
        
        toast({
          title: "Account created!",
          description: "Welcome to MellowDaze. Your account has been created successfully.",
        })
        
        return { success: true }
      } else {
        throw new Error(response.error || 'Registration failed')
      }
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      })
      return { success: false, error: error.message }
    }
  }

  const logout = async () => {
    try {
      await apiClient.logout()
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      })
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      })
      
      return { success: true }
    } catch (error: any) {
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      })
      return { success: false, error: error.message }
    }
  }

  return {
    ...state,
    login,
    register,
    logout,
    checkAuthStatus,
  }
}
