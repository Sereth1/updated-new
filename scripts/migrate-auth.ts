import { auth } from "@/lib/auth/server";

async function main() {
  try {
    console.log("Running Better Auth migrations...");
    await auth.handler(new Request("http://localhost/api/auth/migrate"));
    console.log("✅ Migrations completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

main();
