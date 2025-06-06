import { getProducts } from "@/lib/shopify"
import ProductCard from "./product-card"

export default async function ProductGrid({ count = 4, category = "" }) {
  const products = await getProducts({ first: count, category })

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.nodes.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

