import { Suspense } from "react"
import ProductGrid from "@/components/product-grid"
import ProductFilters from "@/components/product-filters"
import { Separator } from "@/components/ui/separator"
import { Package } from "lucide-react"

export const metadata = {
  title: "Storage Solutions | MellowDaze",
  description: "Browse our collection of storage solutions for your hammock.",
}

export default function StorageSolutionsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold flex items-center">
          <Package className="h-6 w-6 mr-2 text-sunshine-yellow" />
          <span>Storage Solutions</span>
        </h1>
        <p className="text-muted-foreground">Keep your essentials within reach with our hammock storage solutions.</p>
      </div>

      <Separator className="mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <ProductFilters initialCategory="storage" />
        </div>

        <div className="md:col-span-3">
          <Suspense fallback={<div>Loading storage solutions...</div>}>
            <ProductGrid count={12} category="storage" />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

