import { describe, expect, it } from "vitest";
import { updateUserAdminControls } from "./update-user-admin-controls.service";
import type { AdminUserRepository } from "../repositories/admin-user.repository";

function createRepository(): AdminUserRepository {
  return {
    async updateControls(data) {
      return {
        id: data.userId,
        role: data.role,
        subscription: {
          plan: data.plan,
          status: data.status,
        },
      };
    },
  };
}

describe("updateUserAdminControls", () => {
  it("updates role, plan, and subscription status", async () => {
    const result = await updateUserAdminControls(
      { userId: "user_1", role: "ADMIN", plan: "PRO", status: "ACTIVE" },
      { adminUserRepository: createRepository() },
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data).toEqual({
      id: "user_1",
      role: "ADMIN",
      subscription: { plan: "PRO", status: "ACTIVE" },
    });
  });

  it("rejects invalid role", async () => {
    const result = await updateUserAdminControls(
      { userId: "user_1", role: "OWNER", plan: "PRO", status: "ACTIVE" },
      { adminUserRepository: createRepository() },
    );

    expect(result.ok).toBe(false);
  });
});
