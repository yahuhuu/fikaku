import { prisma } from "@/shared/lib/prisma";

export async function getCurrentProfile(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      subscription: { select: { plan: true, status: true } },
    },
  });
}
