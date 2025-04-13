"use client";

import { useAuth } from "@/providers/auth-provider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, session, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.replace("/auth");
    }
  }, [loading, session, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
          <p className="mt-4 text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl bg-white/5 p-8 backdrop-blur-lg">
          <h1 className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-4xl font-bold text-transparent">
            Welcome, {user.name}!
          </h1>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-white/5 p-6">
              <h2 className="text-xl font-semibold text-white">Profile Info</h2>
              <div className="mt-4 space-y-2 text-gray-300">
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

            <div className="rounded-lg bg-white/5 p-6">
              <h2 className="text-xl font-semibold text-white">
                Account Status
              </h2>
              <div className="mt-4 space-y-2 text-gray-300">
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
