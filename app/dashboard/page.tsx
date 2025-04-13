"use client";

import { useAuth } from "@/providers/auth-provider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";

export default function DashboardPage() {
  const { user, session, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.replace("/auth");
    }
  }, [loading, session, router]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/auth");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-midnight">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-neon-cyan border-t-transparent"></div>
          <p className="mt-4 text-sm text-slate">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-midnight to-deep p-8">
      <div className="mx-auto max-w-4xl">
        <div className="relative rounded-2xl bg-white/5 p-8 backdrop-blur-lg">
          <div className="absolute inset-x-0 -top-px mx-auto h-px w-3/4 bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />

          <div className="flex items-center justify-between">
            <h1 className="bg-gradient-to-r from-neon-cyan via-electric to-neon-pink bg-clip-text text-4xl font-bold text-transparent">
              Welcome, {user.name}!
            </h1>
            <button
              onClick={handleSignOut}
              className="group relative overflow-hidden rounded-lg bg-sunset/10 px-4 py-2 text-sunset transition-all hover:bg-sunset/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sunset/10 to-transparent translate-x-[-100%] group-hover:animate-shimmer" />
              Sign Out
            </button>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-white/5 p-6 ring-1 ring-white/10">
              <h2 className="text-xl font-semibold text-neon-cyan">
                Profile Info
              </h2>
              <div className="mt-4 space-y-2 text-ice">
                <p>Email: {user.email}</p>
                {user.metadata?.username && (
                  <p>Username: {user.metadata.username}</p>
                )}
                {user.metadata?.address && (
                  <p>Address: {user.metadata.address}</p>
                )}
                {user.metadata?.birthDate && (
                  <p>Birth Date: {user.metadata.birthDate}</p>
                )}
              </div>
            </div>

            <div className="rounded-lg bg-white/5 p-6 ring-1 ring-white/10">
              <h2 className="text-xl font-semibold text-neon-pink">
                Account Status
              </h2>
              <div className="mt-4 space-y-2 text-ice">
                <p>Provider: {session.provider}</p>
                <p>
                  Last Login: {new Date(session.lastLogin).toLocaleString()}
                </p>
                <p>
                  Session Expires:{" "}
                  {new Date(session.expiresAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
