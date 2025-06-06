import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Shield, CheckCircle, AlertCircle } from "lucide-react"

export const metadata = {
  title: "Warranty | MellowDaze",
  description: "Information about our product warranties, coverage details, and claim process.",
}

export default function WarrantyPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Product Warranty</h1>
          <p className="text-lg text-muted-foreground">
            We stand behind the quality of our products with comprehensive warranty coverage.
          </p>
        </div>

        {/* Warranty Overview */}
        <div className="mb-12">
          <Card className="border-sunshine-yellow/20 bg-sunshine-yellow/5">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="p-4 rounded-full bg-sunshine-yellow/20 text-sunshine-orange">
                  <Shield className="h-12 w-12" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">MellowDaze Confidence Guarantee</h2>
                  <p className="text-muted-foreground">
                    All MellowDaze products are backed by our comprehensive warranty program, ensuring you can purchase
                    with confidence. We're committed to providing high-quality products that stand the test of time.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Warranty Coverage */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Warranty Coverage</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Premium Hammocks</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left">Component</th>
                      <th className="px-4 py-3 text-left">Coverage Period</th>
                      <th className="px-4 py-3 text-left">What's Covered</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-4 py-3">Frame & Structure</td>
                      <td className="px-4 py-3">5 Years</td>
                      <td className="px-4 py-3">Structural integrity, welding defects, rust prevention</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Fabric & Stitching</td>
                      <td className="px-4 py-3">3 Years</td>
                      <td className="px-4 py-3">Fabric tears, seam separation, color fading beyond normal wear</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Accessories & Components</td>
                      <td className="px-4 py-3">2 Years</td>
                      <td className="px-4 py-3">Steps, shade covers, storage compartments, hardware</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Accessories & Add-ons</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left">Product Category</th>
                      <th className="px-4 py-3 text-left">Coverage Period</th>
                      <th className="px-4 py-3 text-left">What's Covered</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-4 py-3">Shade Covers</td>
                      <td className="px-4 py-3">2 Years</td>
                      <td className="px-4 py-3">Material defects, UV resistance, attachment mechanisms</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Storage Solutions</td>
                      <td className="px-4 py-3">2 Years</td>
                      <td className="px-4 py-3">Structural integrity, attachment systems, water resistance</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Stands & Mounts</td>
                      <td className="px-4 py-3">3 Years</td>
                      <td className="px-4 py-3">Structural integrity, stability, rust prevention</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        {/* What's Covered */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">What's Covered</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="border-sunshine-yellow/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-green-100 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Manufacturing Defects</h3>
                    <p className="text-muted-foreground">
                      Any flaws in materials or workmanship that affect the functionality of the product.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-sunshine-yellow/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-green-100 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Structural Integrity</h3>
                    <p className="text-muted-foreground">
                      Issues with frames, supports, or other structural components under normal use.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-sunshine-yellow/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-green-100 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Fabric & Material Failures</h3>
                    <p className="text-muted-foreground">
                      Premature deterioration, abnormal fading, or tearing of fabrics under normal conditions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-sunshine-yellow/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-green-100 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Hardware & Components</h3>
                    <p className="text-muted-foreground">
                      Failure of hardware, zippers, buckles, or other components under normal use.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <h3 className="text-xl font-semibold mb-4">What's Not Covered</h3>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>Damage from improper use, accidents, or failure to follow care instructions</span>
            </li>
            <li className="flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>Normal wear and tear expected from regular use</span>
            </li>
            <li className="flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>Damage from extreme weather conditions beyond product specifications</span>
            </li>
            <li className="flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>Modifications or alterations to the original product</span>
            </li>
            <li className="flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>Products purchased from unauthorized retailers</span>
            </li>
          </ul>
        </div>

        {/* Warranty Claim Process */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Warranty Claim Process</h2>

          <div className="space-y-6">
            <p className="text-muted-foreground">
              If you believe your product has an issue covered by our warranty, please follow these steps to initiate a
              claim:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-sunshine-yellow/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-sunshine-orange">1</span>
                </div>
                <h3 className="font-semibold mb-2">Contact Us</h3>
                <p className="text-sm text-muted-foreground">
                  Reach out to our customer service team via email or phone with your order details and a description of
                  the issue.
                </p>
              </div>

              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-sunshine-yellow/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-sunshine-orange">2</span>
                </div>
                <h3 className="font-semibold mb-2">Documentation</h3>
                <p className="text-sm text-muted-foreground">
                  Provide photos or videos of the issue, along with your proof of purchase and product information.
                </p>
              </div>

              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-sunshine-yellow/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-sunshine-orange">3</span>
                </div>
                <h3 className="font-semibold mb-2">Resolution</h3>
                <p className="text-sm text-muted-foreground">
                  Our team will review your claim and provide repair, replacement, or other resolution options.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-sunshine-yellow/20">
              <AccordionTrigger>Do I need to register my product for warranty coverage?</AccordionTrigger>
              <AccordionContent>
                No, your warranty is automatically activated when you purchase from MellowDaze or an authorized
                retailer. However, we recommend keeping your proof of purchase for warranty claims.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-sunshine-yellow/20">
              <AccordionTrigger>
                Is my warranty transferable if I give or sell my product to someone else?
              </AccordionTrigger>
              <AccordionContent>
                No, our warranty coverage is only valid for the original purchaser and is not transferable to subsequent
                owners.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-sunshine-yellow/20">
              <AccordionTrigger>What documentation do I need for a warranty claim?</AccordionTrigger>
              <AccordionContent>
                You'll need your proof of purchase (receipt or order confirmation), the product's serial number (if
                applicable), and photos or videos documenting the issue.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-sunshine-yellow/20">
              <AccordionTrigger>How long does the warranty claim process take?</AccordionTrigger>
              <AccordionContent>
                Most warranty claims are processed within 5-7 business days. Complex issues may take longer to resolve.
                We'll keep you updated throughout the process.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-sunshine-yellow/20">
              <AccordionTrigger>Do I have to pay for shipping for warranty repairs or replacements?</AccordionTrigger>
              <AccordionContent>
                For valid warranty claims, MellowDaze covers the cost of shipping for repairs or replacements within the
                continental United States.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Extended Warranty */}
        <div className="bg-sunshine-yellow/10 rounded-lg p-6 md:p-8 mb-12">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="p-3 rounded-full bg-sunshine-yellow/20 text-sunshine-orange flex-shrink-0">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Extended Protection Plan</h2>
              <p className="text-muted-foreground mb-4">
                For additional peace of mind, we offer extended warranty coverage that provides:
              </p>
              <ul className="space-y-2 text-muted-foreground mb-4">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-sunshine-orange mr-2" />
                  <span>Additional 2-3 years of coverage beyond the standard warranty</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-sunshine-orange mr-2" />
                  <span>Coverage for accidental damage not included in the standard warranty</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-sunshine-orange mr-2" />
                  <span>Priority processing for warranty claims</span>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground">
                Extended Protection Plans can be purchased at checkout or within 30 days of your product purchase.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-muted rounded-lg p-6 md:p-8">
          <h2 className="text-xl font-bold mb-4">Warranty Support</h2>
          <p className="mb-4 text-muted-foreground">
            If you have any questions about our warranty or need to file a claim, our customer service team is here to
            help.
          </p>
          <div className="space-y-2">
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:warranty@mellowdaze.com" className="text-sunshine-blue hover:text-sunshine-orange">
                warranty@mellowdaze.com
              </a>
            </p>
            <p>
              <strong>Phone:</strong> (800) 123-4567, Option 2
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

