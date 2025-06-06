import { Separator } from "@/components/ui/separator"
import { Shield, Lock, Eye, FileText } from "lucide-react"

export const metadata = {
  title: "Privacy Policy | MellowDaze",
  description: "Information about how we collect, use, and protect your personal data.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground">Last Updated: March 15, 2023</p>
        </div>

        {/* Introduction */}
        <div className="mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-2 rounded-full bg-sunshine-yellow/20 text-sunshine-orange">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Introduction</h2>
              <p className="text-muted-foreground">
                At MellowDaze, we value your privacy and are committed to protecting your personal data. This Privacy
                Policy explains how we collect, use, disclose, and safeguard your information when you visit our
                website, make a purchase, or interact with us in any way.
              </p>
              <p className="text-muted-foreground mt-4">
                Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy,
                please do not access the site or use our services.
              </p>
            </div>
          </div>
        </div>

        {/* Information We Collect */}
        <div className="mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-2 rounded-full bg-sunshine-yellow/20 text-sunshine-orange">
              <Eye className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Information We Collect</h2>
              <p className="text-muted-foreground mb-4">
                We collect several types of information from and about users of our website, including:
              </p>

              <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
              <p className="text-muted-foreground mb-2">
                When you create an account, place an order, sign up for our newsletter, or contact us, we may collect:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                <li>Name, email address, postal address, and phone number</li>
                <li>Payment information (credit card numbers, billing address)</li>
                <li>Account login credentials</li>
                <li>Order history and preferences</li>
                <li>Communications with our customer service team</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2">Automatically Collected Information</h3>
              <p className="text-muted-foreground mb-2">When you visit our website, we may automatically collect:</p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                <li>IP address and device information</li>
                <li>Browser type and operating system</li>
                <li>Pages you view and links you click</li>
                <li>Time spent on our website and visit timestamps</li>
                <li>Referring website or source that led you to our site</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2">Cookies and Similar Technologies</h3>
              <p className="text-muted-foreground">
                We use cookies, web beacons, and similar technologies to enhance your experience, gather information
                about users and visits to our website, and improve our services. You can control cookies through your
                browser settings and other tools. However, if you block certain cookies, you may not be able to use some
                features of the site.
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        {/* How We Use Your Information */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">How We Use Your Information</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">To Provide and Improve Our Services</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Process and fulfill your orders</li>
                <li>Create and manage your account</li>
                <li>Provide customer support</li>
                <li>Improve our website, products, and services</li>
                <li>Develop new products and features</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">For Marketing and Communication</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Send promotional emails about new products, special offers, or other information</li>
                <li>Deliver content and product recommendations relevant to your interests</li>
                <li>Communicate about your account or orders</li>
                <li>Request feedback about our products and services</li>
                <li>Notify you about changes to our policies or terms</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">For Security and Legal Compliance</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Protect against fraud and unauthorized transactions</li>
                <li>Enforce our terms and conditions</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes and troubleshoot problems</li>
                <li>Respond to legal requests and prevent harm</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Information Sharing */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Information Sharing and Disclosure</h2>

          <div className="space-y-6">
            <p className="text-muted-foreground">We may share your personal information in the following situations:</p>

            <div>
              <h3 className="text-xl font-semibold mb-2">Service Providers</h3>
              <p className="text-muted-foreground">
                We may share your information with third-party vendors, service providers, contractors, or agents who
                perform services for us or on our behalf, such as payment processing, order fulfillment, data analysis,
                email delivery, hosting services, customer service, and marketing assistance.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Business Transfers</h3>
              <p className="text-muted-foreground">
                If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information
                may be transferred as part of that transaction. We will notify you via email and/or a prominent notice
                on our website of any change in ownership or uses of your personal information.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Legal Requirements</h3>
              <p className="text-muted-foreground">
                We may disclose your information where we are legally required to do so in order to comply with
                applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in
                response to a court order or a subpoena.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">With Your Consent</h3>
              <p className="text-muted-foreground">
                We may disclose your personal information for any other purpose with your consent.
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Data Security */}
        <div className="mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-2 rounded-full bg-sunshine-yellow/20 text-sunshine-orange">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Data Security</h2>
              <p className="text-muted-foreground mb-4">
                We have implemented appropriate technical and organizational security measures designed to protect the
                security of any personal information we process. However, despite our safeguards and efforts to secure
                your information, no electronic transmission over the Internet or information storage technology can be
                guaranteed to be 100% secure.
              </p>
              <p className="text-muted-foreground">
                We use industry-standard encryption technologies when transferring and receiving consumer data exchanged
                with our site. We have appropriate security measures in place in our physical facilities to protect
                against the loss, misuse, or alteration of information that we have collected from you at our site.
              </p>
            </div>
          </div>
        </div>

        {/* Your Privacy Rights */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Your Privacy Rights</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Access and Update</h3>
              <p className="text-muted-foreground">
                You can review and change your personal information by logging into your account and visiting your
                account profile page. You may also contact us directly to request access to, correct, or delete any
                personal information that you have provided to us.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Marketing Communications</h3>
              <p className="text-muted-foreground">
                You can opt out of receiving marketing emails from us by clicking the "unsubscribe" link in the emails.
                Even if you opt out of marketing communications, we will still send you transactional emails related to
                your account or purchases.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Cookies and Tracking Technologies</h3>
              <p className="text-muted-foreground">
                Most web browsers are set to accept cookies by default. If you prefer, you can usually choose to set
                your browser to remove or reject cookies. Please note that if you choose to remove or reject cookies,
                this could affect certain features or services of our website.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Do Not Track</h3>
              <p className="text-muted-foreground">
                Some browsers have a "Do Not Track" feature that lets you tell websites that you do not want to have
                your online activities tracked. At this time, we do not respond to browser "Do Not Track" signals.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">California Privacy Rights</h3>
              <p className="text-muted-foreground">
                If you are a California resident, you have specific rights regarding your personal information under the
                California Consumer Privacy Act (CCPA). These rights include the right to know what personal information
                we collect, the right to request deletion of your personal information, the right to opt-out of the sale
                of your personal information, and the right to non-discrimination for exercising your privacy rights.
              </p>
            </div>
          </div>
        </div>

        {/* Children's Privacy */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Children's Privacy</h2>
          <p className="text-muted-foreground">
            Our website is not intended for children under 13 years of age. We do not knowingly collect personal
            information from children under 13. If you are a parent or guardian and you believe your child has provided
            us with personal information, please contact us. If we discover that a child under 13 has provided us with
            personal information, we will delete such information from our servers.
          </p>
        </div>

        {/* Changes to Privacy Policy */}
        <div className="mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-2 rounded-full bg-sunshine-yellow/20 text-sunshine-orange">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last Updated" date at the top. You are advised to review
                this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they
                are posted on this page.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-sunshine-yellow/10 rounded-lg p-6 md:p-8">
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <p className="mb-4 text-muted-foreground">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <div className="space-y-2">
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:privacy@mellowdaze.com" className="text-sunshine-blue hover:text-sunshine-orange">
                privacy@mellowdaze.com
              </a>
            </p>
            <p>
              <strong>Address:</strong> MellowDaze, Inc., 123 Sunshine Blvd, San Diego, CA 92101
            </p>
            <p>
              <strong>Phone:</strong> (800) 123-4567
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

