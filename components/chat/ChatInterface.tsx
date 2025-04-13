/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Model, models } from "@/lib/models";
import { useAuth } from "@/providers/auth-provider";
import { useEffect, useRef, useState } from "react";

interface ChatInterfaceProps {
  initialMessages?: Message[];
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatHistory {
  id: string;
  title: string;
  preview: string;
  timestamp: string;
}

const chatHistory: ChatHistory[] = [
  {
    id: "1",
    title: "Previous Chat 1",
    preview: "This is a preview of the chat...",
    timestamp: "2 hours ago",
  },
  // Add more chat history items as needed
];

export default function ChatInterface({
  initialMessages = [],
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState<Model>(models[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          provider: selectedModel.provider,
          modelId: selectedModel.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: data.response,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("model", selectedModel.id);
    if (user?.id) formData.append("userId", user.id);

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: `Uploaded file: ${file.name}`,
    };

    setMessages((prev) => [...prev, newMessage]);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: data.response,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content:
          "I apologize, but I encountered an error processing your file. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-[#061331]">
      {/* Chat History Sidebar */}
      <div className="w-80 border-r border-gray-800 bg-gray-900/20 p-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-200">
          Chat History
        </h2>
        <div className="space-y-4">
          {chatHistory.map((chat) => (
            <div
              key={chat.id}
              className="p-3 rounded-lg hover:bg-gray-800/30 cursor-pointer transition-colors"
            >
              <h3 className="font-medium text-gray-200">{chat.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{chat.preview}</p>
              <span className="text-xs text-gray-500 mt-2 block">
                {chat.timestamp}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-4xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${
                  message.role === "assistant"
                    ? "bg-gray-800/30"
                    : "bg-gray-700/30"
                } rounded-lg p-4`}
              >
                <div className="flex items-start">
                  <div className="flex-1">
                    <div className="text-sm text-gray-400 mb-1">
                      {message.role === "assistant" ? "AI" : "You"}
                    </div>
                    <div className="text-gray-200">{message.content}</div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-200"></div>
              </div>
            )}
            {error && (
              <div className="text-red-400 bg-red-900/20 p-4 rounded-lg mb-4">
                {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-800 p-4">
          <div className="max-w-4xl mx-auto">
            <form
              onSubmit={handleSubmit}
              className="flex items-center space-x-4"
            >
              <select
                value={selectedModel.id}
                onChange={(e) => {
                  const model = models.find((m) => m.id === e.target.value);
                  if (model) setSelectedModel(model);
                }}
                className="w-40 bg-gray-800/30 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
              <div className="flex-1">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full bg-gray-800/30 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="button"
                onClick={() => handleFileUpload}
                className="p-2 text-gray-400 hover:text-gray-200 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="p-2 text-gray-400 hover:text-gray-200 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
