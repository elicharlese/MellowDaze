"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, ChevronRight } from "lucide-react"

// Mock order data
const MOCK_ORDERS = [
  {
    id: "MD-123456",
    date: "2023-05-15",
    status: "Delivered",
    total: 329.97,
    items: [
      { id: "item-1", name: "Premium Hammock", quantity: 1, price: 249.99 },
      { id: "item-2", name: "Hammock Pillow Set", quantity: 1, price: 49.99 },
      { id: "item-3", name: "Weather-Resistant Cover", quantity: 1, price: 29.99 },
    ],
  },
  {
    id: "MD-123457",
    date: "2023-06-22",
    status: "Processing",
    total: 199.99,
    items: [{ id: "item-4", name: "Standard Hammock", quantity: 1, price: 199.99 }],
  },
]

export default function OrdersPage() {
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>View and manage your orders</CardDescription>
        </CardHeader>

        <CardContent>
          {MOCK_ORDERS.length === 0 ? (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No orders yet</h3>
              <p className="text-muted-foreground mb-6">
                You haven't placed any orders yet. Start shopping to see your orders here.
              </p>
              <Button asChild>
                <Link href="/products">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {MOCK_ORDERS.map((order) => (
                <div key={order.id} className="border rounded-lg overflow-hidden">
                  <div className="bg-muted p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">Order #{order.id}</h3>
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Placed on {formatDate(order.date)}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-medium">${order.total.toFixed(2)}</p>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/account/orders/${order.id}`}>
                          View Details
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border-t">
                    <h4 className="font-medium mb-2">Items in this order</h4>
                    <ul className="space-y-2">
                      {order.items.map((item) => (
                        <li key={item.id} className="flex justify-between">
                          <span>
                            {item.quantity} x {item.name}
                          </span>
                          <span className="font-medium">${item.price.toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

