"use client";

import { HeaderWithDotPattern } from "@/components/headers/HeaderWithDotPattern";
import { SmartSearchAgent } from "@/components/pages/agents/SmartSearchAgent";
import { CryptoPriceTracker } from "@/components/pages/agents/CryptoPriceTracker";
import { MultiAgentResearchSystem } from "@/components/pages/agents/MultiAgentResearchSystem";
import { Intro } from "@/components/pages/agents/Intro";
import { Features } from "@/components/pages/agents/Features";

export default function AgentsAboutPage() {
  return (
    <div className="min-h-screen bg-darkBlue">
      <HeaderWithDotPattern
        title="AI Agent Use Cases"
        description="Explore how our AI agents can automate and enhance your workflows"
      />
      <Intro />
      <Features />
      <div className="container mx-auto px-4 py-12 space-y-12">
        <SmartSearchAgent />

        <CryptoPriceTracker />
        <MultiAgentResearchSystem />
      </div>
    </div>
  );
}
