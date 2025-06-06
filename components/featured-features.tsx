import { StepBackIcon as Steps, Umbrella, Package, Thermometer } from "lucide-react"

export default function FeaturedFeatures() {
  const features = [
    {
      icon: <Steps className="h-10 w-10" />,
      title: "Easy Access Steps",
      description: "Built-in steps make getting in and out of your hammock simple and safe for everyone.",
    },
    {
      icon: <Umbrella className="h-10 w-10" />,
      title: "Shade Cover",
      description: "Integrated shade cover protects you from the sun while you relax outdoors.",
    },
    {
      icon: <Package className="h-10 w-10" />,
      title: "Integrated Storage",
      description: "Multiple storage compartments for blankets, pillows, books, and personal items.",
    },
    {
      icon: <Thermometer className="h-10 w-10" />,
      title: "Built-in Cooler",
      description: "Keep your drinks and snacks cool and within reach with our integrated cooler.",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center p-6 rounded-lg border bg-card hover:shadow-md transition-shadow"
        >
          <div className="p-3 rounded-full bg-sunshine-yellow/20 text-sunshine-orange mb-4">{feature.icon}</div>
          <h3 className="text-xl font-semibold mb-2 font-quicksand">{feature.title}</h3>
          <p className="text-muted-foreground">{feature.description}</p>
        </div>
      ))}
    </div>
  )
}

