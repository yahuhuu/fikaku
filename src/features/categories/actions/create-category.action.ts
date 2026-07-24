"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";
import { createCategory } from "../services/create-category.service";
import { prismaCategoryRepository } from "../repositories/prisma-category.repository";

export async function createCategoryAction(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const result = await createCategory(
    {
      name: String(formData.get("name") ?? ""),
      type: formData.get("type") === "INCOME" ? "INCOME" : "EXPENSE",
      color: String(formData.get("color") || "") || undefined,
      icon: String(formData.get("icon") || "") || undefined,
    },
    {
      userId: session.user.id,
      categoryRepository: prismaCategoryRepository,
    },
  );

  if (!result.ok) {
    redirect(`/categories?error=${encodeURIComponent(result.error)}`);
  }

  revalidatePath("/categories");
  revalidatePath("/transactions");
  redirect("/categories?created=1");
}
