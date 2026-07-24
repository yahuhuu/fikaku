type AdminSummaryUser = {
  plan: "FREE" | "PRO" | "BUSINESS" | null;
  status: "ACTIVE" | "CANCELED" | "EXPIRED" | null;
};

export type AdminSummary = {
  totalUsers: number;
  activeSubscriptions: number;
  freeUsers: number;
  proUsers: number;
  businessUsers: number;
};

export function calculateAdminSummary(users: AdminSummaryUser[]): AdminSummary {
  return users.reduce<AdminSummary>(
    (summary, user) => {
      summary.totalUsers += 1;
      if (user.status === "ACTIVE") summary.activeSubscriptions += 1;
      if (user.plan === "FREE") summary.freeUsers += 1;
      if (user.plan === "PRO") summary.proUsers += 1;
      if (user.plan === "BUSINESS") summary.businessUsers += 1;
      return summary;
    },
    { totalUsers: 0, activeSubscriptions: 0, freeUsers: 0, proUsers: 0, businessUsers: 0 },
  );
}
