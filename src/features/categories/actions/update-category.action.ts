"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";
import { updateCategory } from "../services/update-category.service";
import { prismaCategoryRepository } from "../repositories/prisma-category.repository";

export async function updateCategoryAction(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  const result = await updateCategory(String(formData.get("id") ?? ""), {
    name: String(formData.get("name") ?? ""),
    type: formData.get("type") === "INCOME" ? "INCOME" : "EXPENSE",
    color: String(formData.get("color") || "") || undefined,
    icon: String(formData.get("icon") || "") || undefined,
  }, { userId: session.user.id, categoryRepository: prismaCategoryRepository });
  if (!result.ok) redirect(`/categories?error=${encodeURIComponent(result.error)}`);
  revalidatePath("/categories"); revalidatePath("/transactions");
  redirect("/categories?updated=1");
}
