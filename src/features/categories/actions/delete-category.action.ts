"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";
import { prismaCategoryRepository } from "../repositories/prisma-category.repository";

export async function deleteCategoryAction(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const id = String(formData.get("id") ?? "");

  if (id) {
    await prismaCategoryRepository.deleteByUser(id, session.user.id);
  }

  revalidatePath("/categories");
  revalidatePath("/transactions");
  revalidatePath("/dashboard");
  revalidatePath("/reports");
  redirect("/categories?deleted=1");
}
