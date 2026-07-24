import { prisma } from "@/shared/lib/prisma";
import { calculateAdminSummary } from "../services/get-admin-summary.service";

export async function getAdminDashboard() {
  const users = await prisma.user.findMany({
    include: { subscription: true },
    orderBy: { createdAt: "desc" },
  });

  const summary = calculateAdminSummary(
    users.map((user) => ({
      plan: user.subscription?.plan ?? null,
      status: user.subscription?.status ?? null,
    })),
  );

  return { users, summary };
}
