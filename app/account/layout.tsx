"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User, Package, MapPin, Heart, Settings, LogOut, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

export default function AccountLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, user, logout, isLoading } = useAuth()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(`/login?redirectTo=${encodeURIComponent(pathname)}`)
    }
  }, [isAuthenticated, isLoading, router, pathname])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Skeleton className="h-10 w-48 mb-8" />

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <Skeleton className="h-[300px] w-full rounded-lg" />
          </div>

          <div className="md:w-3/4">
            <Skeleton className="h-[500px] w-full rounded-lg" />
          </div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const navigation = [
    { name: "Profile", href: "/account", icon: User },
    { name: "Orders", href: "/account/orders", icon: Package },
    { name: "Addresses", href: "/account/addresses", icon: MapPin },
    { name: "Wishlist", href: "/wishlist", icon: Heart },
    { name: "Settings", href: "/account/settings", icon: Settings },
  ]

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <Sun className="h-6 w-6 mr-2 text-sunshine-yellow" />
        My Account
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <Card className="border-sunshine-yellow/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                {user.avatar ? (
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src={user.avatar || "/placeholder.svg"}
                      alt={`${user.firstName} ${user.lastName}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-12 w-12 rounded-full bg-sunshine-yellow/20 flex items-center justify-center">
                    <User className="h-6 w-6 text-sunshine-orange" />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-lg font-heading">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-muted-foreground">{user.email}</p>
                  {user.provider === "google" && <p className="text-xs text-muted-foreground mt-1">Google Account</p>}
                </div>
              </div>

              <nav className="space-y-1">
                {navigation.map((item) => {
                  const isActive =
                    pathname === item.href || (item.href !== "/account" && pathname?.startsWith(item.href))

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                        isActive
                          ? "bg-sunshine-yellow text-foreground"
                          : "text-muted-foreground hover:text-sunshine-orange hover:bg-sunshine-yellow/10",
                      )}
                    >
                      <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                      {item.name}
                    </Link>
                  )
                })}

                <Button
                  variant="ghost"
                  className="w-full justify-start text-muted-foreground hover:text-sunshine-orange hover:bg-sunshine-yellow/10"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
                  Logout
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-3/4">{children}</div>
      </div>
    </div>
  )
}

