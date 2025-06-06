import Link from "next/link"
import Image from "next/image"
import { getRelatedProducts } from "@/lib/shopify"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

export default async function RelatedProducts({ currentProductId }) {
  const products = await getRelatedProducts(currentProductId)

  if (!products || products.length === 0) {
    return null
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product) => (
          <Card key={product.id} className="overflow-hidden h-full flex flex-col">
            <Link href={`/products/${product.handle}`} className="relative aspect-square overflow-hidden">
              <Image
                src={product.featuredImage?.url || "/placeholder.svg?height=400&width=400"}
                alt={product.title}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </Link>

            <CardContent className="flex-grow p-4">
              <Link href={`/products/${product.handle}`} className="hover:underline">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
              </Link>
              <p className="font-medium">${product.priceRange?.minVariantPrice?.amount || "0.00"}</p>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <Button className="w-full" variant="outline" asChild>
                <Link href={`/products/${product.handle}`}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  View Product
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button variant="outline" size="lg" asChild>
          <Link href="/products">View All Products</Link>
        </Button>
      </div>
    </div>
  )
}

