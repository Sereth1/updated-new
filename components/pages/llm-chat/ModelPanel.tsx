"use client";

import { useState } from "react";
import {
  HiChevronDown,
  HiChevronLeft,
  HiChevronRight,
  HiSparkles,
  HiLockClosed,
} from "react-icons/hi";
import { useAuth } from "@/providers/auth-provider";

interface Model {
  name: string;
  description: string;
  contextLength: number;
  status: "stable" | "beta";
  isPro?: boolean;
}

interface Provider {
  id: string;
  name: string;
  description: string;
  models: Model[];
}

interface ModelPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  onModelSelect: (model: { provider: string; model: string }) => void;
  activeModel: { provider: string; model: string };
}

const providers: Provider[] = [
  {
    id: "openai",
    name: "OpenAI",
    description: "Leading AI research lab and creator of GPT models",
    models: [
      {
        name: "gpt-4",
        description: "Most capable model, best for complex tasks",
        contextLength: 8192,
        status: "stable",
        isPro: true,
      },
      {
        name: "gpt-4-turbo",
        description: "Latest GPT-4 with improved performance",
        contextLength: 128000,
        status: "beta",
        isPro: true,
      },
      {
        name: "gpt-3.5",
        description: "Fast and efficient for simpler tasks",
        contextLength: 4096,
        status: "stable",
        isPro: false,
      },
    ],
  },
  {
    id: "anthropic",
    name: "Anthropic",
    description: "Advanced AI research company focused on safety",
    models: [
      {
        name: "claude-3",
        description: "Latest Claude with enhanced capabilities",
        contextLength: 100000,
        status: "beta",
        isPro: true,
      },
      {
        name: "claude-2",
        description: "Balanced performance and reliability",
        contextLength: 100000,
        status: "stable",
        isPro: true,
      },
      {
        name: "claude-1",
        description: "First generation Claude model",
        contextLength: 100000,
        status: "stable",
        isPro: false,
      },
    ],
  },
  {
    id: "mistral",
    name: "Mistral",
    description: "Open-source focused AI company",
    models: [
      {
        name: "mixtral-8x7b",
        description: "Mixture of experts architecture",
        contextLength: 32768,
        status: "stable",
        isPro: true,
      },
      {
        name: "mistral-7b",
        description: "Efficient base model",
        contextLength: 8192,
        status: "stable",
        isPro: false,
      },
    ],
  },
  {
    id: "meta",
    name: "Meta",
    description: "Open-source LLaMA model series",
    models: [
      {
        name: "llama-3",
        description: "Latest generation of LLaMA",
        contextLength: 128000,
        status: "beta",
        isPro: true,
      },
      {
        name: "llama-2-13b",
        description: "Larger model with better reasoning",
        contextLength: 4096,
        status: "stable",
        isPro: true,
      },
      {
        name: "llama-2-7b",
        description: "Efficient and fast base model",
        contextLength: 4096,
        status: "stable",
        isPro: false,
      },
    ],
  },
];

function ModelDropdown({
  provider,
  isOpen,
  onToggle,
  onModelSelect,
  activeModel,
}: {
  provider: Provider;
  isOpen: boolean;
  onToggle: () => void;
  onModelSelect: (model: { provider: string; model: string }) => void;
  activeModel: { provider: string; model: string };
}) {
  const { user } = useAuth();

  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-center justify-between text-white hover:bg-white/5 transition-colors"
      >
        <span className="font-medium">{provider.name}</span>
        <HiChevronDown
          className={`w-5 h-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-4 pb-3 space-y-2">
          <p className="text-sm text-white/60 px-3 py-2">
            {provider.description}
          </p>
          {provider.models.map((model) => (
            <div
              key={model.name}
              className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-white font-medium">{model.name}</h3>
                    {model.status === "beta" && (
                      <span className="px-1.5 py-0.5 text-xs font-medium bg-neon-cyan/10 text-neon-cyan rounded">
                        Beta
                      </span>
                    )}
                    {model.isPro && (
                      <span className="px-1.5 py-0.5 text-xs font-medium bg-amber-500/10 text-amber-500 rounded">
                        Pro
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-white/60 mt-1">
                    {model.description}
                  </p>
                  <p className="text-xs text-white/40 mt-1">
                    Context: {model.contextLength.toLocaleString()} tokens
                  </p>
                </div>
                {model.isPro && !user ? (
                  <div className="ml-4 p-1.5 text-white/40">
                    <HiLockClosed className="w-5 h-5" />
                  </div>
                ) : (
                  <button
                    className={`ml-4 p-1.5 rounded-lg transition-colors ${
                      activeModel.provider === provider.name &&
                      activeModel.model === model.name
                        ? "bg-neon-cyan/20 text-neon-cyan"
                        : "text-white/40 hover:bg-white/10 hover:text-neon-cyan"
                    }`}
                    onClick={() =>
                      onModelSelect({
                        provider: provider.name,
                        model: model.name,
                      })
                    }
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

export function ModelPanel({
  isOpen,
  onToggle,
  onModelSelect,
  activeModel,
}: ModelPanelProps) {
  const [openProvider, setOpenProvider] = useState<string>("OpenAI");
  const { user } = useAuth();

  return (
    <div
      className={`${
        isOpen ? "w-80" : "w-12"
      } transition-all duration-300 relative border-l border-white/10 bg-darkBlue/50 flex flex-col`}
    >
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -left-3 top-1/2 transform -translate-y-1/2 z-10 bg-darkBlue border border-white/10 rounded-full p-1 text-white/60 hover:text-white transition-colors"
      >
        {isOpen ? (
          <HiChevronRight className="w-4 h-4" />
        ) : (
          <HiChevronLeft className="w-4 h-4" />
        )}
      </button>

      {isOpen && (
        <>
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-semibold text-white">
              Choose Your Model 🤖
            </h2>
            <p className="text-white/60 mt-2">
              {user
                ? "Select from our curated collection of top LLMs"
                : "Try our free models or unlock pro features"}
            </p>
          </div>

          {/* Provider Categories */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {providers.map((provider) => (
              <ModelDropdown
                key={provider.id}
                provider={provider}
                isOpen={openProvider === provider.name}
                onToggle={() =>
                  setOpenProvider(
                    openProvider === provider.name ? "" : provider.name
                  )
                }
                onModelSelect={onModelSelect}
                activeModel={activeModel}
              />
            ))}
          </div>
        </>
      )}

      {!isOpen && (
        <div className="flex-1 flex items-center justify-center">
          <HiSparkles className="w-6 h-6 text-white/40" />
        </div>
      )}
    </div>
  );
}
