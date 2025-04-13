import { auth } from "@/lib/auth";

async function main() {
  try {
    console.log("Running Better Auth migrations...");
    await auth.migrate();
    console.log("✅ Migrations completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

main();
