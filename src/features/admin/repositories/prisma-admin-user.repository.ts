import { prisma } from "@/shared/lib/prisma";
import type { AdminUserRepository } from "./admin-user.repository";

export const prismaAdminUserRepository: AdminUserRepository = {
  async updateControls(data) {
    const user = await prisma.user.update({
      where: { id: data.userId },
      data: {
        role: data.role,
        subscription: {
          upsert: {
            create: { plan: data.plan, status: data.status },
            update: { plan: data.plan, status: data.status },
          },
        },
      },
      include: { subscription: true },
    });

    return {
      id: user.id,
      role: user.role,
      subscription: {
        plan: user.subscription?.plan ?? data.plan,
        status: user.subscription?.status ?? data.status,
      },
    };
  },
};
