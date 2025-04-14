"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { authClient } from "./client";
import type { User, Session } from "./types";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: Error | null;
  signIn: (data: { email: string; password: string }) => Promise<void>;
  signUp: (data: {
    email: string;
    password: string;
    name: string;
  }) => Promise<void>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Check for existing session on mount
    const checkSession = async () => {
      try {
        const currentSession = await authClient.getSession();
        if (currentSession) {
          setSession(currentSession);
          setUser(currentSession.user);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to check session")
        );
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const signIn = async (data: { email: string; password: string }) => {
    try {
      setLoading(true);
      const result = await authClient.signIn(data);
      setSession(result.session);
      setUser(result.session.user);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Sign in failed"));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (data: {
    email: string;
    password: string;
    name: string;
  }) => {
    try {
      setLoading(true);
      const result = await authClient.signUp(data);
      setSession(result.session);
      setUser(result.session.user);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Sign up failed"));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await authClient.signOut();
      setSession(null);
      setUser(null);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Sign out failed"));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const refreshSession = async () => {
    try {
      setLoading(true);
      const currentSession = await authClient.getSession();
      if (currentSession) {
        setSession(currentSession);
        setUser(currentSession.user);
      }
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to refresh session")
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    session,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
