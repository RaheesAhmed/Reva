import Link from "next/link";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";

export function Footer() {
  const navigation = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Market Analysis", href: "#market" },
      { name: "Location Intel", href: "#location" },
      { name: "Financial Tools", href: "#financial" },
    ],
    support: [
      { name: "Documentation", href: "/docs" },
      { name: "API Reference", href: "/api-docs" },
      { name: "Pricing", href: "/pricing" },
      { name: "Contact", href: "/contact" },
    ],
    company: [
      { name: "About", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
    ],
    legal: [
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
      { name: "License", href: "/license" },
    ],
    social: [
      {
        name: "GitHub",
        href: "https://github.com/raheesahmed/reva",
        icon: IconBrandGithub,
      },
      {
        name: "LinkedIn",
        href: "https://linkedin.com",
        icon: IconBrandLinkedin,
      },
      {
        name: "Email",
        href: "mailto:contact@reva.com",
        icon: IconMail,
      },
    ],
  };

  return (
    <footer className="bg-reva-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
      <div className="content-wrapper py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-sans font-bold text-reva-800 dark:text-reva-100">
                REVA
              </span>
            </Link>
            <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-300">
              AI-powered real estate analysis for smarter property investments.
            </p>
            <div className="mt-6 flex space-x-4">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-neutral-500 hover:text-reva-500 dark:text-neutral-400 dark:hover:text-reva-400"
                >
                  <item.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-reva-800 dark:text-reva-100">
              Product
            </h3>
            <ul className="mt-4 space-y-3">
              {navigation.product.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-neutral-600 hover:text-reva-500 dark:text-neutral-300 dark:hover:text-reva-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-reva-800 dark:text-reva-100">
              Support
            </h3>
            <ul className="mt-4 space-y-3">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-neutral-600 hover:text-reva-500 dark:text-neutral-300 dark:hover:text-reva-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-reva-800 dark:text-reva-100">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-neutral-600 hover:text-reva-500 dark:text-neutral-300 dark:hover:text-reva-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-reva-800 dark:text-reva-100">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-neutral-600 hover:text-reva-500 dark:text-neutral-300 dark:hover:text-reva-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
            &copy; {new Date().getFullYear()} REVA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
