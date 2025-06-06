"use client"

import { useState } from "react"
import Image from "next/image"
import { useCart } from "@shopify/hydrogen-react"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

export default function CartLineItem({ line }) {
  const { linesRemove, linesUpdate } = useCart()
  const [quantity, setQuantity] = useState(line?.quantity || 1)

  const handleQuantityChange = (newQuantity) => {
    if (!line?.id) return

    setQuantity(newQuantity)
    linesUpdate([
      {
        id: line.id,
        quantity: newQuantity,
      },
    ])
  }

  const handleRemove = () => {
    if (!line?.id) return
    linesRemove([line.id])
  }

  if (!line) return null

  return (
    <div className="flex items-start gap-4 py-4 border-b">
      <div className="relative aspect-square h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
        <Image
          src={line.merchandise?.image?.url || "/placeholder.svg?height=100&width=100"}
          alt={line.merchandise?.product?.title || "Product"}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium">{line.merchandise?.product?.title || "Product"}</h3>
            <p className="text-sm text-muted-foreground">
              {line.merchandise?.title !== "Default Title" ? line.merchandise?.title : ""}
            </p>
          </div>
          <p className="font-medium">${line.cost?.totalAmount?.amount || "0.00"}</p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              +
            </Button>
          </div>

          <Button variant="ghost" size="sm" onClick={handleRemove}>
            <Trash2 className="h-4 w-4 mr-1" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  )
}

