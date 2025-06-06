"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@shopify/hydrogen-react"
import { useWishlist } from "@/contexts/wishlist-context"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart, Heart, Check } from "lucide-react"

export default function ProductDetails({ product }) {
  const { linesAdd } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.nodes?.[0] || {})
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(product?.images?.nodes?.[0] || {})
  const [addedToCart, setAddedToCart] = useState(false)

  const inWishlist = product ? isInWishlist(product.id) : false

  const handleAddToCart = () => {
    if (!selectedVariant?.id) return

    linesAdd([
      {
        merchandiseId: selectedVariant.id,
        quantity,
      },
    ])

    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 3000)
  }

  const handleWishlistToggle = () => {
    if (!product) return

    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        handle: product.handle,
        title: product.title,
        price: selectedVariant?.price?.amount || "0.00",
        image: product.images?.nodes?.[0]?.url || "/placeholder.svg",
      })
    }
  }

  // Upsell product - in a real app, this would come from the API
  const upsellProduct = {
    id: "upsell-1",
    handle: "premium-hammock-accessories-bundle",
    title: "Premium Accessories Bundle",
    description: "Complete your hammock experience with our premium accessories bundle.",
    price: "79.99",
    image: "/placeholder.svg?height=120&width=120&text=Bundle",
  }

  if (!product) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      <div className="space-y-4">
        <div className="aspect-square relative rounded-lg overflow-hidden border">
          <Image
            src={selectedImage?.url || "/placeholder.svg?height=600&width=600"}
            alt={product.title || "Product"}
            fill
            className="object-cover"
          />
        </div>

        <div className="grid grid-cols-4 gap-2">
          {product.images?.nodes?.map((image) => (
            <button
              key={image.id}
              className={`aspect-square relative rounded border overflow-hidden ${
                selectedImage?.id === image.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image.url || "/placeholder.svg"}
                alt={product.title || "Product"}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-2xl font-semibold mt-2">${selectedVariant?.price?.amount || "0.00"}</p>
        </div>

        {product.variants?.nodes?.length > 1 && (
          <div>
            <h3 className="text-lg font-medium mb-3">Options</h3>
            <RadioGroup
              defaultValue={selectedVariant?.id}
              onValueChange={(value) => {
                const variant = product.variants.nodes.find((v) => v.id === value)
                setSelectedVariant(variant || product.variants.nodes[0])
              }}
            >
              <div className="grid grid-cols-2 gap-2">
                {product.variants.nodes.map((variant) => (
                  <div key={variant.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={variant.id} id={variant.id} />
                    <Label htmlFor={variant.id}>{variant.title}</Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        )}

        <div>
          <h3 className="text-lg font-medium mb-3">Quantity</h3>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              -
            </Button>
            <span className="w-12 text-center">{quantity}</span>
            <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
              +
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="flex-1" onClick={handleAddToCart}>
            {addedToCart ? (
              <>
                <Check className="mr-2 h-5 w-5" />
                Added to Cart
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </>
            )}
          </Button>
          <Button size="lg" variant={inWishlist ? "default" : "outline"} onClick={handleWishlistToggle}>
            <Heart className={`mr-2 h-5 w-5 ${inWishlist ? "fill-primary-foreground" : ""}`} />
            {inWishlist ? "In Wishlist" : "Add to Wishlist"}
          </Button>
        </div>

        {/* Upsell Section */}
        <Card className="mt-6 border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                <Image
                  src={upsellProduct.image || "/placeholder.svg"}
                  alt={upsellProduct.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{upsellProduct.title}</h3>
                <p className="text-sm text-muted-foreground">{upsellProduct.description}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-medium">${upsellProduct.price}</span>
                  <Button size="sm" variant="secondary" asChild>
                    <Link href={`/products/${upsellProduct.handle}`}>Add to Cart</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="description">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="specs">Specifications</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="pt-4">
            <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml || "" }} />
          </TabsContent>
          <TabsContent value="features" className="pt-4">
            <ul className="list-disc pl-5 space-y-2">
              <li>Easy access with built-in steps</li>
              <li>Integrated shade cover for sun protection</li>
              <li>Multiple storage compartments</li>
              <li>Built-in cooler for drinks and snacks</li>
              <li>Weather-resistant materials</li>
            </ul>
          </TabsContent>
          <TabsContent value="specs" className="pt-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">Material</div>
              <div>Premium weather-resistant fabric</div>
              <div className="font-medium">Weight Capacity</div>
              <div>Up to 400 lbs</div>
              <div className="font-medium">Dimensions</div>
              <div>7.5' x 4.5'</div>
              <div className="font-medium">Setup Time</div>
              <div>Under 15 minutes</div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

