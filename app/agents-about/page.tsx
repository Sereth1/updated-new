"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "@/components/pages/agents/Header";
import { Intro } from "@/components/pages/agents/Intro";
import { Features } from "@/components/pages/agents/Features";
import { CTA } from "@/components/pages/agents/CTA";

gsap.registerPlugin(ScrollTrigger);

export default function AgentsAboutPage() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".animate-in", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen bg-darkBlue">
      <Header />
      <Intro />
      <Features />
      <CTA />
    </div>
  );
}
