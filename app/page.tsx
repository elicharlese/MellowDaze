import { Suspense } from "react"
import FeaturedCollection from "@/components/featured-collection"
import ProductGrid from "@/components/product-grid"
import HeroSection from "@/components/hero-section"
import FeaturedFeatures from "@/components/featured-features"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Not Just Any Hammock</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Our hammocks are designed for more than just naps. Experience comfort, accessibility, and convenience like
            never before.
          </p>
        </div>

        <FeaturedFeatures />
      </section>

      <section className="bg-muted py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Featured Collection</h2>
          <Suspense fallback={<div>Loading featured collection...</div>}>
            <FeaturedCollection handle="premium-hammocks" />
          </Suspense>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">Our Products</h2>
          <Button variant="outline" asChild>
            <a href="/products">View All Products</a>
          </Button>
        </div>

        <Suspense fallback={<div>Loading products...</div>}>
          <ProductGrid count={8} />
        </Suspense>
      </section>
    </div>
  )
}

