"use client";

import { ChatSidebar } from "@/components/pages/agents/chat-agent/ChatSidebar";
import { ChatWindow } from "@/components/pages/agents/chat-agent/ChatWindow";
import { AgentPanel } from "@/components/pages/agents/chat-agent/AgentPanel";

export default function ChatAgentPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] bg-darkBlue">
      {/* Left Side - Chat History & Active Chat */}
      <div className="flex flex-1">
        <ChatSidebar />
        <ChatWindow />
      </div>

      {/* Right Side - Agent Access Panel */}
      <AgentPanel />
    </div>
  );
}
