"use client";

import { cn } from "@/lib/utils";
import { DotPattern } from "../magicui/dot-pattern";

export function DotPatternWithGlowEffectDemo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
      <DotPattern
        glow={false}
        width={14}
        height={14}
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
        )}
      />
    </div>
  );
}
