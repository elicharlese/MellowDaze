import { Suspense } from "react"
import ProductGrid from "@/components/product-grid"
import ProductFilters from "@/components/product-filters"
import { Separator } from "@/components/ui/separator"
import { Package } from "lucide-react"

export const metadata = {
  title: "Accessories | MellowDaze",
  description: "Enhance your hammock experience with our premium accessories.",
}

export default function AccessoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold flex items-center">
          <Package className="h-6 w-6 mr-2 text-sunshine-yellow" />
          <span>Accessories</span>
        </h1>
        <p className="text-muted-foreground">Enhance your hammock experience with our premium accessories.</p>
      </div>

      <Separator className="mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <ProductFilters initialCategory="accessories" />
        </div>

        <div className="md:col-span-3">
          <Suspense fallback={<div>Loading accessories...</div>}>
            <ProductGrid count={12} category="accessories" />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

