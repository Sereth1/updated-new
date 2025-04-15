"use client";

import { useState } from "react";
import { ChatSidebar } from "@/components/pages/llm-chat/ChatSidebar";
import { ChatWindow } from "@/components/pages/llm-chat/ChatWindow";
import { ModelPanel } from "@/components/pages/llm-chat/ModelPanel";

export default function LLMChatPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModelPanelOpen, setIsModelPanelOpen] = useState(true);
  const [activeModel, setActiveModel] = useState({
    provider: "OpenAI",
    model: "gpt-4",
  });

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-darkBlue">
      {/* Left Side - Chat History & Active Chat */}
      <div className="flex flex-1">
        <ChatSidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <ChatWindow activeModel={activeModel} />
      </div>

      {/* Right Side - Model Selection Panel */}
      <ModelPanel
        isOpen={isModelPanelOpen}
        onToggle={() => setIsModelPanelOpen(!isModelPanelOpen)}
        onModelSelect={setActiveModel}
        activeModel={activeModel}
      />
    </div>
  );
}
