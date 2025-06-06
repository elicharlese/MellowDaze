import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Users, Leaf, Award } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "About Us | MellowDaze",
  description: "Learn about MellowDaze and our mission to redefine outdoor relaxation.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
        <div className="md:w-1/2">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            About <span className="sunshine-text-gradient">MellowDaze</span>
          </h1>
          <p className="text-lg mb-6 text-muted-foreground">
            Founded in 2018, MellowDaze was born from a simple idea: to create hammocks that are accessible to everyone,
            regardless of age or mobility. Our founder, Sarah Johnson, noticed that traditional hammocks were difficult
            for her elderly parents to use, inspiring her to design a hammock with built-in steps.
          </p>
          <p className="text-lg mb-6 text-muted-foreground">
            Today, MellowDaze has grown into a leading provider of innovative hammocks and accessories, all designed
            with comfort, accessibility, and convenience in mind.
          </p>
          <Button asChild className="bg-sunshine-yellow hover:bg-sunshine-orange text-foreground">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
        <div className="md:w-1/2 relative h-[400px] w-full rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=400&width=600&text=Our+Team"
            alt="The MellowDaze team"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Our Values */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            At MellowDaze, we're guided by a set of core values that influence everything we do.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-sunshine-yellow/20">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-sunshine-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-sunshine-orange" />
              </div>
              <h3 className="text-xl font-bold mb-2">Inclusivity</h3>
              <p className="text-muted-foreground">
                We believe everyone deserves to enjoy the comfort of a hammock, which is why accessibility is at the
                core of our designs.
              </p>
            </CardContent>
          </Card>

          <Card className="border-sunshine-yellow/20">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-sunshine-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-sunshine-orange" />
              </div>
              <h3 className="text-xl font-bold mb-2">Sustainability</h3>
              <p className="text-muted-foreground">
                We're committed to using eco-friendly materials and sustainable practices throughout our production
                process.
              </p>
            </CardContent>
          </Card>

          <Card className="border-sunshine-yellow/20">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-sunshine-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-sunshine-orange" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quality</h3>
              <p className="text-muted-foreground">
                We never compromise on quality, using only the finest materials to ensure our products are durable and
                long-lasting.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Our Story */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The journey from a simple idea to a thriving business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[300px] w-full rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=300&width=500&text=Our+Beginning"
              alt="MellowDaze beginnings"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">From Prototype to Product</h3>
            <p className="text-muted-foreground mb-4">
              What started as a homemade prototype in Sarah's garage quickly gained attention from friends and family.
              The unique design, featuring built-in steps and an integrated shade cover, solved problems that
              traditional hammocks had ignored for years.
            </p>
            <p className="text-muted-foreground">
              After refining the design and securing a patent, Sarah launched MellowDaze with a successful crowdfunding
              campaign that exceeded its goal by 300%. The rest, as they say, is history.
            </p>
          </div>
        </div>

        <Separator className="my-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-bold mb-4">Growing with Purpose</h3>
            <p className="text-muted-foreground mb-4">
              As MellowDaze grew, we remained committed to our founding principles. We expanded our product line to
              include accessories that enhance the hammock experience, always with accessibility and convenience in
              mind.
            </p>
            <p className="text-muted-foreground">
              Today, we're proud to have helped thousands of people experience the joy and relaxation of hammock life,
              regardless of age or mobility. Our community of "Dazers" continues to grow, sharing stories of how our
              products have enhanced their outdoor experiences.
            </p>
          </div>
          <div className="order-1 md:order-2 relative h-[300px] w-full rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=300&width=500&text=Our+Growth"
              alt="MellowDaze growth"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Join Our Team */}
      <div className="bg-sunshine-yellow/10 rounded-lg p-8 md:p-12 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
          <p className="text-lg mb-6">
            We're always looking for passionate individuals to join our growing team. Check out our current openings or
            send us your resume for future opportunities.
          </p>
          <Button asChild className="bg-sunshine-yellow hover:bg-sunshine-orange text-foreground">
            <Link href="/careers">View Careers</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

