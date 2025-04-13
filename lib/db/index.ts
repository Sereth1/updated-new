import { Pool } from "pg";
import { neon, neonConfig } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

// Configure neon to use fetch
neonConfig.fetchConnectionCache = true;

// Create a PostgreSQL pool for server-side usage
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Create a Neon client for edge functions
const sql = neon(process.env.DATABASE_URL);

// Test the database connection
export async function testConnection() {
  try {
    const result = await pool.query("SELECT NOW()");
    return {
      success: true,
      timestamp: result.rows[0].now,
      message: "Database connection successful",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

export { pool, sql };
