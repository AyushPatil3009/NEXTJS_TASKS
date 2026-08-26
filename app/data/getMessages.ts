import { messages } from "./message";

export async function getMessages() {
  // Simulate database/API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return messages;
}

// For a real Next.js cached fetch, tagging normally happens on the cached data-fetching operation. Since this is a fake in-memory database, we'll demonstrate the tag invalidation flow with a cacheable function instead of pretending the array itself is a real persistent database.
// A cleaner practice is to use Next.js's "use cache" model, but that adds another caching concept. For your current level, let's keep this exercise focused on what revalidateTag() actually does.