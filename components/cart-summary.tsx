export default function CartSummary({ cost = {} }) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>${cost?.subtotalAmount?.amount || "0.00"}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>Calculated at checkout</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax</span>
          <span>Calculated at checkout</span>
        </div>

        <div className="border-t my-4 pt-4">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${cost?.totalAmount?.amount || "0.00"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

