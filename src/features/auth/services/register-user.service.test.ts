import { describe, expect, it } from "vitest";
import { registerUser } from "./register-user.service";
import type { UserRepository } from "../repositories/user.repository";

function createRepository(existingEmail?: string): UserRepository {
  return {
    async findByEmail(email) {
      if (email === existingEmail) {
        return {
          id: "user_existing",
          name: "Existing User",
          email,
          passwordHash: "hashed-password",
          role: "USER",
        };
      }

      return null;
    },
    async create(data) {
      return {
        id: "user_new",
        name: data.name,
        email: data.email,
        passwordHash: data.passwordHash,
        role: "USER",
      };
    },
  };
}

describe("registerUser", () => {
  it("creates a user with normalized email and hashed password", async () => {
    const result = await registerUser(
      {
        name: "Fiky",
        email: " FIKY@EXAMPLE.COM ",
        password: "password123",
      },
      {
        userRepository: createRepository(),
        hashPassword: async (password) => `hashed:${password}`,
      },
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.email).toBe("fiky@example.com");
    expect(result.data.passwordHash).toBe("hashed:password123");
  });

  it("rejects duplicate email", async () => {
    const result = await registerUser(
      {
        name: "Fiky",
        email: "fiky@example.com",
        password: "password123",
      },
      {
        userRepository: createRepository("fiky@example.com"),
        hashPassword: async (password) => `hashed:${password}`,
      },
    );

    expect(result).toEqual({ ok: false, error: "Email already registered" });
  });
});
