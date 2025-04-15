"use client";

import { DotPatternWithGlowEffectDemo } from "@/components/patterns/DotPatternWithGlowEffectDemo";

interface HeaderWithDotPatternProps {
  title: string;
  description: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  patternClassName?: string;
}

export function HeaderWithDotPattern({
  title,
  description,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  patternClassName = "",
}: HeaderWithDotPatternProps) {
  return (
    <div
      className={`relative w-full bg-darkBlue text-white py-20 px-4 flex justify-center ${className}`}
    >
      <div className="relative rounded-2xl overflow-hidden w-full max-w-5xl bg-gradient-to-br from-darkBlue">
        {/* Dot Pattern in rounded background */}
        <div className={`relative inset-0 z-0 opacity-80 ${patternClassName}`}>
          <DotPatternWithGlowEffectDemo />
        </div>

        {/* Content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 py-24 text-center">
          <h1
            className={`relative text-4xl md:text-5xl font-bold mb-6 text-neon-cyan drop-shadow-md ${titleClassName}`}
          >
            <span className="relative z-10">{title}</span>
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 blur-3xl opacity-80 bg-[radial-gradient(circle_at_center,var(--neon-pink)_0%,transparent_70%)]"
            />
          </h1>

          <p
            className={`text-lg md:text-xl text-[var(--slate)] max-w-2xl ${descriptionClassName}`}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
