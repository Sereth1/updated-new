import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { neon } from "@neondatabase/serverless";
import { PostgresDialect } from "kysely";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

// Initialize Neon connection
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sql = neon(process.env.DATABASE_URL);

// Create a connection pool with better configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Add error handling to the pool
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

// Create Kysely dialect for Neon
const dialect = new PostgresDialect({
  pool,
});

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  database: {
    dialect,
    type: "postgresql",
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET!,
    },
  },
  session: {
    secret: process.env.BETTER_AUTH_SECRET!,
    expiresIn: 30 * 24 * 60 * 60, // 30 days in seconds (within 400 days limit)
    cookie: {
      name: "auth_session",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    },
  },
});
