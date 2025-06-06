import { cache } from "react"

// This is a placeholder implementation using mock data
// Replace with actual Shopify Hydrogen API calls when ready to connect to your store
// You'll need to add NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN at that time

export const getProducts = cache(async ({ first = 10, category = "" } = {}) => {
  // This would be replaced with actual Shopify API calls
  const allProducts = Array.from({ length: first * 3 }, (_, i) => {
    // Determine product type based on index
    let productType, handle, title, price

    if (i % 4 === 0) {
      productType = "Hammock"
      handle = `premium-hammock-${i + 1}`
      title = `Premium Hammock ${i + 1}`
      price = (199.99 + i * 10).toFixed(2)
    } else if (i % 4 === 1) {
      productType = "Accessory"
      handle = `hammock-accessory-${i + 1}`
      title = `Hammock Accessory ${i + 1}`
      price = (49.99 + i * 5).toFixed(2)
    } else if (i % 4 === 2) {
      productType = "Cover"
      handle = `shade-cover-${i + 1}`
      title = `Shade Cover ${i + 1}`
      price = (79.99 + i * 5).toFixed(2)
    } else {
      productType = "Storage"
      handle = `storage-solution-${i + 1}`
      title = `Storage Solution ${i + 1}`
      price = (39.99 + i * 5).toFixed(2)
    }

    return {
      id: `gid://shopify/Product/${i + 1}`,
      handle,
      title,
      description: `Experience the best in hammock ${productType.toLowerCase()} technology.`,
      descriptionHtml: `<p>Experience the best in hammock ${productType.toLowerCase()} technology.</p>`,
      productType,
      featuredImage: {
        url: `/placeholder.svg?height=400&width=400&text=${productType} ${i + 1}`,
      },
      priceRange: {
        minVariantPrice: {
          amount: price,
        },
      },
      variants: {
        nodes: [
          {
            id: `gid://shopify/ProductVariant/${i + 1}`,
            title: "Default Title",
            price: {
              amount: price,
            },
          },
        ],
      },
      images: {
        nodes: Array.from({ length: 4 }, (_, j) => ({
          id: `image-${i}-${j}`,
          url: `/placeholder.svg?height=600&width=600&text=${productType} Image ${j + 1}`,
        })),
      },
    }
  })

  // Filter by category if specified
  let filteredProducts = allProducts
  if (category) {
    if (category === "hammocks") {
      filteredProducts = allProducts.filter((p) => p.productType === "Hammock")
    } else if (category === "accessories") {
      filteredProducts = allProducts.filter((p) => p.productType === "Accessory")
    } else if (category === "covers") {
      filteredProducts = allProducts.filter((p) => p.productType === "Cover")
    } else if (category === "storage") {
      filteredProducts = allProducts.filter((p) => p.productType === "Storage")
    }
  }

  return {
    nodes: filteredProducts.slice(0, first),
  }
})

export const getProduct = cache(async (handle) => {
  // This would be replaced with actual Shopify API calls
  const id = Number.parseInt(handle.split("-").pop() || "1")

  // Determine product type based on handle
  let productType, title, price, description

  if (handle.includes("hammock")) {
    productType = "Hammock"
    title = `Premium Hammock ${id}`
    price = (199.99 + (id - 1) * 10).toFixed(2)
    description =
      "Experience ultimate relaxation with our premium hammock. Our hammocks are designed with comfort, convenience, and quality in mind. Each hammock features easy access steps, integrated shade cover, multiple storage compartments, and a built-in cooler."
  } else if (handle.includes("accessory")) {
    productType = "Accessory"
    title = `Hammock Accessory ${id}`
    price = (49.99 + (id - 1) * 5).toFixed(2)
    description =
      "Enhance your hammock experience with this premium accessory. Our accessories are designed to complement our hammocks and provide additional comfort and convenience."
  } else if (handle.includes("cover")) {
    productType = "Cover"
    title = `Shade Cover ${id}`
    price = (79.99 + (id - 1) * 5).toFixed(2)
    description =
      "Protect yourself from the sun with our premium shade covers. Designed to fit perfectly with our hammocks, these covers provide excellent UV protection while maintaining airflow."
  } else {
    productType = "Storage"
    title = `Storage Solution ${id}`
    price = (39.99 + (id - 1) * 5).toFixed(2)
    description =
      "Keep your essentials within reach with our hammock storage solutions. These convenient attachments provide easy access to your belongings while you relax."
  }

  return {
    id: `gid://shopify/Product/${id}`,
    handle,
    title,
    description,
    descriptionHtml: `<p>${description}</p>`,
    productType,
    featuredImage: {
      url: `/placeholder.svg?height=600&width=600&text=${productType} ${id}`,
    },
    priceRange: {
      minVariantPrice: {
        amount: price,
      },
    },
    variants: {
      nodes: [
        {
          id: `gid://shopify/ProductVariant/${id}-1`,
          title: "Standard",
          price: {
            amount: price,
          },
        },
        {
          id: `gid://shopify/ProductVariant/${id}-2`,
          title: "Deluxe",
          price: {
            amount: (Number.parseFloat(price) * 1.25).toFixed(2),
          },
        },
      ],
    },
    images: {
      nodes: Array.from({ length: 4 }, (_, j) => ({
        id: `image-${id}-${j}`,
        url: `/placeholder.svg?height=600&width=600&text=${productType} Image ${j + 1}`,
      })),
    },
  }
})

export const getCollection = cache(async (handle) => {
  // This would be replaced with actual Shopify API calls
  let category = ""
  if (handle === "premium-hammocks") category = "hammocks"
  else if (handle === "accessories") category = "accessories"
  else if (handle === "shade-covers") category = "covers"
  else if (handle === "storage-solutions") category = "storage"

  return {
    id: `gid://shopify/Collection/${handle}`,
    handle,
    title: handle
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    products: await getProducts({ first: 4, category }),
  }
})

export const getRelatedProducts = cache(async (currentProductId) => {
  // This would be replaced with actual Shopify API calls
  const products = await getProducts({ first: 5 })
  return products.nodes.filter((product) => product.id !== currentProductId)
})

