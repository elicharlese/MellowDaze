import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, Briefcase, Users, Sun, CheckCircle } from "lucide-react"

export const metadata = {
  title: "Careers | MellowDaze",
  description: "Join our team and help us redefine outdoor relaxation.",
}

// Mock job listings
const jobListings = [
  {
    id: 1,
    title: "Product Designer",
    department: "Design",
    location: "San Diego, CA",
    type: "Full-time",
    description:
      "We're looking for a creative Product Designer to join our team and help design the next generation of hammock products.",
    slug: "product-designer",
  },
  {
    id: 2,
    title: "Marketing Specialist",
    department: "Marketing",
    location: "San Diego, CA",
    type: "Full-time",
    description: "Join our marketing team to develop and implement strategies that promote our brand and products.",
    slug: "marketing-specialist",
  },
  {
    id: 3,
    title: "Customer Service Representative",
    department: "Customer Support",
    location: "Remote",
    type: "Full-time",
    description: "Help our customers have the best experience with our products by providing exceptional support.",
    slug: "customer-service-representative",
  },
  {
    id: 4,
    title: "Supply Chain Manager",
    department: "Operations",
    location: "San Diego, CA",
    type: "Full-time",
    description: "Oversee our supply chain operations to ensure efficient production and delivery of our products.",
    slug: "supply-chain-manager",
  },
  {
    id: 5,
    title: "Software Developer",
    department: "Technology",
    location: "Remote",
    type: "Full-time",
    description: "Develop and maintain our e-commerce platform and internal tools to support our growing business.",
    slug: "software-developer",
  },
]

