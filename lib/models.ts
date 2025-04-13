export interface Model {
  id: string;
  name: string;
  provider: "openai" | "google" | "anthropic" | "ollama";
  description: string;
  maxTokens: number;
}

export const models: Model[] = [
  {
    id: "gpt-4",
    name: "GPT-4",
    provider: "openai",
    description: "Most capable OpenAI model for complex tasks",
    maxTokens: 8192,
  },
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    provider: "openai",
    description: "Fast and efficient OpenAI model",
    maxTokens: 4096,
  },
  {
    id: "gemini-pro",
    name: "Gemini Pro",
    provider: "google",
    description: "Google's advanced language model",
    maxTokens: 32768,
  },
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    provider: "anthropic",
    description: "Anthropic's most capable model",
    maxTokens: 4096,
  },
  {
    id: "llama2",
    name: "Llama 2",
    provider: "ollama",
    description: "Open source large language model by Meta",
    maxTokens: 4096,
  },
  {
    id: "mistral",
    name: "Mistral",
    provider: "ollama",
    description: "Efficient open source language model",
    maxTokens: 8192,
  },
];
