import { categorySchema, type CategoryInput } from "../schemas/category.schema";
import type { CategoryListItem, CategoryRepository } from "../repositories/category.repository";

type Dependencies = { userId: string; categoryRepository: CategoryRepository };
type Result = { ok: true; data: CategoryListItem } | { ok: false; error: string };

export async function updateCategory(id: string, input: CategoryInput, dependencies: Dependencies): Promise<Result> {
  if (!id) return { ok: false, error: "Category id is required" };
  const parsed = categorySchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid category" };
  const category = await dependencies.categoryRepository.updateByUser(id, dependencies.userId, parsed.data);
  if (!category) return { ok: false, error: "Category not found" };
  return { ok: true, data: category };
}