export default function CareersPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      {/* Hero Section */}
      <div className="relative rounded-lg overflow-hidden mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/40 z-10" />
        <Image
          src="/placeholder.svg?height=500&width=1200&text=Join+Our+Team"
          alt="Join Our Team"
          width={1200}
          height={500}
          className="w-full h-[300px] md:h-[400px] object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Join the <span className="sunshine-text-gradient">MellowDaze</span> Team
              </h1>
              <p className="text-lg mb-8">
                Help us redefine outdoor relaxation with innovative products that bring comfort and joy to people's
                lives.
              </p>
              <Button className="bg-sunshine-yellow hover:bg-sunshine-orange text-foreground">
                View Open Positions
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Why Join Us */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Join MellowDaze?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're more than just a hammock company. We're a team of passionate individuals dedicated to creating
            products that enhance people's lives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-sunshine-yellow/20">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-sunshine-yellow/20 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-sunshine-orange" />
              </div>
              <h3 className="text-xl font-bold mb-2">Collaborative Culture</h3>
              <p className="text-muted-foreground">
                Work in a supportive environment where your ideas are valued and teamwork is encouraged.
              </p>
            </CardContent>
          </Card>

          <Card className="border-sunshine-yellow/20">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-sunshine-yellow/20 flex items-center justify-center mb-4">
                <Sun className="h-6 w-6 text-sunshine-orange" />
              </div>
              <h3 className="text-xl font-bold mb-2">Work-Life Balance</h3>
              <p className="text-muted-foreground">
                We practice what we preach – relaxation is important, and we ensure our team has time to recharge.
              </p>
            </CardContent>
          </Card>

          <Card className="border-sunshine-yellow/20">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-sunshine-yellow/20 flex items-center justify-center mb-4">
                <Briefcase className="h-6 w-6 text-sunshine-orange" />
              </div>
              <h3 className="text-xl font-bold mb-2">Growth Opportunities</h3>
              <p className="text-muted-foreground">
                Develop your skills and advance your career with our commitment to professional development.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Benefits */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Benefits & Perks</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We take care of our team with competitive benefits and a positive work environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-sunshine-yellow/5 rounded-lg p-6 border border-sunshine-yellow/20">
            <h3 className="text-xl font-bold mb-4">Health & Wellness</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-sunshine-orange mr-2 mt-0.5 flex-shrink-0" />
                <span>Comprehensive health, dental, and vision insurance</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-sunshine-orange mr-2 mt-0.5 flex-shrink-0" />
                <span>Mental health resources and support</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-sunshine-orange mr-2 mt-0.5 flex-shrink-0" />
                <span>Wellness stipend for gym memberships or fitness classes</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-sunshine-orange mr-2 mt-0.5 flex-shrink-0" />
                <span>Ergonomic workstations and equipment</span>
              </li>
            </ul>
          </div>

          <div className="bg-sunshine-yellow/5 rounded-lg p-6 border border-sunshine-yellow/20">
            <h3 className="text-xl font-bold mb-4">Work & Life</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-sunshine-orange mr-2 mt-0.5 flex-shrink-0" />
                <span>Flexible work arrangements and remote options</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-sunshine-orange mr-2 mt-0.5 flex-shrink-0" />
                <span>Generous paid time off and holidays</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-sunshine-orange mr-2 mt-0.5 flex-shrink-0" />
                <span>Parental leave for growing families</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-sunshine-orange mr-2 mt-0.5 flex-shrink-0" />
                <span>Company-wide retreats and team building events</span>
              </li>
            </ul>
          </div>

          <div className="bg-sunshine-yellow/5 rounded-lg p-6 border border-sunshine-yellow/20">
            <h3 className="text-xl font-bold mb-4">Financial Benefits</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-sunshine-orange mr-2 mt-0.5 flex-shrink-0" />
                <span>Competitive salary packages</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-sunshine-orange mr-2 mt-0.5 flex-shrink-0" />
                <span>401(k) retirement plan with company match</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-sunshine-orange mr-2 mt-0.5 flex-shrink-0" />
                <span>Profit sharing opportunities</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-sunshine-orange mr-2 mt-0.5 flex-shrink-0" />
                <span>Employee discount on all MellowDaze products</span>
              </li>
            </ul>
          </div>

          <div className="bg-sunshine-yellow/5 rounded-lg p-6 border border-sunshine-yellow/20">
            <h3 className="text-xl font-bold mb-4">Growth & Development</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-sunshine-orange mr-2 mt-0.5 flex-shrink-0" />
                <span>Professional development budget</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-sunshine-orange mr-2 mt-0.5 flex-shrink-0" />
                <span>Mentorship programs</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-sunshine-orange mr-2 mt-0.5 flex-shrink-0" />
                <span>Regular feedback and career planning</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-sunshine-orange mr-2 mt-0.5 flex-shrink-0" />
                <span>Tuition reimbursement for relevant education</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our team and help us create products that bring joy and relaxation to people's lives.
          </p>
        </div>

        <div className="space-y-4">
          {jobListings.map((job) => (
            <Card key={job.id} className="border-sunshine-yellow/20 hover:border-sunshine-yellow transition-colors">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {job.department}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {job.type}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{job.description}</p>
                  </div>
                  <Button asChild className="md:self-start flex-shrink-0">
                    <Link href={`/careers/${job.slug}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Application Process */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Application Process</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We've designed a straightforward process to help us find the right candidates for our team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-sunshine-yellow/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold text-sunshine-orange">1</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Application</h3>
            <p className="text-muted-foreground">Submit your resume and cover letter through our online portal.</p>
          </div>

          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-sunshine-yellow/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold text-sunshine-orange">2</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Initial Interview</h3>
            <p className="text-muted-foreground">
              A conversation with our HR team to learn more about you and your experience.
            </p>
          </div>

          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-sunshine-yellow/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold text-sunshine-orange">3</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Team Interview</h3>
            <p className="text-muted-foreground">
              Meet with the team you'll be working with to discuss skills and fit.
            </p>
          </div>

          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-sunshine-yellow/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold text-sunshine-orange">4</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Offer</h3>
            <p className="text-muted-foreground">
              If there's a match, we'll extend an offer to welcome you to the team!
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-sunshine-yellow/10 rounded-lg p-8 md:p-12 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Don't See the Right Position?</h2>
          <p className="text-lg mb-6">
            We're always looking for talented individuals to join our team. Send us your resume and we'll keep it on
            file for future opportunities.
          </p>
          <Button asChild className="bg-sunshine-yellow hover:bg-sunshine-orange text-foreground">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

