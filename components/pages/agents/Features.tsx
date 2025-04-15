"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

const features = [
  {
    icon: "🤖",
    title: "Automated Support Agents",
    description:
      "Handle customer service interactions, provide contextual replies, and escalate only when needed — 24/7 and tireless.",
  },
  {
    icon: "🌐",
    title: "Multilingual Translation Agents",
    description:
      "Automatically translate content, conversations, or documents into multiple languages with cultural accuracy using real-time language models.",
  },
  {
    icon: "🧠",
    title: "Memory-Enhanced Agents",
    description:
      "With persistent memory, these agents learn over time, remember user preferences, and offer increasingly personalized assistance.",
  },
  {
    icon: "📅",
    title: "Smart Calendar & Task Agents",
    description:
      "Book, schedule, reschedule, or even suggest optimal times based on priorities and user behavior.",
  },
  {
    icon: "🔐",
    title: "Security & Compliance Agents",
    description:
      "Monitor logs, detect suspicious patterns, enforce compliance rules, and alert you in real-time — AI that protects.",
  },
  {
    icon: "📥",
    title: "Inbox & Email Management Agents",
    description:
      "Automatically triage emails, suggest replies, extract action items, and sync with CRMs and task managers.",
  },
  {
    icon: "🎯",
    title: "Goal-Oriented Multi-Agent Systems",
    description:
      "Agent collectives that collaborate to achieve high-level goals using planning, memory, and tool usage.",
  },
  {
    icon: "🔄",
    title: "Workflow Automation Agents",
    description:
      "From Zapier-style automations to fully custom process chains — these agents run background tasks and execute actions in sequence.",
  },
  {
    icon: "🧪",
    title: "Data Analysis & Insight Agents",
    description:
      "Feed them raw data and get dashboards, summaries, correlations, and predictions — powered by advanced LLM inference.",
  },
  {
    icon: "📚",
    title: "Knowledge Base Builders",
    description:
      "Automatically extract, organize, and update a company's internal documentation, FAQs, and wikis — always up to date.",
  },
  {
    icon: "🔍",
    title: "Smart Search Optimization",
    description:
      "Agents that structure, enrich, and reroute queries to provide significantly better search results than standard AI prompts.",
  },
  {
    icon: "📊",
    title: "Data Pipeline Assistants",
    description:
      "Use agents to build custom workflows like parsing CSVs, transforming databases, or updating analytics dashboards.",
  },
];

export function Features() {
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, featuresRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={featuresRef} className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-neon-cyan transition-colors"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
