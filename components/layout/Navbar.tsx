"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/context";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

function AuthLinks() {
  const { user, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || loading) {
    return null;
  }

  return user ? (
    <Link
      href="/dashboard"
      className="text-white/60 hover:text-white transition-colors"
    >
      Dashboard
    </Link>
  ) : (
    <Link
      href="/auth"
      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Sign In
    </Link>
  );
}

function MobileAuthLinks() {
  const { user, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || loading) {
    return null;
  }

  return user ? (
    <Link
      href="/dashboard"
      className="block text-white/60 hover:text-white transition-colors"
    >
      Dashboard
    </Link>
  ) : (
    <Link
      href="/auth"
      className="block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Sign In
    </Link>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-darkBlue/80 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-white font-bold text-xl">
            AGiOS
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/agents"
              className="text-white/60 hover:text-white transition-colors"
            >
              Agents
            </Link>
            <Link
              href="/about"
              className="text-white/60 hover:text-white transition-colors"
            >
              About
            </Link>
            <AuthLinks />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              href="/agents"
              className="block text-white/60 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Agents
            </Link>
            <Link
              href="/about"
              className="block text-white/60 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <MobileAuthLinks />
          </div>
        )}
      </div>
    </nav>
  );
}
