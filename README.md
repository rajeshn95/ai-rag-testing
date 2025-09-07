# Vercel AI SDK RAG Guide Starter Project

This is the starter project for the Vercel AI SDK [Retrieval-Augmented Generation (RAG) guide](https://sdk.vercel.ai/docs/guides/rag-chatbot).

In this project, you will build a chatbot that will only respond with information that it has within its knowledge base. The chatbot will be able to both store and retrieve information. This project has many interesting use cases from customer support through to building your own second brain!

This project will use the following stack:

- [Next.js](https://nextjs.org) 14 (App Router)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [OpenAI](https://openai.com)
- [Drizzle ORM](https://orm.drizzle.team)
- [Postgres](https://www.postgresql.org/) with [ pgvector ](https://github.com/pgvector/pgvector)
- [shadcn-ui](https://ui.shadcn.com) and [TailwindCSS](https://tailwindcss.com) for styling

-------

1. Create a table in your database to store embeddings
    - Cretae schema
    - Run `pnpm db:push`
2. Add logic to chunk and create embeddings when creating resources
    - Create file and write the function": `lib/ai/embedding.ts`
    - Use the AI SDK to create embeddings. This will require two more dependencies, which you can install by running the following command: `pnpm add ai @ai-sdk/react @ai-sdk/openai`
3. Create an agent
4. Give the agent tools to query / create resources for it’s knowledge base