import { betterAuth } from "better-auth";
import { pool } from "../db";
import { AuthConfig, User, Session } from "./types";

if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
  throw new Error(
    "GitHub OAuth credentials are missing. Please add GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET to your .env.local file"
  );
}

const defaultConfig: AuthConfig = {
  github: {
    clientId: process.env.GITHUB_CLIENT_ID || "",
    clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "your-secret-key",
    expiresIn: "30d",
  },
  autoSignIn: true,
  maxAge: 30 * 24 * 60 * 60, // 30 days
  updateAge: 24 * 60 * 60, // 24 hours
  trustedOrigins: ["http://localhost:3000"],
};

export const auth = betterAuth({
  database: pool,
  emailAndPassword: {
    enabled: true,
    autoSignIn: defaultConfig.autoSignIn,
  },
  trustedOrigins: defaultConfig.trustedOrigins,
  session: {
    maxAge: defaultConfig.maxAge,
    updateAge: defaultConfig.updateAge,
  },
  callbacks: {
    async session({ session, user }: { session: Session; user: User }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    async signUp({
      user,
      account,
    }: {
      user: User;
      account: {
        provider: string;
        last_name?: string;
        user_name?: string;
        address?: string;
        birth_date?: string;
      };
    }) {
      if (account?.provider === "email") {
        await pool.query(
          `UPDATE users SET 
            last_name = $1,
            user_name = $2,
            address = $3,
            birth_date = $4
          WHERE id = $5`,
          [
            account.last_name,
            account.user_name,
            account.address,
            account.birth_date,
            user.id,
          ]
        );
      }
      return true;
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
});
