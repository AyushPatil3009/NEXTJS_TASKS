"use server";

import { revalidateTag } from "next/cache";
import { messages } from "../data/message";

export async function addMessage(formData: FormData) {
  const name = formData.get("name")?.toString();
  const message = formData.get("message")?.toString();

  if (!name || !message) return;

  messages.push({
    id: messages.length + 1,
    name,
    message,
  });

  revalidateTag("messages", "max");
}

// ❌ won't visibly refresh that array in the way a real cached/tagged data source would.

// We can practice the mutation part by adding a message to the array, but it won't properly demonstrate revalidateTag() because an in-memory array isn't Next.js's cache.