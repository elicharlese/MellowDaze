"use client"

import { useCart } from "@shopify/hydrogen-react"
import { Button } from "@/components/ui/button"
import CartLineItem from "@/components/cart-line-item"
import CartSummary from "@/components/cart-summary"
import { ShoppingBag } from "lucide-react"

export default function CartPage() {
  const { lines = [], cost = {}, checkoutUrl = "#" } = useCart()

  const isEmpty = !lines || lines.length === 0

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Your Cart</h1>

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-12 md:py-24 text-center">
          <ShoppingBag className="h-16 w-16 mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild>
            <a href="/products">Browse Products</a>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {lines.map((line) => (
                <CartLineItem key={line.id} line={line} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <CartSummary cost={cost} />

            <div className="mt-6">
              <Button className="w-full" size="lg" asChild>
                <a href={checkoutUrl}>Proceed to Checkout</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

