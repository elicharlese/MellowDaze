"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@shopify/hydrogen-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import CheckoutSummary from "@/components/checkout-summary"
import { ChevronLeft, CreditCard, Wallet, Check } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const { lines = [], cost = {} } = useCart()
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (step < 3) {
      setStep(step + 1)
      window.scrollTo(0, 0)
      return
    }

    // Process payment
    setLoading(true)

    // Simulate payment processing
    setTimeout(() => {
      router.push("/checkout/confirmation")
    }, 2000)
  }

  if (lines.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12 text-center">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <p className="mb-6">Your cart is empty. Add some products before checking out.</p>
        <Button asChild>
          <a href="/products">Browse Products</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <a href="/cart">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Cart
          </a>
        </Button>
        <h1 className="text-3xl font-bold">Checkout</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"} mr-2`}
              >
                {step > 1 ? <Check className="h-4 w-4" /> : "1"}
              </div>
              <h2 className="text-xl font-semibold">Shipping Information</h2>
            </div>

            {step === 1 ? (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" required />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" required />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" required />
                  </div>
                  <div>
                    <Label htmlFor="state">State/Province</Label>
                    <Input id="state" required />
                  </div>
                  <div>
                    <Label htmlFor="zip">Zip/Postal Code</Label>
                    <Input id="zip" required />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" defaultValue="United States" required />
                  </div>
                </div>
                <Button type="submit">Continue to Shipping Method</Button>
              </form>
            ) : (
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p>123 Main St</p>
                      <p>Anytown, CA 12345</p>
                      <p>United States</p>
                    </div>
                    <div className="text-right">
                      <p>john.doe@example.com</p>
                      <p>(555) 123-4567</p>
                    </div>
                  </div>
                  {step === 1 && (
                    <Button variant="outline" size="sm" className="mt-4" onClick={() => setStep(1)}>
                      Edit
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          <Separator className="my-8" />

          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"} mr-2`}
              >
                {step > 2 ? <Check className="h-4 w-4" /> : "2"}
              </div>
              <h2 className="text-xl font-semibold">Shipping Method</h2>
            </div>

            {step === 2 ? (
              <form onSubmit={handleSubmit}>
                <RadioGroup defaultValue="standard" className="mb-6">
                  <div className="flex items-center justify-between border rounded-lg p-4 mb-2">
                    <div className="flex items-center">
                      <RadioGroupItem id="standard" value="standard" className="mr-2" />
                      <Label htmlFor="standard">Standard Shipping (3-5 business days)</Label>
                    </div>
                    <span className="font-medium">$5.99</span>
                  </div>
                  <div className="flex items-center justify-between border rounded-lg p-4 mb-2">
                    <div className="flex items-center">
                      <RadioGroupItem id="express" value="express" className="mr-2" />
                      <Label htmlFor="express">Express Shipping (2-3 business days)</Label>
                    </div>
                    <span className="font-medium">$12.99</span>
                  </div>
                  <div className="flex items-center justify-between border rounded-lg p-4">
                    <div className="flex items-center">
                      <RadioGroupItem id="overnight" value="overnight" className="mr-2" />
                      <Label htmlFor="overnight">Overnight Shipping (1 business day)</Label>
                    </div>
                    <span className="font-medium">$24.99</span>
                  </div>
                </RadioGroup>
                <Button type="submit">Continue to Payment</Button>
              </form>
            ) : step > 2 ? (
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <p>Standard Shipping (3-5 business days)</p>
                    <p className="font-medium">$5.99</p>
                  </div>
                  {step === 2 && (
                    <Button variant="outline" size="sm" className="mt-4" onClick={() => setStep(2)}>
                      Edit
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : null}
          </div>

          <Separator className="my-8" />

          <div>
            <div className="flex items-center mb-4">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"} mr-2`}
              >
                3
              </div>
              <h2 className="text-xl font-semibold">Payment</h2>
            </div>

            {step === 3 && (
              <form onSubmit={handleSubmit}>
                <Tabs defaultValue="credit-card" onValueChange={setPaymentMethod} className="mb-6">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="credit-card">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Credit Card
                    </TabsTrigger>
                    <TabsTrigger value="crypto">
                      <Wallet className="h-4 w-4 mr-2" />
                      Cryptocurrency
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="credit-card" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input id="cardName" required />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="•••• •••• •••• ••••" required />
                      </div>
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" required />
                      </div>
                      <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="•••" required />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="crypto" className="mt-4">
                    <div className="border rounded-lg p-4 mb-4">
                      <h3 className="font-medium mb-2">Pay with Cryptocurrency</h3>
                      <p className="text-muted-foreground mb-4">
                        We accept Bitcoin, Ethereum, and other major cryptocurrencies.
                      </p>
                      <div className="bg-muted p-4 rounded-lg text-center mb-4">
                        <p className="font-mono mb-2">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</p>
                        <p className="text-sm text-muted-foreground">Scan QR code or copy address to pay</p>
                      </div>
                      <div className="flex items-center">
                        <Input id="cryptoConfirm" type="checkbox" className="mr-2 h-4 w-4" required />
                        <Label htmlFor="cryptoConfirm" className="text-sm">
                          I confirm that I have sent the payment
                        </Label>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Processing..." : "Complete Order"}
                </Button>
              </form>
            )}
          </div>
        </div>

        <div className="lg:w-1/3">
          <CheckoutSummary />
        </div>
      </div>
    </div>
  )
}

