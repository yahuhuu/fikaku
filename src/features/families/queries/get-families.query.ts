import { prismaFamilyRepository } from "../repositories/prisma-family.repository";

export async function getFamilies(userId: string) {
  return prismaFamilyRepository.listForUser(userId);
}
