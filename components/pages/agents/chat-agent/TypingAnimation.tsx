export function TypingAnimation() {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex space-x-1">
        <div
          className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <div
          className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <div
          className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
      </div>
      <div className="text-white/60 text-sm">AI is thinking</div>
    </div>
  );
}
