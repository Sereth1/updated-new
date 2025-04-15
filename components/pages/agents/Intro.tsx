"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

export function Intro() {
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".intro-content", {
        scrollTrigger: {
          trigger: ".intro-content",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, introRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={introRef} className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="intro-content bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            What is an LLM Agent?
          </h2>
          <p className="text-lg text-white/80 leading-relaxed">
            An LLM Agent is a smart, autonomous system powered by large language
            models that can plan, decide, and act to achieve goals based on user
            input or real-time data. These agents combine the power of AI with
            specialized tools and APIs to perform complex tasks, analyze
            information, and provide intelligent responses in real-time.
          </p>
        </div>
      </div>
    </div>
  );
}
