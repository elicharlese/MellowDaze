"use client"

import { useEffect } from "react"
import { useCart } from "@shopify/hydrogen-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Package, Truck, CreditCard } from "lucide-react"

export default function OrderConfirmationPage() {
  const { linesRemove, lines = [] } = useCart()

  // Clear cart on successful order
  useEffect(() => {
    if (lines.length > 0) {
      const lineIds = lines.map((line) => line.id)
      linesRemove(lineIds)
    }
  }, [lines, linesRemove])

  // Generate a random order number
  const orderNumber = `MD-${Math.floor(100000 + Math.random() * 900000)}`

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-3xl">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
          <CheckCircle className="h-8 w-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-lg text-muted-foreground">
          Thank you for your purchase. Your order has been confirmed and will be shipped soon.
        </p>
      </div>

      <div className="border rounded-lg overflow-hidden mb-8">
        <div className="bg-muted p-4">
          <h2 className="font-semibold text-lg">Order Details</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Order Number</p>
              <p className="font-medium">{orderNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">{new Date().toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Payment Method</p>
              <p className="font-medium">Credit Card</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Shipping Method</p>
              <p className="font-medium">Standard Shipping</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden mb-8">
        <div className="bg-muted p-4">
          <h2 className="font-semibold text-lg">Shipping Address</h2>
        </div>
        <div className="p-6">
          <p className="font-medium">John Doe</p>
          <p>123 Main St</p>
          <p>Anytown, CA 12345</p>
          <p>United States</p>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden mb-12">
        <div className="bg-muted p-4">
          <h2 className="font-semibold text-lg">Order Status</h2>
        </div>
        <div className="p-6">
          <div className="relative">
            <div className="flex items-center mb-8">
              <div className="z-10 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
                <CreditCard className="h-5 w-5" />
              </div>
              <div className="ml-4">
                <p className="font-medium">Payment Confirmed</p>
                <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <div className="absolute top-0 left-5 h-full w-0.5 bg-muted" />

            <div className="flex items-center mb-8">
              <div className="z-10 flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground">
                <Package className="h-5 w-5" />
              </div>
              <div className="ml-4">
                <p className="font-medium">Processing</p>
                <p className="text-sm text-muted-foreground">Your order is being prepared</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="z-10 flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground">
                <Truck className="h-5 w-5" />
              </div>
              <div className="ml-4">
                <p className="font-medium">Shipping</p>
                <p className="text-sm text-muted-foreground">Estimated delivery: 3-5 business days</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}

