"use server";

import { revalidatePath } from "next/cache";
import { products } from "../data/product";

export async function addProduct(formData: FormData) {
  const title = formData.get("title")?.toString();
  const price = Number(formData.get("price"));

  if (!title || !price) {
    return;
  }

  products.push({
    id: products.length + 1,
    title,
    price,
  });

  revalidatePath("/products");
}