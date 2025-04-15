"use client";

import { HiCheck, HiX } from "react-icons/hi";

interface PricingFeature {
  name: string;
  starter: boolean | string | number;
  growth: boolean | string | number;
  scale: boolean | string | number;
}

const features: PricingFeature[] = [
  {
    name: "Number of AI Agents",
    starter: "1",
    growth: "5",
    scale: "Unlimited",
  },
  {
    name: "Crypto Price Access",
    starter: true,
    growth: true,
    scale: true,
  },
  {
    name: "Web Scraping",
    starter: false,
    growth: true,
    scale: true,
  },
  {
    name: "Smart Query Optimization",
    starter: false,
    growth: true,
    scale: true,
  },
  {
    name: "Multi-Agent Collaboration",
    starter: false,
    growth: false,
    scale: true,
  },
  {
    name: "Auto-Adaptive Behavior",
    starter: false,
    growth: false,
    scale: true,
  },
  {
    name: "Agent Scheduling",
    starter: "Manual",
    growth: "Scheduled",
    scale: "Advanced",
  },
  {
    name: "Support Level",
    starter: "Basic",
    growth: "Priority",
    scale: "Dedicated Manager",
  },
];

function FeatureCheck({ value }: { value: boolean | string | number }) {
  if (typeof value === "boolean") {
    return value ? (
      <HiCheck className="w-5 h-5 text-neon-cyan" />
    ) : (
      <HiX className="w-5 h-5 text-slate-500" />
    );
  }
  return <span className="text-sm text-slate-300">{value}</span>;
}

export function PricingSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Pricing that grows with you
          </h2>
          <p className="text-slate-300 text-lg max-w-3xl mx-auto">
            Choose an affordable plan that&apos;s packed with the best features
            for engaging your audience, creating customer loyalty, and driving
            sales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Starter Plan */}
          <div className="relative bg-darkBlue/50 rounded-2xl border border-white/10 p-8 hover:scale-[1.02] transition-transform duration-300">
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-2">Starter</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">$10</span>
                <span className="text-slate-400">/month</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {features.map((feature) => (
                <li key={feature.name} className="flex items-center gap-3">
                  <FeatureCheck value={feature.starter} />
                  <span className="text-slate-300">{feature.name}</span>
                </li>
              ))}
            </ul>

            <button className="w-full py-3 px-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors duration-200">
              Subscribe to Starter
            </button>
          </div>

          {/* Growth Plan */}
          <div className="relative bg-darkBlue rounded-2xl border-2 border-neon-cyan/30 p-8 hover:scale-[1.02] transition-transform duration-300 shadow-[0_0_30px_rgba(0,240,255,0.15)]">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-neon-cyan/20 text-neon-cyan text-sm font-medium px-4 py-1 rounded-full border border-neon-cyan/30">
              Recommended
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-neon-cyan mb-2">
                Growth
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">$30</span>
                <span className="text-slate-400">/month</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {features.map((feature) => (
                <li key={feature.name} className="flex items-center gap-3">
                  <FeatureCheck value={feature.growth} />
                  <span className="text-slate-300">{feature.name}</span>
                </li>
              ))}
            </ul>

            <button className="w-full py-3 px-6 rounded-xl bg-neon-cyan text-darkBlue font-medium hover:bg-neon-cyan/90 transition-colors duration-200">
              Subscribe to Growth
            </button>
          </div>

          {/* Scale Plan */}
          <div className="relative bg-darkBlue/50 rounded-2xl border border-white/10 p-8 hover:scale-[1.02] transition-transform duration-300">
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-2">Scale</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">$70</span>
                <span className="text-slate-400">/month</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {features.map((feature) => (
                <li key={feature.name} className="flex items-center gap-3">
                  <FeatureCheck value={feature.scale} />
                  <span className="text-slate-300">{feature.name}</span>
                </li>
              ))}
            </ul>

            <button className="w-full py-3 px-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors duration-200">
              Subscribe to Scale
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
