import {
  Building2,
  LineChart,
  BarChart3,
  MapPin,
  Banknote,
  TrendingUp,
  FileSearch,
  Briefcase,
} from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Building2,
      title: "Property Valuation",
      description:
        "Get accurate property valuations based on comprehensive market data and AI analysis",
    },
    {
      icon: LineChart,
      title: "Market Trends",
      description:
        "Track and analyze real-time market trends with advanced data visualization",
    },
    {
      icon: Banknote,
      title: "ROI Calculator",
      description:
        "Calculate potential returns on investment with our smart ROI prediction model",
    },
    {
      icon: MapPin,
      title: "Location Analytics",
      description:
        "Access detailed location insights including demographics and growth potential",
    },
    {
      icon: TrendingUp,
      title: "Growth Forecasting",
      description:
        "Predict property value appreciation using machine learning algorithms",
    },
    {
      icon: FileSearch,
      title: "Document Analysis",
      description:
        "Automatically analyze property documents and extract key information",
    },
    {
      icon: BarChart3,
      title: "Comparative Analysis",
      description:
        "Compare multiple properties and markets side by side for better decisions",
    },
    {
      icon: Briefcase,
      title: "Investment Strategy",
      description:
        "Get personalized investment strategies based on your goals and market conditions",
    },
  ];

  return (
    <section id="features" className="py-20 w-full bg-neutral-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Powerful Features for Smart Decisions
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Our AI-powered platform provides comprehensive tools for real estate
            analysis and investment planning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group rounded-xl border border-neutral-800 bg-neutral-800/50 p-6 hover:bg-neutral-800 transition-all duration-200"
            >
              <div className="mb-4">
                <feature.icon className="h-8 w-8 text-reva-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-neutral-400 text-sm">{feature.description}</p>
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-reva-400 to-reva-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
