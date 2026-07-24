import { prisma } from "@/shared/lib/prisma";
import type { ProfileRepository } from "./profile.repository";

export const prismaProfileRepository: ProfileRepository = {
  async findPasswordHashByUserId(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { passwordHash: true },
    });
    return user?.passwordHash ?? null;
  },

  async updateUser(data) {
    return prisma.user.update({
      where: { id: data.userId },
      data: { name: data.name, email: data.email },
      select: { id: true, name: true, email: true },
    });
  },
  async updatePassword(userId, passwordHash) {
    await prisma.user.update({ where: { id: userId }, data: { passwordHash } });
    return true;
  },
};
