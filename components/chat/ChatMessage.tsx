import { useEffect, useRef } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { TypeAnimation } from "react-type-animation";

interface ChatMessageProps {
  content: string;
  role: "user" | "assistant";
  timestamp: string;
  isLatest?: boolean;
}

export const ChatMessage = ({
  content,
  role,
  timestamp,
  isLatest,
}: ChatMessageProps) => {
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageRef.current && isLatest) {
      gsap.from(messageRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, [isLatest]);

  const isUser = role === "user";
  const isAssistant = role === "assistant";

  return (
    <div
      ref={messageRef}
      className={clsx(
        "flex gap-4 px-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {/* Assistant Avatar */}
      {isAssistant && (
        <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}

      {/* Message Bubble */}
      <div
        className={clsx(
          "max-w-2xl rounded-lg px-4 py-3 leading-relaxed whitespace-pre-wrap",
          isUser
            ? "bg-white/20 text-white"
            : "bg-white/10 text-white border border-white/10"
        )}
      >
        {isAssistant && isLatest ? (
          <TypeAnimation
            sequence={[content]}
            wrapper="span"
            speed={50}
            cursor={false}
            className="text-white"
          />
        ) : (
          <span className="text-white">{content}</span>
        )}

        <div className="mt-2 text-xs text-white/60">{timestamp}</div>
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
