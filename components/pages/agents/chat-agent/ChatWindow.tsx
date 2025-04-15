"use client";

import { useState } from "react";
import { HiPaperAirplane } from "react-icons/hi2";
import { TypingAnimation } from "./TypingAnimation";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

const mockMessages: Message[] = [
  {
    id: "1",
    content: "Can you analyze this website for me?",
    isUser: true,
    timestamp: "2:30 PM",
  },
  {
    id: "2",
    content:
      "I'll help you analyze the website. Please provide the URL you'd like me to examine.",
    isUser: false,
    timestamp: "2:30 PM",
  },
  {
    id: "3",
    content: "https://example.com",
    isUser: true,
    timestamp: "2:31 PM",
  },
];

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm analyzing the website now. Give me a moment to gather the information...",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col bg-darkBlue/50">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.isUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                message.isUser
                  ? "bg-neon-cyan/10 text-white"
                  : "bg-white/5 text-white"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <span className="text-xs text-white/40 mt-1 block">
                {message.timestamp}
              </span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg p-4 bg-white/5">
              <TypingAnimation />
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
        <div className="flex space-x-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-white/5 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50"
          />
          <button
            type="submit"
            className="bg-neon-cyan/10 hover:bg-neon-cyan/20 text-neon-cyan p-2 rounded-lg transition-colors"
          >
            <HiPaperAirplane className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
