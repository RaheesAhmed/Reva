"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 10,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 10);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      if (difference < 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          {/* Logo and Title */}
          <div className="mb-12 animate-fade-in">
            <div className="flex items-center justify-center gap-4 mb-4">
              <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200">
                REVA
              </h1>
              <div className="w-12 h-12">
                <img src="/reva-icon.svg" alt="REVA Icon" className="w-full h-full" />
              </div>
            </div>
            <p className="text-xl text-blue-200">Real Estate Virtual Assistant</p>
          </div>

          {/* Coming Soon Section */}
          <div className="w-full max-w-4xl mx-auto bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold mb-6 flex items-center justify-center gap-2">
              <span className="text-yellow-400">🚧</span>
              Under Construction
              <span className="text-yellow-400">🚧</span>
            </h2>
            
            {/* Countdown Timer */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="bg-white/10 rounded-lg p-4 backdrop-blur">
                  <div className="text-4xl font-bold text-blue-400">{value}</div>
                  <div className="text-sm text-gray-300 capitalize">{unit}</div>
                </div>
              ))}
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-all">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <span className="text-red-400">🎯</span> Market Analysis
                </h3>
                <p className="text-gray-300">Comprehensive insights for 45+ Atlanta submarkets</p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-all">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <span className="text-green-400">📊</span> Property Metrics
                </h3>
                <p className="text-gray-300">Advanced cap rate and valuation tools</p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-all">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <span className="text-blue-400">🌍</span> Location Intel
                </h3>
                <p className="text-gray-300">Traffic data and infrastructure tracking</p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-all">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <span className="text-yellow-400">💰</span> Financial Tools
                </h3>
                <p className="text-gray-300">Investment analysis and monitoring</p>
              </div>
            </div>

            

            
          </div>

         
        </div>
      </div>
    </main>
  );
}
