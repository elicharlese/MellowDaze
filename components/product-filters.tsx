"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function ProductFilters({ initialCategory = "" }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState({
    categories: searchParams.get("category")?.split(",") || (initialCategory ? [initialCategory] : []),
    features: searchParams.get("features")?.split(",") || [],
    priceRange: searchParams.get("price") || "all",
  })

  // Update filters when initialCategory changes
  useEffect(() => {
    if (initialCategory && !filters.categories.includes(initialCategory)) {
      setFilters((prev) => ({
        ...prev,
        categories: [initialCategory, ...prev.categories.filter((c) => c !== initialCategory)],
      }))
    }
  }, [initialCategory, filters.categories])

  const handleCategoryChange = (category) => {
    setFilters((prev) => {
      const newCategories = prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category]

      return { ...prev, categories: newCategories }
    })
  }

  const handleFeatureChange = (feature) => {
    setFilters((prev) => {
      const newFeatures = prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature]

      return { ...prev, features: newFeatures }
    })
  }

  const handlePriceChange = (price) => {
    setFilters((prev) => ({ ...prev, priceRange: price }))
  }

  const applyFilters = () => {
    const params = new URLSearchParams()

    if (filters.categories.length) {
      params.set("category", filters.categories.join(","))
    }

    if (filters.features.length) {
      params.set("features", filters.features.join(","))
    }

    if (filters.priceRange !== "all") {
      params.set("price", filters.priceRange)
    }

    router.push(`/products?${params.toString()}`)
  }

  const resetFilters = () => {
    setFilters({
      categories: initialCategory ? [initialCategory] : [],
      features: [],
      priceRange: "all",
    })

    if (initialCategory) {
      router.push(`/products?category=${initialCategory}`)
    } else {
      router.push("/products")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filters</h3>
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          Reset
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["categories", "features", "price"]}>
        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="category-hammocks"
                  checked={filters.categories.includes("hammocks")}
                  onCheckedChange={() => handleCategoryChange("hammocks")}
                />
                <Label htmlFor="category-hammocks">Hammocks</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="category-accessories"
                  checked={filters.categories.includes("accessories")}
                  onCheckedChange={() => handleCategoryChange("accessories")}
                />
                <Label htmlFor="category-accessories">Accessories</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="category-covers"
                  checked={filters.categories.includes("covers")}
                  onCheckedChange={() => handleCategoryChange("covers")}
                />
                <Label htmlFor="category-covers">Shade Covers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="category-storage"
                  checked={filters.categories.includes("storage")}
                  onCheckedChange={() => handleCategoryChange("storage")}
                />
                <Label htmlFor="category-storage">Storage Solutions</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="features">
          <AccordionTrigger>Features</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="feature-steps"
                  checked={filters.features.includes("steps")}
                  onCheckedChange={() => handleFeatureChange("steps")}
                />
                <Label htmlFor="feature-steps">Easy Access Steps</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="feature-shade"
                  checked={filters.features.includes("shade")}
                  onCheckedChange={() => handleFeatureChange("shade")}
                />
                <Label htmlFor="feature-shade">Shade Cover</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="feature-storage"
                  checked={filters.features.includes("storage")}
                  onCheckedChange={() => handleFeatureChange("storage")}
                />
                <Label htmlFor="feature-storage">Storage Compartments</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="feature-cooler"
                  checked={filters.features.includes("cooler")}
                  onCheckedChange={() => handleFeatureChange("cooler")}
                />
                <Label htmlFor="feature-cooler">Built-in Cooler</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="price-all"
                  checked={filters.priceRange === "all"}
                  onCheckedChange={() => handlePriceChange("all")}
                />
                <Label htmlFor="price-all">All Prices</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="price-under-100"
                  checked={filters.priceRange === "under-100"}
                  onCheckedChange={() => handlePriceChange("under-100")}
                />
                <Label htmlFor="price-under-100">Under $100</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="price-100-200"
                  checked={filters.priceRange === "100-200"}
                  onCheckedChange={() => handlePriceChange("100-200")}
                />
                <Label htmlFor="price-100-200">$100 - $200</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="price-200-plus"
                  checked={filters.priceRange === "200-plus"}
                  onCheckedChange={() => handlePriceChange("200-plus")}
                />
                <Label htmlFor="price-200-plus">$200 & Above</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button className="w-full" onClick={applyFilters}>
        Apply Filters
      </Button>
    </div>
  )
}

