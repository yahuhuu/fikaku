import { describe, expect, it } from "vitest";
import { changePassword } from "./change-password.service";
import type { ProfileRepository } from "../repositories/profile.repository";
import { hashPassword } from "../../auth/services/password.service";

async function createRepository(currentPassword: string): Promise<ProfileRepository> {
  let storedHash = await hashPassword(currentPassword);

  return {
    async findPasswordHashByUserId(userId) {
      return userId === "user_1" ? storedHash : null;
    },
    async updateUser(data) {
      return { id: data.userId, name: data.name, email: data.email };
    },
    async updatePassword(_userId, passwordHash) {
      storedHash = passwordHash;
      return true;
    },
  };
}

describe("changePassword", () => {
  it("changes password when current password is correct", async () => {
    const repository = await createRepository("old-password");

    const result = await changePassword(
      { currentPassword: "old-password", newPassword: "new-password-123" },
      { userId: "user_1", profileRepository: repository },
    );

    expect(result.ok).toBe(true);
  });

  it("rejects wrong current password", async () => {
    const repository = await createRepository("old-password");

    const result = await changePassword(
      { currentPassword: "wrong-password", newPassword: "new-password-123" },
      { userId: "user_1", profileRepository: repository },
    );

    expect(result).toEqual({ ok: false, error: "Current password is incorrect" });
  });
});
