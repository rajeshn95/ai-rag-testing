import { db } from "@/lib/db";
import { resources } from "@/lib/db/schema/resources";
import { embeddings as embeddingsTable } from "@/lib/db/schema/embeddings";
import { generateEmbeddings } from "@/lib/ai/embedding";

async function main() {
  const content = "The user's name is Rajesh. He likes Node.js and RAG.";
  const [resource] = await db.insert(resources).values({ content }).returning();
  const embs = await generateEmbeddings(content);
  console.log("Generated", embs.length, "chunks. First length:", embs[0]?.embedding.length);
  const inserted = await db
    .insert(embeddingsTable)
    .values(embs.map(e => ({ resourceId: resource.id, ...e })))
    .returning();
  console.log("Inserted rows:", inserted.length);
}

main().then(() => process.exit(0)).catch(err => { console.error(err); process.exit(1); });


