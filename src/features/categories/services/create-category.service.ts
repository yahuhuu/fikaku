import { categorySchema, type CategoryInput } from "../schemas/category.schema";
import type { CategoryListItem, CategoryRepository } from "../repositories/category.repository";

type CreateCategoryDependencies = {
  userId: string;
  categoryRepository: CategoryRepository;
};

type CreateCategoryResult =
  | { ok: true; data: CategoryListItem }
  | { ok: false; error: string };

export async function createCategory(
  input: CategoryInput,
  dependencies: CreateCategoryDependencies,
): Promise<CreateCategoryResult> {
  const parsed = categorySchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid category" };
  }

  const category = await dependencies.categoryRepository.create({
    userId: dependencies.userId,
    name: parsed.data.name,
    type: parsed.data.type,
    color: parsed.data.color,
    icon: parsed.data.icon,
  });

  return { ok: true, data: category };
}
