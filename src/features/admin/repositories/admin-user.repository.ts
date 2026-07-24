export type AdminUserControls = {
  id: string;
  role: "USER" | "ADMIN";
  subscription: {
    plan: "FREE" | "PRO" | "BUSINESS";
    status: "ACTIVE" | "CANCELED" | "EXPIRED";
  };
};

export type AdminUserRepository = {
  updateControls(data: {
    userId: string;
    role: "USER" | "ADMIN";
    plan: "FREE" | "PRO" | "BUSINESS";
    status: "ACTIVE" | "CANCELED" | "EXPIRED";
  }): Promise<AdminUserControls>;
};
