import Link from "next/link"
import { Facebook, Instagram, Twitter, Sun } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold font-heading flex items-center">
              <Sun className="h-6 w-6 mr-2 text-sunshine-yellow" />
              <span className="sunshine-text-gradient">MellowDaze</span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Redefining outdoor relaxation with premium hammocks and accessories.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-sunshine-blue hover:text-sunshine-orange">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-sunshine-blue hover:text-sunshine-orange">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-sunshine-blue hover:text-sunshine-orange">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 font-heading">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/hammocks" className="text-muted-foreground hover:text-sunshine-orange">
                  Hammocks
                </Link>
              </li>
              <li>
                <Link href="/accessories" className="text-muted-foreground hover:text-sunshine-orange">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/shade-covers" className="text-muted-foreground hover:text-sunshine-orange">
                  Shade Covers
                </Link>
              </li>
              <li>
                <Link href="/storage-solutions" className="text-muted-foreground hover:text-sunshine-orange">
                  Storage Solutions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 font-heading">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-sunshine-orange">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-sunshine-orange">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-sunshine-orange">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-sunshine-orange">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 font-heading">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-sunshine-orange">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-muted-foreground hover:text-sunshine-orange">
                  Warranty
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-sunshine-orange">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-sunshine-orange">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sunshine-yellow/20 mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MellowDaze. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

