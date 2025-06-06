import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/40"
          style={{
            backgroundImage: `url('/placeholder.svg?height=800&width=1600')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>

      <div className="relative container mx-auto px-4 py-24 md:py-32 lg:py-40">
        <div className="max-w-xl">
          <div className="mb-4 flex items-center">
            <div className="mr-3 h-10 w-10 rounded-full bg-sunshine-yellow flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-foreground"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2" />
                <path d="M12 21v2" />
                <path d="M4.22 4.22l1.42 1.42" />
                <path d="M18.36 18.36l1.42 1.42" />
                <path d="M1 12h2" />
                <path d="M21 12h2" />
                <path d="M4.22 19.78l1.42-1.42" />
                <path d="M18.36 5.64l1.42-1.42" />
              </svg>
            </div>
            <span className="font-medium text-sunshine-orange">Sunshine Comfort</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Redefining <span className="sunshine-text-gradient">Outdoor Relaxation</span>
          </h1>

          <p className="text-lg md:text-xl mb-8">
            Our premium hammocks combine comfort, accessibility, and convenience. With built-in steps, shade covers,
            storage, and more.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-sunshine-yellow hover:bg-sunshine-orange text-foreground" asChild>
              <a href="/products">Shop Hammocks</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-sunshine-blue text-sunshine-blue hover:bg-sunshine-blue/10"
              asChild
            >
              <a href="/products?category=accessories">Shop Accessories</a>
            </Button>
          </div>
        </div>

        {/* Sun decoration */}
        <div className="absolute top-12 right-12 hidden lg:block">
          <div className="h-32 w-32 rounded-full bg-sunshine-yellow opacity-80 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

