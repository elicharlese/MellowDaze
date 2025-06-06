import { Check } from "lucide-react"

export default function ProductFeatures({ productType }) {
  // Different features based on product type
  const features = {
    hammock: [
      {
        title: "Easy Access Steps",
        description:
          "Our built-in step system makes getting in and out of your hammock safe and easy for everyone, regardless of age or mobility.",
      },
      {
        title: "Integrated Shade Cover",
        description:
          "The adjustable shade cover protects you from the sun while allowing for airflow, so you can enjoy your hammock in any weather.",
      },
      {
        title: "Storage Solutions",
        description:
          "Multiple storage compartments keep your essentials within reach, including dedicated spaces for blankets, pillows, books, and personal items.",
      },
      {
        title: "Built-in Cooler",
        description:
          "Keep your drinks and snacks cool for hours with our integrated insulated cooler compartment, eliminating the need for a separate cooler.",
      },
    ],
    accessory: [
      {
        title: "Weather Resistant",
        description:
          "All our accessories are made with weather-resistant materials to withstand outdoor conditions and complement your hammock.",
      },
      {
        title: "Easy Installation",
        description:
          "Our accessories are designed for simple installation with your existing hammock setup, with no special tools required.",
      },
      {
        title: "Matching Design",
        description:
          "Each accessory is designed to perfectly match our hammock aesthetics while adding functionality and convenience.",
      },
    ],
  }

  // Determine which feature set to use
  const featureSet = productType?.toLowerCase().includes("hammock") ? features.hammock : features.accessory

  return (
    <div className="mt-16 md:mt-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Key Features</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Our products are designed with comfort, convenience, and quality in mind.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {featureSet.map((feature, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Check className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

