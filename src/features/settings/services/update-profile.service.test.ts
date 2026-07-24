import { describe, expect, it } from "vitest";
import { updateProfile } from "./update-profile.service";
import type { ProfileRepository } from "../repositories/profile.repository";

function createRepository(): ProfileRepository {
  return {
    async findPasswordHashByUserId() {
      return null;
    },
    async updateUser(data) {
      return { id: data.userId, name: data.name, email: data.email };
    },
    async updatePassword() {
      return true;
    },
  };
}

describe("updateProfile", () => {
  it("updates user name and normalized email", async () => {
    const result = await updateProfile(
      { name: "Fiky", email: " FIKY@EXAMPLE.COM " },
      { userId: "user_1", profileRepository: createRepository() },
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.email).toBe("fiky@example.com");
  });

  it("rejects invalid email", async () => {
    const result = await updateProfile(
      { name: "Fiky", email: "invalid" },
      { userId: "user_1", profileRepository: createRepository() },
    );

    expect(result.ok).toBe(false);
  });
});
