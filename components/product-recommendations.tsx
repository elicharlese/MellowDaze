import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Plus } from "lucide-react"

export default function ProductRecommendations() {
  // In a real app, these would come from the API based on the current product
  const recommendations = [
    {
      id: "rec-1",
      handle: "hammock-pillow-set",
      title: "Hammock Pillow Set",
      description: "Ultra-comfortable pillows designed specifically for hammock use",
      price: "49.99",
      image: "/placeholder.svg?height=100&width=100&text=Pillows",
    },
    {
      id: "rec-2",
      handle: "hammock-stand",
      title: "Portable Hammock Stand",
      description: "Set up your hammock anywhere with our portable stand",
      price: "129.99",
      image: "/placeholder.svg?height=100&width=100&text=Stand",
    },
    {
      id: "rec-3",
      handle: "hammock-cover",
      title: "Weather-Resistant Cover",
      description: "Protect your hammock from the elements",
      price: "39.99",
      image: "/placeholder.svg?height=100&width=100&text=Cover",
    },
  ]

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Frequently Bought Together</h2>
      <div className="grid gap-4">
        {recommendations.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                  <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{product.title}</h3>
                    <span className="font-medium">${product.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                </div>
                <Button size="sm" variant="ghost" className="flex-shrink-0">
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Add to cart</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="mt-4 flex justify-between items-center">
          <div>
            <span className="text-lg font-semibold">Bundle Price: $299.99</span>
            <p className="text-sm text-muted-foreground">Save $19.98 when purchased together</p>
          </div>
          <Button>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add Bundle to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

