// app/actions/authActions.ts
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function loginAsAdmin() {
  const cookieStore = await cookies();
  cookieStore.set("role", "admin");
  
  // This tells Next.js to refresh the whole page so the UI updates!
  revalidatePath("/", "layout");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("role");
  
  revalidatePath("/", "layout");
}