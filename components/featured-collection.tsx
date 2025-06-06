import { getCollection } from "@/lib/shopify"
import ProductCard from "./product-card"

export default async function FeaturedCollection({ handle }) {
  const collection = await getCollection(handle)

  if (!collection) {
    return null
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {collection.products.nodes.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

