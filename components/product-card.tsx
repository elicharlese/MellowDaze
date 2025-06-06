"use client"

import Link from "next/link"
import Image from "next/image"
import { useWishlist } from "@/contexts/wishlist-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ShoppingCart, Heart } from "lucide-react"

export default function ProductCard({ product }) {
  const { handle, title, featuredImage, priceRange } = product
  const price = priceRange?.minVariantPrice?.amount || "0"
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const inWishlist = isInWishlist(product.id)

  const handleWishlistToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        handle,
        title,
        price,
        image: featuredImage?.url || "/placeholder.svg",
      })
    }
  }

  return (
    <Card className="overflow-hidden h-full flex flex-col group">
      <div className="relative">
        <Link href={`/products/${handle}`} className="relative aspect-square overflow-hidden block">
          <Image
            src={featuredImage?.url || "/placeholder.svg?height=400&width=400"}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </Link>
        <Button
          variant={inWishlist ? "default" : "secondary"}
          size="icon"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleWishlistToggle}
        >
          <Heart className={`h-4 w-4 ${inWishlist ? "fill-primary-foreground" : ""}`} />
          <span className="sr-only">{inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}</span>
        </Button>
      </div>

      <CardContent className="flex-grow p-4">
        <Link href={`/products/${handle}`} className="hover:underline">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
        </Link>
        <p className="font-medium">${price}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full" variant="outline" asChild>
          <Link href={`/products/${handle}`}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            View Product
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

