"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useCart } from "@shopify/hydrogen-react"
import { useWishlist } from "@/contexts/wishlist-context"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Menu, X, Search, Heart, User, LogIn, Package, Settings, LogOut, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const pathname = usePathname()
  const { totalQuantity = 0, lines = [], cost = {} } = useCart()
  const { wishlist } = useWishlist()
  const { user, isAuthenticated, logout, isLoading } = useAuth()
  const cartRef = useRef(null)
  const userMenuRef = useRef(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Close dropdowns when navigating
  useEffect(() => {
    setIsCartOpen(false)
    setIsUserMenuOpen(false)
  }, [pathname])

  // Update the navigation array to point to the new page routes
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Hammocks", href: "/hammocks" },
    { name: "Accessories", href: "/accessories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  const handleLogout = () => {
    logout()
    setIsUserMenuOpen(false)
  }

  return (
    <header className="relative bg-background border-b border-sunshine-yellow/20">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold font-heading flex items-center">
              <Sun className="h-6 w-6 mr-2 text-sunshine-yellow" />
              <span className="sunshine-text-gradient">MellowDaze</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-sunshine-orange",
                  pathname === item.href ? "text-sunshine-orange" : "text-muted-foreground",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex text-sunshine-blue hover:text-sunshine-orange hover:bg-sunshine-yellow/10"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-sunshine-blue hover:text-sunshine-orange hover:bg-sunshine-yellow/10"
            >
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-sunshine-orange text-[10px] font-medium text-white">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </Button>

            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="text-sunshine-blue hover:text-sunshine-orange hover:bg-sunshine-yellow/10"
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">Cart</span>
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-sunshine-orange text-[10px] font-medium text-white">
                    {totalQuantity}
                  </span>
                )}
              </Button>

              {/* Cart Dropdown */}
              {isCartOpen && (
                <div
                  ref={cartRef}
                  className="absolute right-0 mt-2 w-80 bg-background border border-sunshine-yellow/20 rounded-lg shadow-lg z-50"
                >
                  <div className="p-4 border-b border-sunshine-yellow/20">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold font-heading">Your Cart</h3>
                      <Button variant="ghost" size="sm" onClick={() => setIsCartOpen(false)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="max-h-96 overflow-y-auto">
                    {lines.length === 0 ? (
                      <div className="p-4 text-center">
                        <p className="text-muted-foreground">Your cart is empty</p>
                      </div>
                    ) : (
                      <div>
                        {lines.map((line) => (
                          <div key={line.id} className="p-4 border-b border-sunshine-yellow/10 flex items-center gap-3">
                            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                              <Image
                                src={line.merchandise?.image?.url || "/placeholder.svg?height=64&width=64"}
                                alt={line.merchandise?.product?.title || "Product"}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium line-clamp-1">{line.merchandise?.product?.title}</p>
                              <p className="text-sm text-muted-foreground">Qty: {line.quantity}</p>
                              <p className="font-medium">${line.cost?.totalAmount?.amount || "0.00"}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="p-4 border-t border-sunshine-yellow/20">
                    <div className="flex justify-between mb-4">
                      <span>Subtotal</span>
                      <span className="font-semibold">${cost?.subtotalAmount?.amount || "0.00"}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button asChild className="w-full bg-sunshine-yellow hover:bg-sunshine-orange text-foreground">
                        <Link href="/checkout">Checkout</Link>
                      </Button>
                      <Button
                        variant="outline"
                        asChild
                        className="w-full border-sunshine-blue text-sunshine-blue hover:bg-sunshine-blue/10"
                      >
                        <Link href="/cart">View Cart</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Account */}
            <div className="relative">
              {isLoading ? (
                <Skeleton className="h-9 w-9 rounded-full" />
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="relative text-sunshine-blue hover:text-sunshine-orange hover:bg-sunshine-yellow/10"
                >
                  {isAuthenticated && user?.avatar ? (
                    <div className="h-7 w-7 rounded-full overflow-hidden">
                      <Image
                        src={user.avatar || "/placeholder.svg"}
                        alt={`${user.firstName} ${user.lastName}`}
                        width={28}
                        height={28}
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                  <span className="sr-only">Account</span>
                </Button>
              )}

              {isUserMenuOpen && (
                <div
                  ref={userMenuRef}
                  className="absolute right-0 mt-2 w-56 bg-background border border-sunshine-yellow/20 rounded-lg shadow-lg z-50"
                >
                  <div className="p-4 border-b border-sunshine-yellow/20">
                    {isAuthenticated ? (
                      <div className="flex items-center gap-3">
                        {user?.avatar ? (
                          <div className="h-10 w-10 rounded-full overflow-hidden">
                            <Image
                              src={user.avatar || "/placeholder.svg"}
                              alt={`${user.firstName} ${user.lastName}`}
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-sunshine-yellow/20 flex items-center justify-center">
                            <User className="h-5 w-5 text-sunshine-orange" />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold font-heading">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="font-semibold font-heading">Welcome</p>
                        <p className="text-sm text-muted-foreground">Sign in to your account</p>
                      </div>
                    )}
                  </div>

                  <div className="p-2">
                    {isAuthenticated ? (
                      <div className="space-y-1">
                        <Button
                          variant="ghost"
                          className="w-full justify-start hover:bg-sunshine-yellow/10 hover:text-sunshine-orange"
                          asChild
                        >
                          <Link href="/account">
                            <User className="mr-2 h-4 w-4" />
                            My Account
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start hover:bg-sunshine-yellow/10 hover:text-sunshine-orange"
                          asChild
                        >
                          <Link href="/account/orders">
                            <Package className="mr-2 h-4 w-4" />
                            My Orders
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start hover:bg-sunshine-yellow/10 hover:text-sunshine-orange"
                          asChild
                        >
                          <Link href="/wishlist">
                            <Heart className="mr-2 h-4 w-4" />
                            Wishlist
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start hover:bg-sunshine-yellow/10 hover:text-sunshine-orange"
                          asChild
                        >
                          <Link href="/account/settings">
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={handleLogout}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <Button
                          variant="default"
                          className="w-full bg-sunshine-yellow hover:bg-sunshine-orange text-foreground"
                          asChild
                        >
                          <Link href="/login">
                            <LogIn className="mr-2 h-4 w-4" />
                            Sign In
                          </Link>
                        </Button>
                        <p className="text-xs text-center text-muted-foreground py-2">
                          Don't have an account?{" "}
                          <Link href="/login?tab=signup" className="text-sunshine-blue hover:text-sunshine-orange">
                            Sign up
                          </Link>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-sunshine-blue hover:text-sunshine-orange hover:bg-sunshine-yellow/10"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background md:hidden">
          <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="text-2xl font-bold font-heading flex items-center">
                <Sun className="h-6 w-6 mr-2 text-sunshine-yellow" />
                <span className="sunshine-text-gradient">MellowDaze</span>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(false)}
                className="text-sunshine-blue hover:text-sunshine-orange hover:bg-sunshine-yellow/10"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>

            <nav className="mt-8 space-y-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block text-lg font-medium transition-colors hover:text-sunshine-orange",
                    pathname === item.href ? "text-sunshine-orange" : "text-muted-foreground",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/wishlist"
                className="block text-lg font-medium transition-colors hover:text-sunshine-orange text-muted-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Wishlist
              </Link>
              <Link
                href={isAuthenticated ? "/account" : "/login"}
                className="block text-lg font-medium transition-colors hover:text-sunshine-orange text-muted-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                {isAuthenticated ? "My Account" : "Sign In"}
              </Link>

              {isAuthenticated && (
                <Button
                  variant="ghost"
                  className="w-full justify-start text-lg font-medium text-muted-foreground hover:text-sunshine-orange"
                  onClick={() => {
                    handleLogout()
                    setIsMenuOpen(false)
                  }}
                >
                  Logout
                </Button>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

