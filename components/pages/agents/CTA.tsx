"use client";

import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";

export function CTA() {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-content", {
        scrollTrigger: {
          trigger: ".cta-content",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, ctaRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ctaRef} className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="cta-content bg-gradient-to-r from-electric/20 to-neon-pink/20 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Integrate AI Agents into Your Workflow?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            From automation to real-time intelligence, our agents do the heavy
            lifting.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-gradient-to-r from-neon-cyan to-neon-pink text-white font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
          >
            Book a Demo
          </Link>
        </div>
      </div>
    </div>
  );
}
