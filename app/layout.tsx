import type React from "react"
import { Suspense } from "react"
import { Quicksand, Montserrat } from "next/font/google"
import { ShopifyProvider, CartProvider } from "@shopify/hydrogen-react"
import { ThemeProvider } from "@/components/theme-provider"
import { WishlistProvider } from "@/contexts/wishlist-context"
import { AuthProvider } from "@/contexts/auth-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import "./globals.css"

// Load fonts
const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quicksand",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})

export const metadata = {
  title: "MellowDaze Hammocks",
  description: "Premium hammocks with built-in steps, shade covers, storage, and more.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${quicksand.variable} ${montserrat.variable}`}>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ShopifyProvider
            storeDomain="mock.myshopify.com"
            storefrontToken="mock-token"
            storefrontApiVersion="2023-10"
            countryIsoCode="US"
            languageIsoCode="EN"
          >
            <AuthProvider>
              <CartProvider>
                <WishlistProvider>
                  <div className="flex min-h-screen flex-col">
                    <Header />
                    <main className="flex-1">
                      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
                    </main>
                    <Footer />
                  </div>
                </WishlistProvider>
              </CartProvider>
            </AuthProvider>
          </ShopifyProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

