import { Suspense } from "react"
import ProductGrid from "@/components/product-grid"
import ProductFilters from "@/components/product-filters"
import { Separator } from "@/components/ui/separator"

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">All Products</h1>
        <p className="text-muted-foreground">Browse our collection of premium hammocks and accessories</p>
      </div>

      <Separator className="mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <ProductFilters />
        </div>

        <div className="md:col-span-3">
          <Suspense fallback={<div>Loading products...</div>}>
            <ProductGrid count={12} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

