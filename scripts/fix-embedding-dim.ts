import { db } from "@/lib/db";
import { sql } from "drizzle-orm";

async function main() {
  console.log("Dropping index if exists...");
  await db.execute(sql`DROP INDEX IF EXISTS "embeddingIndex";`);
  console.log("Altering column type to vector(3072)...");
  await db.execute(sql`ALTER TABLE "embeddings" ALTER COLUMN "embedding" TYPE vector(3072);`);
  console.log("Recreating index...");
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "embeddingIndex" ON "embeddings" USING hnsw ("embedding" vector_cosine_ops);`);
  console.log("Done.");
}

main().then(() => process.exit(0)).catch(err => { console.error(err); process.exit(1); });


