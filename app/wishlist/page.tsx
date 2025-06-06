"use client"

import { useWishlist } from "@/contexts/wishlist-context"
import { useCart } from "@shopify/hydrogen-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ShoppingCart, Trash2, Heart } from "lucide-react"

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { linesAdd } = useCart()

  const handleAddToCart = (item) => {
    linesAdd([
      {
        merchandiseId: item.id,
        quantity: 1,
      },
    ])
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 md:py-24 text-center">
          <Heart className="h-16 w-16 mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-8">Save items you love to your wishlist and revisit them anytime.</p>
          <Button asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <Card key={item.id} className="overflow-hidden h-full flex flex-col">
              <Link href={`/products/${item.handle}`} className="relative aspect-square overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg?height=400&width=400"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </Link>

              <CardContent className="flex-grow p-4">
                <Link href={`/products/${item.handle}`} className="hover:underline">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.title}</h3>
                </Link>
                <p className="font-medium">${item.price}</p>
              </CardContent>

              <CardFooter className="p-4 pt-0 flex flex-col gap-2">
                <Button className="w-full" onClick={() => handleAddToCart(item)}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button variant="outline" className="w-full" onClick={() => removeFromWishlist(item.id)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

