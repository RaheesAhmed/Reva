import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/ui/header";
import { Features } from "@/components/sections/features";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-neutral-900">
      <Header />

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-4 py-32 mt-16">
        <div className="flex items-baseline justify-center mb-6">
          <span className="text-6xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-reva-400 via-reva-500 to-reva-600 tracking-tight">
            reva
          </span>
          <span className="text-6xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/70">
            .
          </span>
          <span className="text-6xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-reva-400 via-reva-500 to-reva-600">
            ai
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold text-center text-white mb-6 max-w-3xl">
          Your AI-Powered Real Estate Analysis Assistant
        </h1>
        <p className="text-lg text-neutral-400 text-center max-w-2xl mb-8">
          Get instant insights on property valuation, market trends, and
          investment opportunities with our advanced AI technology.
        </p>
        <Link href="/chat">
          <Button className="relative overflow-hidden group bg-neutral-800 hover:bg-neutral-800/80 px-6 py-2 rounded-full h-11">
            <span className="relative flex items-center gap-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-reva-400 via-reva-500 to-reva-600 font-medium">
                Start Analyzing
              </span>
              <ArrowRight className="h-4 w-4 text-reva-400" />
            </span>
          </Button>
        </Link>
      </div>

      {/* Features Section */}
      <Features />

      {/* Footer */}
      <footer className="w-full border-t border-neutral-800 py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-baseline">
            <span className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-reva-400 via-reva-500 to-reva-600 tracking-tight">
              reva
            </span>
            <span className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/70">
              .
            </span>
            <span className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-reva-400 via-reva-500 to-reva-600">
              ai
            </span>
          </div>
          <p className="text-neutral-400 text-sm">
            © 2024 Reva.ai. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
