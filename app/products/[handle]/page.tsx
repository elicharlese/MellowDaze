import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getProduct } from "@/lib/shopify"
import ProductDetails from "@/components/product-details"
import RelatedProducts from "@/components/related-products"
import ProductFeatures from "@/components/product-features"
import ProductRecommendations from "@/components/product-recommendations"

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const { handle } = params

  try {
    const product = await getProduct(handle)

    if (!product) {
      return notFound()
    }

    return (
      <div className="container mx-auto px-4 py-8 md:py-12">
        <ProductDetails product={product} />

        <ProductRecommendations />

        <ProductFeatures productType={product.productType} />

        <div className="mt-16 md:mt-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">You might also like</h2>
          <Suspense fallback={<div>Loading related products...</div>}>
            <RelatedProducts currentProductId={product.id} />
          </Suspense>
        </div>
      </div>
    )
  } catch (error) {
    console.error(`Error loading product ${handle}:`, error)
    return notFound()
  }
}

