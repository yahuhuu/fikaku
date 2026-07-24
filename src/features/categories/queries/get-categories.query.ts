import { prismaCategoryRepository } from "../repositories/prisma-category.repository";

export async function getCategories(userId: string) {
  return prismaCategoryRepository.listByUser(userId);
}
