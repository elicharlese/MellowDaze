"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { MapPin, Phone, Mail, Clock, CheckCircle, Loader2 } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: "", email: "", subject: "", message: "" })

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
    }, 5000)
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have questions about our products or need assistance? We're here to help!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <Card className="border-sunshine-yellow/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-sunshine-yellow/20 text-sunshine-orange">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Our Location</h3>
                <p className="text-muted-foreground">123 Sunshine Blvd</p>
                <p className="text-muted-foreground">San Diego, CA 92101</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-sunshine-yellow/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-sunshine-yellow/20 text-sunshine-orange">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Phone</h3>
                <p className="text-muted-foreground">Customer Service: (800) 123-4567</p>
                <p className="text-muted-foreground">Support: (800) 765-4321</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-sunshine-yellow/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-sunshine-yellow/20 text-sunshine-orange">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Email</h3>
                <p className="text-muted-foreground">info@mellowdaze.com</p>
                <p className="text-muted-foreground">support@mellowdaze.com</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-2">
          <Card className="border-sunshine-yellow/20">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

              {isSubmitted && (
                <Alert className="mb-6 border-green-500 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <AlertDescription className="text-green-700">
                    Thank you for your message! We'll get back to you soon.
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border-sunshine-blue/30 focus-visible:ring-sunshine-yellow"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border-sunshine-blue/30 focus-visible:ring-sunshine-yellow"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="border-sunshine-blue/30 focus-visible:ring-sunshine-yellow"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="border-sunshine-blue/30 focus-visible:ring-sunshine-yellow"
                  />
                </div>

                <Button
                  type="submit"
                  className="bg-sunshine-yellow hover:bg-sunshine-orange text-foreground"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="border-sunshine-yellow/20">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Business Hours</h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-sunshine-yellow/20 text-sunshine-orange">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Customer Service</h3>
                    <p className="text-muted-foreground">Monday - Friday: 9am - 6pm PST</p>
                    <p className="text-muted-foreground">Saturday: 10am - 4pm PST</p>
                    <p className="text-muted-foreground">Sunday: Closed</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-bold mb-2">Showroom</h3>
                  <p className="text-muted-foreground mb-4">Visit our showroom to experience our hammocks in person!</p>
                  <p className="text-muted-foreground">Monday - Saturday: 10am - 5pm PST</p>
                  <p className="text-muted-foreground">Sunday: 12pm - 4pm PST</p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-bold mb-2">Holiday Hours</h3>
                  <p className="text-muted-foreground">
                    Our hours may vary during holidays. Please check our social media for updates.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Map */}
      <div className="rounded-lg overflow-hidden h-[400px] bg-muted flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-2">Map placeholder</p>
          <p className="text-muted-foreground">123 Sunshine Blvd, San Diego, CA 92101</p>
        </div>
      </div>
    </div>
  )
}

