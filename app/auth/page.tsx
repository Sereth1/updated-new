"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthForm } from "@/components/forms/auth-form";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-4">
      <div className="mb-8 flex w-full max-w-md items-center justify-between">
        <Link
          href="#"
          onClick={() => setMode("login")}
          className={`flex-1 text-center py-2 ${
            mode === "login"
              ? "text-white border-b-2 border-indigo-600"
              : "text-gray-400"
          }`}
        >
          Login
        </Link>
        <Link
          href="#"
          onClick={() => setMode("signup")}
          className={`flex-1 text-center py-2 ${
            mode === "signup"
              ? "text-white border-b-2 border-indigo-600"
              : "text-gray-400"
          }`}
        >
          Sign Up
        </Link>
      </div>

      <AuthForm mode={mode} />
    </div>
  );
}
