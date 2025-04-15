"use client";

import { useState } from "react";
import { HiClock, HiChat, HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface ChatSession {
  id: string;
  title: string;
  preview: string;
  timestamp: string;
  model: string;
  isActive: boolean;
}

interface ChatSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const mockSessions: ChatSession[] = [
  {
    id: "1",
    title: "Creative Writing Ideas",
    preview: "Exploring fiction and poetry concepts...",
    timestamp: "2h ago",
    model: "GPT-4",
    isActive: true,
  },
  {
    id: "2",
    title: "Code Review",
    preview: "Analyzing React component structure...",
    timestamp: "5h ago",
    model: "Claude-3",
    isActive: false,
  },
  {
    id: "3",
    title: "Research Summary",
    preview: "Summarizing latest AI developments...",
    timestamp: "1d ago",
    model: "GPT-4",
    isActive: false,
  },
];

export function ChatSidebar({ isOpen, onToggle }: ChatSidebarProps) {
  const [sessions, setSessions] = useState<ChatSession[]>(mockSessions);

  return (
    <div
      className={`${
        isOpen ? "w-80" : "w-12"
      } transition-all duration-300 relative flex flex-col border-r border-white/10`}
    >
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-1/2 transform -translate-y-1/2 z-10 bg-darkBlue border border-white/10 rounded-full p-1 text-white/60 hover:text-white transition-colors"
      >
        {isOpen ? (
          <HiChevronLeft className="w-4 h-4" />
        ) : (
          <HiChevronRight className="w-4 h-4" />
        )}
      </button>

      {isOpen && (
        <>
          {/* Header */}
          <div className="p-4 border-b border-white/10">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <HiChat className="w-5 h-5 mr-2 text-neon-cyan" />
              Chat History
            </h2>
          </div>

          {/* Chat Sessions */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {sessions.map((session) => (
              <button
                key={session.id}
                className={`w-full p-4 text-left border-b border-white/5 hover:bg-white/5 transition-colors ${
                  session.isActive ? "bg-white/10" : ""
                }`}
                onClick={() => {
                  setSessions(
                    sessions.map((s) => ({
                      ...s,
                      isActive: s.id === session.id,
                    }))
                  );
                }}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-white truncate flex-1">
                    {session.title}
                  </h3>
                  <span className="text-xs text-white/40 flex items-center ml-2">
                    <HiClock className="w-3 h-3 mr-1" />
                    {session.timestamp}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-white/60 truncate flex-1">
                    {session.preview}
                  </p>
                  <span className="text-xs text-neon-cyan/60 ml-2">
                    {session.model}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* New Chat Button */}
          <button className="m-4 py-2 px-4 bg-neon-cyan/10 hover:bg-neon-cyan/20 text-neon-cyan rounded-lg transition-colors border border-neon-cyan/20">
            New Chat
          </button>
        </>
      )}

      {!isOpen && (
        <div className="flex-1 flex items-center justify-center">
          <HiChat className="w-6 h-6 text-white/40" />
        </div>
      )}
    </div>
  );
}
