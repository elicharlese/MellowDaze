"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ChevronLeft, Package, Truck, CheckCircle } from "lucide-react"

// Mock order data - in a real app, this would come from an API
const getMockOrder = (id) => {
  return {
    id,
    date: "2023-05-15",
    status: "Delivered",
    total: 329.97,
    subtotal: 299.97,
    shipping: 5.99,
    tax: 24.01,
    items: [
      {
        id: "item-1",
        name: "Premium Hammock",
        quantity: 1,
        price: 249.99,
        image: "/placeholder.svg?height=80&width=80&text=Hammock",
      },
      {
        id: "item-2",
        name: "Hammock Pillow Set",
        quantity: 1,
        price: 49.99,
        image: "/placeholder.svg?height=80&width=80&text=Pillows",
      },
      {
        id: "item-3",
        name: "Weather-Resistant Cover",
        quantity: 1,
        price: 29.99,
        image: "/placeholder.svg?height=80&width=80&text=Cover",
      },
    ],
    shippingAddress: {
      name: "John Doe",
      address: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      country: "United States",
    },
    billingAddress: {
      name: "John Doe",
      address: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      country: "United States",
    },
    paymentMethod: "Credit Card ending in 1234",
    shippingMethod: "Standard Shipping",
    trackingNumber: "TRK123456789",
    deliveryDate: "2023-05-20",
  }
}

export default function OrderDetailPage({ params }) {
  const router = useRouter()
  const { id } = params
  const order = getMockOrder(id)

  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-500"
      case "Processing":
        return "bg-blue-500"
      case "Shipped":
        return "bg-yellow-500"
      case "Cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="h-5 w-5" />
      case "Processing":
        return <Package className="h-5 w-5" />
      case "Shipped":
        return <Truck className="h-5 w-5" />
      default:
        return <Package className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-4">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Orders
        </Button>
        <h2 className="text-2xl font-bold">Order #{order.id}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Order Status</CardTitle>
              <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
            </CardHeader>

            <CardContent>
              <div className="relative">
                <div className="flex items-center mb-8">
                  <div className="z-10 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
                    <Package className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">Order Placed</p>
                    <p className="text-sm text-muted-foreground">{formatDate(order.date)}</p>
                  </div>
                </div>

                <div className="absolute top-0 left-5 h-full w-0.5 bg-muted" />

                <div className="flex items-center mb-8">
                  <div className="z-10 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">Shipped</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(order.date)} • Tracking: {order.trackingNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="z-10 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">Delivered</p>
                    <p className="text-sm text-muted-foreground">{formatDate(order.deliveryDate)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${order.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">Shipping Address</h4>
                  <p>{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-1">Shipping Method</h4>
                  <p>{order.shippingMethod}</p>
                </div>

                {order.trackingNumber && (
                  <div>
                    <h4 className="font-medium mb-1">Tracking Number</h4>
                    <p>{order.trackingNumber}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">Payment Method</h4>
                  <p>{order.paymentMethod}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-1">Billing Address</h4>
                  <p>{order.billingAddress.name}</p>
                  <p>{order.billingAddress.address}</p>
                  <p>
                    {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zip}
                  </p>
                  <p>{order.billingAddress.country}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-2">
            <Button asChild>
              <Link href="/account/orders">View All Orders</Link>
            </Button>
            <Button variant="outline">Need Help?</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

