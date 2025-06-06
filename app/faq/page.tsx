\
```tsx file="app/faq/page.tsx"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { HelpCircle, Search, ShoppingCart, Package, CreditCard, Users, Sun } from "lucide-react"

export const metadata = {
  title: "FAQ | MellowDaze",
  description: "Frequently asked questions about our products, ordering, shipping, and more.",
}

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center">
            <HelpCircle className="h-8 w-8 mr-2 text-sunshine-yellow" />
            <span>Frequently Asked Questions</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our products and services.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for answers..."
              className="pl-10 border-sunshine-yellow/30 focus-visible:ring-sunshine-yellow"
            />
            <Button className="absolute right-1 top-1/2 -translate-y-1/2 h-8 bg-sunshine-yellow hover:bg-sunshine-orange text-foreground">
              Search
            </Button>
          </div>
        </div>

        {/* FAQ Categories */}
        <Tabs defaultValue="products" className="mb-12">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger
              value="products"
              className="data-[state=active]:bg-sunshine-yellow data-[state=active]:text-foreground"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Products
            </TabsTrigger>
            <TabsTrigger
              value="ordering"
              className="data-[state=active]:bg-sunshine-yellow data-[state=active]:text-foreground"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Ordering
            </TabsTrigger>
            <TabsTrigger
              value="shipping"
              className="data-[state=active]:bg-sunshine-yellow data-[state=active]:text-foreground"
            >
              <Package className="h-4 w-4 mr-2" />
              Shipping
            </TabsTrigger>
            <TabsTrigger
              value="account"
              className="data-[state=active]:bg-sunshine-yellow data-[state=active]:text-foreground"
            >
              <Users className="h-4 w-4 mr-2" />
              Account
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-sunshine-yellow/20">
                <AccordionTrigger>What makes MellowDaze hammocks different from others?</AccordionTrigger>
                <AccordionContent>
                  MellowDaze hammocks are designed with accessibility and convenience in mind. Our hammocks feature
                  built-in steps for easy access, integrated shade covers for sun protection, multiple storage
                  compartments for your essentials, and even built-in coolers for drinks and snacks. We use premium
                  weather-resistant materials that are both durable and comfortable.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-sunshine-yellow/20">
                <AccordionTrigger>What is the weight capacity of your hammocks?</AccordionTrigger>
                <AccordionContent>
                  Our standard hammocks have a weight capacity of 400 pounds (181 kg). Our heavy-duty models can support
                  up to 550 pounds (249 kg). Always check the product specifications for the exact weight capacity of
                  the specific model you're interested in.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-sunshine-yellow/20">
                <AccordionTrigger>Are your hammocks suitable for outdoor use year-round?</AccordionTrigger>
                <AccordionContent>
                  While our hammocks are made with weather-resistant materials, we recommend storing them or using a
                  protective cover during extreme weather conditions or when not in use for extended periods. This will
                  help extend the life of your hammock. For year-round outdoor use, consider our all-weather collection,
                  which is specifically designed to withstand various weather conditions.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-sunshine-yellow/20">
                <AccordionTrigger>How do I clean and maintain my hammock?</AccordionTrigger>
                <AccordionContent>
                  For routine cleaning, brush off loose dirt and debris, then clean with mild soap and water using a
                  soft brush or sponge. Rinse thoroughly and allow to air dry completely before storing. Avoid using
                  bleach or harsh chemicals. For specific care instructions for your model, refer to the care guide that
                  came with your hammock or visit our Care & Maintenance page.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-sunshine-yellow/20">
                <AccordionTrigger>Do your hammocks come with stands?</AccordionTrigger>
                <AccordionContent>
                  Some of our hammock models come with stands, while others are designed to be hung between trees or
                  posts. Each product description clearly indicates whether a stand is included. We also sell compatible
                  stands separately if you need one for a hammock that doesn't include it.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-sunshine-yellow/20">
                <AccordionTrigger>Are replacement parts available for your hammocks?</AccordionTrigger>
                <AccordionContent>
                  Yes, we offer replacement parts for most components of our hammocks, including shade covers, storage
                  pouches, steps, and hardware. Contact our customer service team with your model information and the
                  specific part you need, and we'll help you find the right replacement.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="ordering">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-sunshine-yellow/20">
                <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                <AccordionContent>
                  We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay,
                  Google Pay, and Shop Pay. For orders over $500, we also offer financing options through Affirm.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-sunshine-yellow/20">
                <AccordionTrigger>Can I modify or cancel my order after it's been placed?</AccordionTrigger>
                <AccordionContent>
                  You can request modifications or cancellation within 2 hours of placing your order by contacting our
                  customer service team. Once an order has begun processing, we cannot guarantee that changes or
                  cancellations can be accommodated, but we'll do our best to help.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-sunshine-yellow/20">
                <AccordionTrigger>Do you offer discounts for bulk orders?</AccordionTrigger>
                <AccordionContent>
                  Yes, we offer special pricing for bulk orders of 5 or more hammocks. Please contact our sales team at
                  sales@mellowdaze.com for a custom quote. We also have specific programs for businesses, resorts, and
                  other commercial customers.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-sunshine-yellow/20">
                <AccordionTrigger>How do I use a promo code?</AccordionTrigger>
                <AccordionContent>
                  You can enter your promo code in the designated field during checkout, just before selecting your
                  payment method. After entering the code, click "Apply" to see the discount reflected in your order
                  total. Please note that most promo codes cannot be combined with other offers.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-sunshine-yellow/20">
                <AccordionTrigger>Do you offer gift wrapping or gift messages?</AccordionTrigger>
                <AccordionContent>
                  Yes, we offer gift wrapping for an additional $5.99 per item. You can also include a personalized gift
                  message at no extra charge. Both options are available during the checkout process.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="shipping">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-sunshine-yellow/20">
                <AccordionTrigger>How long will it take to receive my order?</AccordionTrigger>
                <AccordionContent>
                  Orders typically process within 1-2 business days. Shipping times depend on your location and chosen
                  shipping method: Standard shipping (5-7 business days), Expedited shipping (3-5 business days), or
                  Express shipping (1-2 business days). You'll receive tracking information once your order ships.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-sunshine-yellow/20">
                <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
                <AccordionContent>
                  Yes, we ship to Canada, Mexico, and select European countries. International shipping rates and
                  delivery times vary by location. Please note that customs fees, duties, and taxes are the
                  responsibility of the recipient and are not included in the shipping cost.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-sunshine-yellow/20">
                <AccordionTrigger>How can I track my order?</AccordionTrigger>
                <AccordionContent>
                  Once your order ships, you'll receive a shipping confirmation email with tracking information. You can
                  also view your order status and tracking details by logging into your account on our website and
                  navigating to the "Order History" section.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-sunshine-yellow/20">
                <AccordionTrigger>What if my package is damaged during shipping?</AccordionTrigger>
                <AccordionContent>
                  If your package arrives damaged, please contact our customer service team within 48 hours of delivery.
                  Please include photos of the damaged packaging and product to help us process your claim quickly.
                  We'll arrange for a replacement to be sent to you as soon as possible.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-sunshine-yellow/20">
                <AccordionTrigger>Do you offer free shipping?</AccordionTrigger>
                <AccordionContent>
                  Yes, we offer free standard shipping on all orders over $75 within the continental United States. For
                  orders under $75, standard shipping is $5.99. Expedited and express shipping options are available at
                  an additional cost.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="account">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-sunshine-yellow/20">
                <AccordionTrigger>How do I create an account?</AccordionTrigger>
                <AccordionContent>
                  You can create an account by clicking on the "Account" icon in the top right corner of our website and
                  selecting "Sign Up." You'll need to provide your email address and create a password. You can also
                  create an account during the checkout process.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-sunshine-yellow/20">
                <AccordionTrigger>What are the benefits of creating an account?</AccordionTrigger>
                <AccordionContent>
                  Creating an account allows you to track your orders, save your shipping and payment information for
                  faster checkout, create and manage wishlists, access exclusive offers, and earn rewards through our
                  loyalty program.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-sunshine-yellow/20">
                <AccordionTrigger>I forgot my password. How do I reset it?</AccordionTrigger>
                <AccordionContent>
                  Click on the "Account" icon in the top right corner and select "Sign In." Then click on "Forgot
                  Password?" and enter the email address associated with your account. We'll send you a link to reset
                  your password. For security reasons, this link will expire after 24 hours.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-sunshine-yellow/20">
                <AccordionTrigger>How do I update my account information?</AccordionTrigger>
                <AccordionContent>
                  After signing in to your account, click on "Account Settings" or "Profile" to update your personal
                  information, shipping addresses, and payment methods. Be sure to click "Save Changes" after making any
                  updates.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-sunshine-yellow/20">
                <AccordionTrigger>Can I have multiple shipping addresses in my account?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can save multiple shipping addresses in your account. This is especially useful if you
                  frequently ship to different locations or want to send gifts directly to recipients. You can manage
                  your addresses in the "Addresses" section of your account.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>

        {/* Popular Questions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Most Popular Questions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-sunshine-yellow/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-sunshine-yellow/20 text-sunshine-orange">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">What is your return policy?</h3>
                    <p className="text-muted-foreground mb-2">
                      We offer a 30-day return policy for most items. Products must be in original condition with all
                      packaging and accessories.
                    </p>
                    <a href="/shipping" className="text-sunshine-blue hover:text-sunshine-orange text-sm">
                      View our full return policy →
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-sunshine-yellow/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-sunshine-yellow/20 text-sunshine-orange">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">How do I assemble my hammock?</h3>
                    <p className="text-muted-foreground mb-2">
                      Each hammock comes with detailed assembly instructions. We also have video tutorials available on
                      our website.
                    </p>
                    <a href="#" className="text-sunshine-blue hover:text-sunshine-orange text-sm">
                      Watch assembly videos →
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-sunshine-yellow/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-sunshine-yellow/20 text-sunshine-orange">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Are your products covered by warranty?</h3>
                    <p className="text-muted-foreground mb-2">
                      Yes, all MellowDaze products come with a comprehensive warranty against manufacturing defects.
                    </p>
                    <a href="/warranty" className="text-sunshine-blue hover:text-sunshine-orange text-sm">
                      View our warranty information →
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-sunshine-yellow/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-sunshine-yellow/20 text-sunshine-orange">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Do you offer financing options?</h3>
                    <p className="text-muted-foreground mb-2">
                      Yes, we offer financing through Affirm for orders over $500. You can select this option during
                      checkout.
                    </p>
                    <a href="#" className="text-sunshine-blue hover:text-sunshine-orange text-sm">
                      Learn more about financing →
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Still Have Questions */}
        <div className="bg-sunshine-yellow/10 rounded-lg p-6 md:p-8 text-center">
          <div className="flex justify-center mb-4">
            <Sun className="h-12 w-12 text-sunshine-orange" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Can't find the answer you're looking for? Our customer service team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-sunshine-yellow hover:bg-sunshine-orange text-foreground">
              <a href="/contact">Contact Us</a>
            </Button>
            <Button variant="outline" className="border-sunshine-blue text-sunshine-blue hover:bg-sunshine-blue/10">
              Live Chat
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

