import { prisma } from "@/shared/lib/prisma";
import type { CategoryListItem, CategoryRepository, CreateCategoryData } from "./category.repository";

function toCategoryListItem(category: {
  id: string;
  userId: string;
  name: string;
  type: "INCOME" | "EXPENSE";
  color: string | null;
  icon: string | null;
}): CategoryListItem {
  return {
    id: category.id,
    userId: category.userId,
    name: category.name,
    type: category.type,
    color: category.color,
    icon: category.icon,
  };
}

export const prismaCategoryRepository: CategoryRepository = {
  async create(data: CreateCategoryData): Promise<CategoryListItem> {
    const category = await prisma.category.create({ data });
    return toCategoryListItem(category);
  },

  async listByUser(userId: string): Promise<CategoryListItem[]> {
    const categories = await prisma.category.findMany({
      where: { userId },
      orderBy: [{ type: "asc" }, { name: "asc" }],
    });

    return categories.map(toCategoryListItem);
  },

  async updateByUser(id, userId, data) {
    const existing = await prisma.category.findFirst({ where: { id, userId }, select: { id: true } });
    if (!existing) return null;
    const category = await prisma.category.update({
      where: { id },
      data: {
        name: data.name,
        type: data.type,
        color: data.color,
        icon: data.icon,
      },
    });
    return toCategoryListItem(category);
  },

  async deleteByUser(id: string, userId: string): Promise<boolean> {
    const result = await prisma.category.deleteMany({ where: { id, userId } });
    return result.count > 0;
  },
};
