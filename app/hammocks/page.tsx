import { Suspense } from "react"
import ProductGrid from "@/components/product-grid"
import ProductFilters from "@/components/product-filters"
import { Separator } from "@/components/ui/separator"
import { Sun } from "lucide-react"

export const metadata = {
  title: "Hammocks | MellowDaze",
  description: "Browse our collection of premium hammocks with built-in steps, shade covers, and more.",
}

export default function HammocksPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold flex items-center">
          <Sun className="h-6 w-6 mr-2 text-sunshine-yellow" />
          <span>Hammocks</span>
        </h1>
        <p className="text-muted-foreground">
          Browse our collection of premium hammocks with built-in steps, shade covers, and more.
        </p>
      </div>

      <Separator className="mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <ProductFilters initialCategory="hammocks" />
        </div>

        <div className="md:col-span-3">
          <Suspense fallback={<div>Loading hammocks...</div>}>
            <ProductGrid count={12} category="hammocks" />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

