"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { saveEvent, deleteEvent } from "@/data/events";

export async function createEventAction(prevState: any, formData: FormData) {
  // 1. Verify admin session
  const cookieStore = await cookies();
  if (cookieStore.get("role")?.value !== "admin") {
    return { error: "Unauthorized. You must be an admin to do this." };
  }

  // 2. Extract data from FormData
  const id = formData.get("id") as string | null;
  const title = formData.get("title") as string;
  const date = formData.get("date") as string;
  const location = formData.get("location") as string;
  const description = formData.get("description") as string;
  const tagsString = formData.get("tags") as string;

  const tags = tagsString
    ? tagsString.split(",").map((tag) => tag.trim()).filter(Boolean)
    : [];

  // 3. Validation
  if (!title || !date || !location || !description) {
    return { error: "All fields are required!" };
  }

  const eventData = {
    ...(id && { id }),
    title,
    date,
    location,
    description,
    tags,
  };

  // 4. Save to Mock Database (Updates existing if ID is present, else creates new)
  await saveEvent(eventData);

  // 5. Revalidate cache and redirect
  revalidatePath("/events");
  redirect("/events");
}

export async function deleteEventAction(id: string | number) {
  const cookieStore = await cookies();
  if (cookieStore.get("role")?.value !== "admin") {
    return { error: "Unauthorized." };
  }

  await deleteEvent(id);
  revalidatePath("/events");
}