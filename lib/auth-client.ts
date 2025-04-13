import { createAuthClient } from "better-auth/react";

const config = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
};

export const { signIn, signUp, signOut, useSession, getSession } =
  createAuthClient(config);
