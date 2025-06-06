"use client"

import { useCart } from "@shopify/hydrogen-react"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"

export default function CheckoutSummary() {
  const { lines = [], cost = {} } = useCart()

  // Calculate totals
  const subtotal = Number.parseFloat(cost?.subtotalAmount?.amount || "0")
  const shipping = 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-muted p-4">
        <h3 className="font-semibold text-lg">Order Summary</h3>
      </div>

      <div className="p-4">
        <div className="max-h-80 overflow-y-auto mb-4">
          {lines.map((line) => (
            <div key={line.id} className="flex items-center gap-3 mb-4">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                <Image
                  src={line.merchandise?.image?.url || "/placeholder.svg?height=64&width=64"}
                  alt={line.merchandise?.product?.title || "Product"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium line-clamp-1">{line.merchandise?.product?.title}</p>
                <p className="text-sm text-muted-foreground">Qty: {line.quantity}</p>
              </div>
              <p className="font-medium">${line.cost?.totalAmount?.amount || "0.00"}</p>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <Separator className="my-2" />

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

