"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Header() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".header-title", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
      });

      gsap.from(".header-subtitle", {
        y: 50,
        opacity: 0,
        duration: 1.5,
        delay: 0.5,
        ease: "power4.out",
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={headerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-darkBlue"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent [background-size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neon-cyan/20 via-transparent to-transparent [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div className="relative z-10 text-center px-4">
        <h1 className="header-title text-6xl md:text-8xl font-bold text-white mb-6">
          Meet Our Smart Agents
        </h1>
        <p className="header-subtitle text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
          Revolutionizing Automation with AI-Powered Assistants
        </p>
      </div>
    </div>
  );
}
