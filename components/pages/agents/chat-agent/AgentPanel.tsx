"use client";

import { useState } from "react";
import { HiChevronDown, HiLockClosed, HiSparkles } from "react-icons/hi";
import { useAuth } from "@/providers/auth-provider";

interface Agent {
  id: string;
  title: string;
  description: string;
  category: string;
  isPro: boolean;
  status: "online" | "loading" | "beta";
}

const agents: Agent[] = [
  // Free Agents
  {
    id: "news",
    title: "Find Accurate News",
    description: "Get reliable news from trusted sources",
    category: "Free Tools",
    isPro: false,
    status: "online",
  },
  {
    id: "scraper",
    title: "Basic Scraper",
    description: "Extract data from simple websites",
    category: "Free Tools",
    isPro: false,
    status: "online",
  },
  {
    id: "summarizer",
    title: "Quick Summarizer",
    description: "Summarize any text quickly",
    category: "Free Tools",
    isPro: false,
    status: "online",
  },
  // Scraping Agents
  {
    id: "web-extractor",
    title: "Website Extractor",
    description: "Advanced web data extraction",
    category: "Scraping Agents",
    isPro: true,
    status: "online",
  },
  {
    id: "blog-crawler",
    title: "Blog Crawler",
    description: "Crawl and analyze blog content",
    category: "Scraping Agents",
    isPro: true,
    status: "beta",
  },
  // Crypto Agents
  {
    id: "price-tracker",
    title: "Price Tracker",
    description: "Real-time crypto price tracking",
    category: "Crypto Agents",
    isPro: true,
    status: "online",
  },
  {
    id: "market-news",
    title: "Market News",
    description: "Latest crypto market updates",
    category: "Crypto Agents",
    isPro: true,
    status: "online",
  },
  // Document Agents
  {
    id: "pdf-reader",
    title: "PDF Reader",
    description: "Extract and analyze PDF content",
    category: "Document Agents",
    isPro: true,
    status: "online",
  },
  {
    id: "doc-summarizer",
    title: "Doc Summarizer",
    description: "Summarize documents intelligently",
    category: "Document Agents",
    isPro: true,
    status: "beta",
  },
];

function AgentDropdown({
  category,
  agents,
  isOpen,
  onToggle,
}: {
  category: string;
  agents: Agent[];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const { user } = useAuth();

  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-center justify-between text-white hover:bg-white/5 transition-colors"
      >
        <span className="font-medium">{category}</span>
        <HiChevronDown
          className={`w-5 h-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-4 pb-3 space-y-2">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-white font-medium">{agent.title}</h3>
                    {agent.status === "beta" && (
                      <span className="px-1.5 py-0.5 text-xs font-medium bg-neon-cyan/10 text-neon-cyan rounded">
                        Beta
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-white/60 mt-1">
                    {agent.description}
                  </p>
                </div>
                {agent.isPro && !user ? (
                  <HiLockClosed className="w-5 h-5 text-white/40" />
                ) : (
                  <button
                    className="ml-4 p-1.5 text-neon-cyan hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => {
                      // Handle agent selection
                    }}
                  >
                    <HiSparkles className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function AgentPanel() {
  const [openCategory, setOpenCategory] = useState<string>("Free Tools");
  const categories = Array.from(new Set(agents.map((a) => a.category)));

  return (
    <div className="w-80 border-l border-white/10 bg-darkBlue/50 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <h2 className="text-xl font-semibold text-white">
          Welcome to your Agent Playground 🤖
        </h2>
        <p className="text-white/60 mt-2">
          Use free tools or unlock advanced agent powers!
        </p>
      </div>

      {/* Agent Categories */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {categories.map((category) => (
          <AgentDropdown
            key={category}
            category={category}
            agents={agents.filter((a) => a.category === category)}
            isOpen={openCategory === category}
            onToggle={() =>
              setOpenCategory(openCategory === category ? "" : category)
            }
          />
        ))}
      </div>
    </div>
  );
}
