import {
  IconTrendingUp,
  IconBuildingStore,
  IconUsers,
  IconChartLine,
} from "@tabler/icons-react";

export function MarketAnalysis() {
  const marketStats = [
    {
      icon: IconTrendingUp,
      title: "Market Coverage",
      value: "45+",
      description: "Atlanta Submarkets",
      trend: "+5 new markets this quarter",
    },
    {
      icon: IconBuildingStore,
      title: "Properties Analyzed",
      value: "2,500+",
      description: "Commercial Properties",
      trend: "+15% from last month",
    },
    {
      icon: IconUsers,
      title: "Active Users",
      value: "500+",
      description: "Real Estate Professionals",
      trend: "Growing community",
    },
    {
      icon: IconChartLine,
      title: "Market Insights",
      value: "98%",
      description: "Accuracy Rate",
      trend: "Based on historical data",
    },
  ];

  return (
    <section className="py-24 bg-reva-50/50 dark:bg-neutral-900/50 backdrop-blur-sm">
      <div className="content-wrapper">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-reva-800 dark:text-reva-100 mb-4">
            Market Analysis & Insights
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-300">
            Comprehensive coverage of Atlanta's real estate market
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {marketStats.map((stat, index) => (
            <div
              key={stat.title}
              className="stat-card text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <stat.icon className="w-10 h-10 mx-auto mb-4 text-reva-400" />
              <h3 className="text-2xl font-bold text-reva-800 dark:text-reva-100 mb-2">
                {stat.value}
              </h3>
              <p className="text-lg font-medium text-neutral-600 dark:text-neutral-300 mb-1">
                {stat.title}
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                {stat.description}
              </p>
              <p className="text-xs text-reva-500 dark:text-reva-400">
                {stat.trend}
              </p>
            </div>
          ))}
        </div>

        {/* Market Features */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="glass-card p-8">
            <h3 className="text-2xl font-bold text-reva-800 dark:text-reva-100 mb-4">
              Real-Time Market Data
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <IconChartLine className="w-6 h-6 text-reva-400 mt-1" />
                <div>
                  <h4 className="font-medium text-neutral-700 dark:text-neutral-200">
                    Vacancy Rate Tracking
                  </h4>
                  <p className="text-neutral-500 dark:text-neutral-400">
                    Monitor market vacancy rates and trends
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <IconTrendingUp className="w-6 h-6 text-reva-400 mt-1" />
                <div>
                  <h4 className="font-medium text-neutral-700 dark:text-neutral-200">
                    Rent Growth Analysis
                  </h4>
                  <p className="text-neutral-500 dark:text-neutral-400">
                    Track rent trends and future projections
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="glass-card p-8">
            <h3 className="text-2xl font-bold text-reva-800 dark:text-reva-100 mb-4">
              Location Intelligence
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <IconBuildingStore className="w-6 h-6 text-reva-400 mt-1" />
                <div>
                  <h4 className="font-medium text-neutral-700 dark:text-neutral-200">
                    Infrastructure Projects
                  </h4>
                  <p className="text-neutral-500 dark:text-neutral-400">
                    Monitor DOT projects and development
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <IconUsers className="w-6 h-6 text-reva-400 mt-1" />
                <div>
                  <h4 className="font-medium text-neutral-700 dark:text-neutral-200">
                    Traffic Analysis
                  </h4>
                  <p className="text-neutral-500 dark:text-neutral-400">
                    Real-time traffic data and patterns
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
