import { signIn, signUp } from "@/lib/auth-client";
import type { Session } from "./types";

type AuthResponse = {
  data: {
    user: { id: string; email: string; name: string };
    token: string;
  };
  error?: { message: string };
};

export const authClient = {
  async signIn(data: { email: string; password: string }) {
    const result = (await signIn.email(data)) as unknown as AuthResponse;
    if (result.error) throw new Error(result.error.message);
    return {
      session: {
        user: result.data.user,
        accessToken: result.data.token,
        refreshToken: "",
      },
    };
  },
  async signUp(data: { email: string; password: string; name: string }) {
    const result = (await signUp.email(data)) as unknown as AuthResponse;
    if (result.error) throw new Error(result.error.message);
    return {
      session: {
        user: result.data.user,
        accessToken: result.data.token,
        refreshToken: "",
      },
    };
  },
  async signOut() {
    // Implement sign out logic
    return Promise.resolve();
  },
  async getSession(): Promise<Session | null> {
    // Implement session retrieval logic
    return Promise.resolve(null);
  },
};
