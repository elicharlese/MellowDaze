import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Truck, PackageCheck, RotateCcw, Clock } from "lucide-react"

export const metadata = {
  title: "Shipping & Returns | MellowDaze",
  description: "Information about our shipping policies, delivery times, and return process.",
}

export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Shipping & Returns</h1>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about our shipping policies and return process.
          </p>
        </div>

        {/* Shipping Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="border-sunshine-yellow/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-sunshine-yellow/20 text-sunshine-orange">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Free Shipping</h3>
                  <p className="text-muted-foreground">
                    We offer free standard shipping on all orders over $75 within the continental United States.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-sunshine-yellow/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-sunshine-yellow/20 text-sunshine-orange">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Processing Time</h3>
                  <p className="text-muted-foreground">
                    Orders are typically processed within 1-2 business days before shipping.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-sunshine-yellow/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-sunshine-yellow/20 text-sunshine-orange">
                  <PackageCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Order Tracking</h3>
                  <p className="text-muted-foreground">
                    You'll receive a tracking number via email once your order ships.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-sunshine-yellow/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-sunshine-yellow/20 text-sunshine-orange">
                  <RotateCcw className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Easy Returns</h3>
                  <p className="text-muted-foreground">Hassle-free 30-day return policy for most items.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Shipping Policy */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Shipping Policy</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Shipping Methods & Timeframes</h3>
              <p className="mb-4 text-muted-foreground">
                We offer several shipping options to meet your needs. Delivery times are estimates and begin from the
                date of shipment, not the order date.
              </p>

              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left">Shipping Method</th>
                      <th className="px-4 py-3 text-left">Estimated Delivery</th>
                      <th className="px-4 py-3 text-left">Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-4 py-3">Standard Shipping</td>
                      <td className="px-4 py-3">5-7 business days</td>
                      <td className="px-4 py-3">$5.99 (Free on orders over $75)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Expedited Shipping</td>
                      <td className="px-4 py-3">3-5 business days</td>
                      <td className="px-4 py-3">$12.99</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Express Shipping</td>
                      <td className="px-4 py-3">1-2 business days</td>
                      <td className="px-4 py-3">$24.99</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">International Shipping</h3>
              <p className="text-muted-foreground">
                We currently ship to Canada, Mexico, and select European countries. International shipping rates and
                delivery times vary by location. Customs fees, duties, and taxes are the responsibility of the recipient
                and are not included in the shipping cost.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Shipping Restrictions</h3>
              <p className="text-muted-foreground">
                Some products may have shipping restrictions due to size or weight. These will be noted on the product
                page. We cannot ship to P.O. boxes for certain large items.
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Return Policy */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Return Policy</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">30-Day Return Policy</h3>
              <p className="text-muted-foreground">
                We stand behind our products and want you to be completely satisfied with your purchase. If you're not
                happy with your order for any reason, you can return most items within 30 days of delivery for a full
                refund of the purchase price.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Return Process</h3>
              <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                <li>Initiate your return by contacting our customer service team or through your account dashboard.</li>
                <li>
                  You'll receive a Return Merchandise Authorization (RMA) number and return shipping instructions.
                </li>
                <li>Package your item securely with all original packaging and accessories.</li>
                <li>Include the RMA number on the outside of the package.</li>
                <li>Ship the package using the method specified in your return instructions.</li>
              </ol>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Return Shipping</h3>
              <p className="text-muted-foreground">
                For returns due to customer preference (not defective or damaged items), the customer is responsible for
                return shipping costs. For defective or damaged items, we will provide a prepaid return shipping label.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Refund Processing</h3>
              <p className="text-muted-foreground">
                Once we receive and inspect your return, we'll process your refund within 5-7 business days. Refunds
                will be issued to the original payment method used for the purchase.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-sunshine-yellow/20">
              <AccordionTrigger>How can I track my order?</AccordionTrigger>
              <AccordionContent>
                Once your order ships, you'll receive a shipping confirmation email with a tracking number. You can also
                view your order status and tracking information in your account dashboard.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-sunshine-yellow/20">
              <AccordionTrigger>Can I change or cancel my order?</AccordionTrigger>
              <AccordionContent>
                You can request changes or cancellation within 2 hours of placing your order by contacting our customer
                service team. Once an order has begun processing, we cannot guarantee that changes or cancellations can
                be accommodated.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-sunshine-yellow/20">
              <AccordionTrigger>What if my item arrives damaged?</AccordionTrigger>
              <AccordionContent>
                If your item arrives damaged, please contact our customer service team within 48 hours of delivery.
                Please include photos of the damaged item and packaging to help us process your claim quickly.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-sunshine-yellow/20">
              <AccordionTrigger>Can I return a customized product?</AccordionTrigger>
              <AccordionContent>
                Customized or personalized products cannot be returned unless they are defective or damaged. Please
                review your customization choices carefully before completing your purchase.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-sunshine-yellow/20">
              <AccordionTrigger>Do you ship to APO/FPO addresses?</AccordionTrigger>
              <AccordionContent>
                Yes, we ship to APO/FPO addresses using USPS. Please note that delivery times may be longer than
                standard domestic shipping.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Contact Information */}
        <div className="bg-sunshine-yellow/10 rounded-lg p-6 md:p-8">
          <h2 className="text-xl font-bold mb-4">Need More Help?</h2>
          <p className="mb-4 text-muted-foreground">
            If you have any questions about shipping, returns, or your order, our customer service team is here to help.
          </p>
          <div className="space-y-2">
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:support@mellowdaze.com" className="text-sunshine-blue hover:text-sunshine-orange">
                support@mellowdaze.com
              </a>
            </p>
            <p>
              <strong>Phone:</strong> (800) 123-4567
            </p>
            <p>
              <strong>Hours:</strong> Monday - Friday, 9am - 6pm PST
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

