import {
  IconSearch,
  IconBuildingSkyscraper,
  IconMap2,
  IconChartBar,
} from "@tabler/icons-react";

export function Hero() {
  const features = [
    {
      icon: IconBuildingSkyscraper,
      title: "Property Analysis",
      description:
        "Market cap rate calculations, tenant layout analysis, and price per square foot metrics",
    },
    {
      icon: IconMap2,
      title: "Location Intelligence",
      description:
        "Traffic data integration, infrastructure project tracking, and location optimization",
    },
    {
      icon: IconChartBar,
      title: "Market Analysis",
      description:
        "Coverage of 45 Atlanta submarkets with detailed vacancy and growth trends",
    },
  ];

  return (
    <section className="min-h-screen pt-20 relative bg-gradient-to-b from-reva-50 to-white dark:from-neutral-900 dark:to-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Content */}
        <div className="text-center space-y-8 mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-reva-800 dark:text-reva-100">
            Real Estate Virtual Assistant
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-300">
            AI-powered analysis for smarter property investments
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-card">
              <IconSearch className="w-6 h-6 text-neutral-400 ml-4" />
              <input
                type="text"
                placeholder="Search properties, markets, or analysis tools..."
                className="w-full px-4 py-4 text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 bg-transparent focus:outline-none"
              />
              <button className="px-8 py-4 bg-reva-500 text-white font-semibold hover:bg-reva-600 transition-colors">
                Analyze
              </button>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="glass-card p-8 hover:bg-white/90 dark:hover:bg-neutral-800/90 transition-all duration-300"
            >
              <feature.icon className="w-12 h-12 text-reva-500 dark:text-reva-400 mb-4" />
              <h3 className="text-xl font-semibold text-reva-800 dark:text-reva-100 mb-3">
                {feature.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
