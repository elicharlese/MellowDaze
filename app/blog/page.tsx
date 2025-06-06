import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { CalendarDays, User, ArrowRight, Sun } from "lucide-react"

export const metadata = {
  title: "Blog | MellowDaze",
  description: "Read the latest articles about hammock life, outdoor relaxation, and product tips.",
}

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    title: "The Ultimate Guide to Choosing Your Perfect Hammock",
    excerpt:
      "Discover the key factors to consider when selecting a hammock that meets your specific needs and preferences.",
    date: "2023-06-15",
    author: "Sarah Johnson",
    category: "Buying Guide",
    image: "/placeholder.svg?height=400&width=600&text=Hammock+Guide",
    slug: "ultimate-guide-choosing-perfect-hammock",
  },
  {
    id: 2,
    title: "5 Scenic Locations for Hammock Camping This Summer",
    excerpt:
      "Explore these breathtaking destinations that offer the perfect setting for your next hammock camping adventure.",
    date: "2023-05-22",
    author: "Michael Torres",
    category: "Travel",
    image: "/placeholder.svg?height=400&width=600&text=Scenic+Locations",
    slug: "scenic-locations-hammock-camping-summer",
  },
  {
    id: 3,
    title: "How to Set Up Your Hammock for Maximum Comfort",
    excerpt: "Learn the proper techniques for hanging your hammock to ensure optimal comfort and support.",
    date: "2023-04-18",
    author: "Emily Chen",
    category: "Tips & Tricks",
    image: "/placeholder.svg?height=400&width=600&text=Hammock+Setup",
    slug: "set-up-hammock-maximum-comfort",
  },
  {
    id: 4,
    title: "The Health Benefits of Regular Hammock Use",
    excerpt: "Discover how spending time in a hammock can improve your physical and mental well-being.",
    date: "2023-03-30",
    author: "Dr. James Wilson",
    category: "Wellness",
    image: "/placeholder.svg?height=400&width=600&text=Health+Benefits",
    slug: "health-benefits-regular-hammock-use",
  },
  {
    id: 5,
    title: "DIY Hammock Accessories to Enhance Your Experience",
    excerpt: "Create these simple yet effective accessories to take your hammock relaxation to the next level.",
    date: "2023-02-14",
    author: "Lisa Patel",
    category: "DIY Projects",
    image: "/placeholder.svg?height=400&width=600&text=DIY+Accessories",
    slug: "diy-hammock-accessories-enhance-experience",
  },
  {
    id: 6,
    title: "Hammock Care 101: Maintaining Your Investment",
    excerpt:
      "Follow these essential care tips to ensure your hammock remains in excellent condition for years to come.",
    date: "2023-01-25",
    author: "Carlos Rodriguez",
    category: "Maintenance",
    image: "/placeholder.svg?height=400&width=600&text=Hammock+Care",
    slug: "hammock-care-101-maintaining-investment",
  },
]

// Format date to readable format
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center">
          <Sun className="h-6 w-6 mr-2 text-sunshine-yellow" />
          <span>MellowDaze Blog</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Insights, tips, and stories about hammock life and outdoor relaxation
        </p>
      </div>

      {/* Featured Post */}
      <div className="mb-16">
        <div className="relative rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
          <Image
            src="/placeholder.svg?height=600&width=1200&text=Featured+Post"
            alt="Featured blog post"
            width={1200}
            height={600}
            className="w-full h-[400px] md:h-[500px] object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
            <div className="flex items-center gap-4 text-white/80 mb-3">
              <span className="flex items-center text-sm">
                <CalendarDays className="h-4 w-4 mr-1" />
                {formatDate("2023-07-10")}
              </span>
              <span className="flex items-center text-sm">
                <User className="h-4 w-4 mr-1" />
                Sarah Johnson
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              The Science of Relaxation: Why Hammocks Are the Ultimate Stress Relievers
            </h2>
            <p className="text-white/90 mb-4 max-w-3xl">
              New research reveals how the gentle rocking motion of hammocks affects brain waves and promotes deeper
              relaxation than traditional seating or beds.
            </p>
            <Button asChild className="bg-sunshine-yellow hover:bg-sunshine-orange text-foreground">
              <Link href="/blog/science-relaxation-hammocks-stress-relievers">
                Read Article
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Blog Categories */}
      <div className="flex flex-wrap gap-2 mb-12 justify-center">
        <Button variant="outline" className="border-sunshine-yellow/30 hover:bg-sunshine-yellow/10">
          All
        </Button>
        <Button variant="outline" className="border-sunshine-yellow/30 hover:bg-sunshine-yellow/10">
          Buying Guide
        </Button>
        <Button variant="outline" className="border-sunshine-yellow/30 hover:bg-sunshine-yellow/10">
          Travel
        </Button>
        <Button variant="outline" className="border-sunshine-yellow/30 hover:bg-sunshine-yellow/10">
          Tips & Tricks
        </Button>
        <Button variant="outline" className="border-sunshine-yellow/30 hover:bg-sunshine-yellow/10">
          Wellness
        </Button>
        <Button variant="outline" className="border-sunshine-yellow/30 hover:bg-sunshine-yellow/10">
          DIY Projects
        </Button>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {blogPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden flex flex-col h-full border-sunshine-yellow/20">
            <div className="relative h-48">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>
            <CardContent className="flex-grow p-6">
              <div className="flex items-center gap-4 text-muted-foreground mb-3">
                <span className="text-xs flex items-center">
                  <CalendarDays className="h-3 w-3 mr-1" />
                  {formatDate(post.date)}
                </span>
                <span className="text-xs bg-sunshine-yellow/20 text-sunshine-orange px-2 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 line-clamp-2">
                <Link href={`/blog/${post.slug}`} className="hover:text-sunshine-orange transition-colors">
                  {post.title}
                </Link>
              </h3>
              <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <User className="h-4 w-4 mr-1" />
                {post.author}
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button variant="ghost" asChild className="text-sunshine-blue hover:text-sunshine-orange p-0">
                <Link href={`/blog/${post.slug}`}>
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2">
        <Button variant="outline" disabled>
          Previous
        </Button>
        <Button variant="outline" className="bg-sunshine-yellow text-foreground hover:bg-sunshine-orange">
          1
        </Button>
        <Button variant="outline">2</Button>
        <Button variant="outline">3</Button>
        <Button variant="outline">Next</Button>
      </div>

      {/* Newsletter */}
      <div className="mt-20 bg-sunshine-yellow/10 rounded-lg p-8 md:p-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-muted-foreground mb-6">
            Stay updated with the latest articles, product releases, and exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex h-10 w-full rounded-md border border-sunshine-blue/30 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunshine-yellow focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button className="bg-sunshine-yellow hover:bg-sunshine-orange text-foreground">Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

