'use server';

import {
  NewResourceParams,
  insertResourceSchema,
  resources,
} from '@/lib/db/schema/resources';
import { db } from '../db';
import { generateEmbeddings } from '../ai/embedding';
import { embeddings as embeddingsTable } from '../db/schema/embeddings';

export const createResource = async (input: NewResourceParams) => {
  try {
    const { content } = insertResourceSchema.parse(input);

    const [resource] = await db
      .insert(resources)
      .values({ content })
      .returning();

    const embeddings = await generateEmbeddings(content);
    const inserted = await db
      .insert(embeddingsTable)
      .values(
        embeddings.map(embedding => ({
          resourceId: resource.id,
          ...embedding,
        })),
      )
      .returning();
    console.log("Inserted embeddings rows", inserted.length);

    return 'Resource successfully created and embedded.';
  } catch (error) {
    console.error("Failed to create resource or insert embeddings", error);
    return error instanceof Error && error.message.length > 0
      ? error.message
      : 'Error, please try again.';
  }
};