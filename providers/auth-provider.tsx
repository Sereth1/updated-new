/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useContext } from "react";
import { useSession, signIn, signUp, signOut } from "@/lib/auth-client";

interface AuthContextType {
  user: any;
  session: any;
  loading: boolean;
  error: Error | null;
  signIn: typeof signIn;
  signUp: typeof signUp;
  signOut: typeof signOut;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending: loading, error } = useSession();

  const value = {
    user: session?.user ?? null,
    session: session ?? null,
    loading,
    error: error ? new Error(error.message) : null,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
