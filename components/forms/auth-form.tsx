"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/providers/auth-provider";
import gsap from "gsap";
import { signIn, signUp } from "@/lib/auth-client";

interface AuthFormProps {
  mode: "login" | "signup";
}

export function AuthForm({ mode }: AuthFormProps) {
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Animation setup
  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        {
          opacity: 0,
          y: 20,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
        }
      );
    }
  }, [mode]);

  // Animate form elements
  useEffect(() => {
    const elements = formRef.current?.querySelectorAll(
      "input, button, label, .divider, .header"
    );

    if (elements) {
      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.3,
        }
      );
    }
  }, [mode]);

  const handleGithubAuth = async () => {
    try {
      setIsGithubLoading(true);
      setFormError(null);
      await signIn.social({
        provider: "github",
        callbackURL: "/dashboard",
        errorCallbackURL: "/auth?error=github-auth-failed",
      });
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Failed to authenticate with GitHub"
      );
      console.error("GitHub auth error:", error);
    } finally {
      setIsGithubLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEmailLoading(true);
    setFormError(null);

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      if (mode === "login") {
        await signIn.email({
          email,
          password,
          callbackURL: "/dashboard",
          rememberMe: true,
        });
      } else {
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const username = formData.get("username") as string;
        const address = formData.get("address") as string;
        const birthDate = formData.get("birthDate") as string;

        await signUp.email({
          email,
          password,
          name: `${firstName} ${lastName}`,
          callbackURL: "/dashboard",
          metadata: {
            username,
            address,
            birthDate,
          },
        });
      }
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Authentication failed"
      );
      console.error("Email auth error:", error);
    } finally {
      setIsEmailLoading(false);
    }
  };

  return (
    <div
      ref={formRef}
      className="w-full max-w-md space-y-8 rounded-2xl bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] p-8 shadow-xl ring-1 ring-white/10"
    >
      <div className="header space-y-2">
        <h2 className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-3xl font-bold text-transparent">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-sm text-gray-400">
          {mode === "login"
            ? "Sign in to your account"
            : "Sign up with your favorite provider or email"}
        </p>
      </div>

      {formError && (
        <div className="animate-shake rounded-lg bg-red-500/10 p-4 text-sm text-red-500">
          {formError}
        </div>
      )}

      <button
        onClick={handleGithubAuth}
        disabled={isGithubLoading}
        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-white/5 px-4 py-3 text-white transition-all hover:bg-white/10 hover:shadow-lg hover:shadow-white/5"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:animate-shimmer" />
        <svg
          className="h-5 w-5 transition-transform group-hover:scale-110"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
        <span className="font-medium">
          {isGithubLoading ? "Connecting..." : "Continue with GitHub"}
        </span>
      </button>

      <div className="divider relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-[#0A0A0A] px-2 text-gray-500">
            OR CONTINUE WITH EMAIL
          </span>
        </div>
      </div>

      <form onSubmit={handleEmailSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <div className="group">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 transition-all focus:border-indigo-500 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              placeholder="Enter your email"
            />
          </div>

          <div className="group">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 transition-all focus:border-indigo-500 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              placeholder="Enter your password"
            />
          </div>

          {mode === "signup" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-300"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="mt-1 block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 transition-all focus:border-indigo-500 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="mt-1 block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 transition-all focus:border-indigo-500 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-300"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="mt-1 block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 transition-all focus:border-indigo-500 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="johndoe"
                />
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-300"
                >
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  className="mt-1 block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 transition-all focus:border-indigo-500 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="123 Main St"
                />
              </div>

              <div>
                <label
                  htmlFor="birthDate"
                  className="block text-sm font-medium text-gray-300"
                >
                  Birth Date
                </label>
                <input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  required
                  className="mt-1 block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 transition-all focus:border-indigo-500 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </>
          )}
        </div>

        <button
          type="submit"
          disabled={isEmailLoading}
          className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-indigo-500 px-4 py-3 text-white transition-all hover:bg-indigo-600"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:animate-shimmer" />
          <span className="font-medium">
            {isEmailLoading
              ? "Processing..."
              : mode === "login"
              ? "Sign In"
              : "Create Account"}
          </span>
        </button>
      </form>
    </div>
  );
}
