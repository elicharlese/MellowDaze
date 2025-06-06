"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  addresses: Address[]
  defaultAddressId?: string
  provider?: "email" | "google"
  avatar?: string
}

type Address = {
  id: string
  firstName: string
  lastName: string
  address1: string
  address2?: string
  city: string
  state: string
  zip: string
  country: string
  isDefault: boolean
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (userData: Partial<User>, password: string) => Promise<boolean>
  socialLogin: (provider: "google", userData: Partial<User>) => Promise<boolean>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
  addAddress: (address: Omit<Address, "id">) => void
  updateAddress: (address: Address) => void
  removeAddress: (id: string) => void
  setDefaultAddress: (id: string) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user data
const MOCK_USER: User = {
  id: "user-1",
  email: "john.doe@example.com",
  firstName: "John",
  lastName: "Doe",
  phone: "(555) 123-4567",
  provider: "email",
  addresses: [
    {
      id: "address-1",
      firstName: "John",
      lastName: "Doe",
      address1: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      country: "United States",
      isDefault: true,
    },
  ],
  defaultAddressId: "address-1",
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Check for saved user on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Failed to parse user from localStorage", error)
      }
    }
    setIsLoading(false)
  }, [])

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  }, [user])

  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call to authenticate
    try {
      setIsLoading(true)
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, accept any email/password
      // In a real app, you would validate credentials against your backend
      setUser({
        ...MOCK_USER,
        email,
        provider: "email",
      })
      return true
    } catch (error) {
      console.error("Login failed", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (userData: Partial<User>, password: string) => {
    // In a real app, this would make an API call to create a new user
    try {
      setIsLoading(true)
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create a new user based on the provided data and mock data
      const newUser: User = {
        ...MOCK_USER,
        id: `user-${Date.now()}`,
        email: userData.email || MOCK_USER.email,
        firstName: userData.firstName || MOCK_USER.firstName,
        lastName: userData.lastName || MOCK_USER.lastName,
        phone: userData.phone || MOCK_USER.phone,
        provider: "email",
      }

      setUser(newUser)
      return true
    } catch (error) {
      console.error("Signup failed", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const socialLogin = async (provider: "google", userData: Partial<User>) => {
    try {
      setIsLoading(true)
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create a new user based on the provided social data
      const newUser: User = {
        ...MOCK_USER,
        id: `user-${Date.now()}`,
        email: userData.email || MOCK_USER.email,
        firstName: userData.firstName || MOCK_USER.firstName,
        lastName: userData.lastName || MOCK_USER.lastName,
        provider,
        avatar: userData.avatar,
      }

      setUser(newUser)
      return true
    } catch (error) {
      console.error(`${provider} login failed`, error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
  }

  const updateUser = (userData: Partial<User>) => {
    if (!user) return

    setUser({
      ...user,
      ...userData,
    })
  }

  const addAddress = (address: Omit<Address, "id">) => {
    if (!user) return

    const newAddress: Address = {
      ...address,
      id: `address-${Date.now()}`,
    }

    const updatedAddresses = [...user.addresses, newAddress]

    // If this is the first address or marked as default, set it as default
    let defaultAddressId = user.defaultAddressId
    if (address.isDefault || !defaultAddressId) {
      defaultAddressId = newAddress.id

      // Ensure only one address is marked as default
      updatedAddresses.forEach((addr) => {
        if (addr.id !== newAddress.id) {
          addr.isDefault = false
        }
      })
    }

    setUser({
      ...user,
      addresses: updatedAddresses,
      defaultAddressId,
    })
  }

  const updateAddress = (address: Address) => {
    if (!user) return

    const updatedAddresses = user.addresses.map((addr) => (addr.id === address.id ? address : addr))

    // If this address is marked as default, update the default address ID
    // and ensure other addresses are not marked as default
    let defaultAddressId = user.defaultAddressId
    if (address.isDefault) {
      defaultAddressId = address.id

      updatedAddresses.forEach((addr) => {
        if (addr.id !== address.id) {
          addr.isDefault = false
        }
      })
    }

    setUser({
      ...user,
      addresses: updatedAddresses,
      defaultAddressId,
    })
  }

  const removeAddress = (id: string) => {
    if (!user) return

    const updatedAddresses = user.addresses.filter((addr) => addr.id !== id)

    // If the removed address was the default, set a new default if possible
    let defaultAddressId = user.defaultAddressId
    if (defaultAddressId === id && updatedAddresses.length > 0) {
      defaultAddressId = updatedAddresses[0].id
      updatedAddresses[0].isDefault = true
    } else if (updatedAddresses.length === 0) {
      defaultAddressId = undefined
    }

    setUser({
      ...user,
      addresses: updatedAddresses,
      defaultAddressId,
    })
  }

  const setDefaultAddress = (id: string) => {
    if (!user) return

    const updatedAddresses = user.addresses.map((addr) => ({
      ...addr,
      isDefault: addr.id === id,
    }))

    setUser({
      ...user,
      addresses: updatedAddresses,
      defaultAddressId: id,
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        socialLogin,
        logout,
        updateUser,
        addAddress,
        updateAddress,
        removeAddress,
        setDefaultAddress,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

