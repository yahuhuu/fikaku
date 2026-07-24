import { describe, expect, it } from "vitest";
import { createCategory } from "./create-category.service";
import type { CategoryRepository } from "../repositories/category.repository";

function createRepository(): CategoryRepository {
  return {
    async create(data) {
      return {
        id: "cat_new",
        userId: data.userId,
        name: data.name,
        type: data.type,
        color: data.color ?? null,
        icon: data.icon ?? null,
      };
    },
    async listByUser() {
      return [];
    },
    async deleteByUser() {
      return true;
    },
  };
}

describe("createCategory", () => {
  it("creates a category for the current user", async () => {
    const result = await createCategory(
      {
        name: "Groceries",
        type: "EXPENSE",
        color: "#10b981",
        icon: "shopping-cart",
      },
      {
        userId: "user_1",
        categoryRepository: createRepository(),
      },
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.userId).toBe("user_1");
    expect(result.data.name).toBe("Groceries");
    expect(result.data.type).toBe("EXPENSE");
  });

  it("rejects an empty category name", async () => {
    const result = await createCategory(
      {
        name: "",
        type: "EXPENSE",
      },
      {
        userId: "user_1",
        categoryRepository: createRepository(),
      },
    );

    expect(result.ok).toBe(false);
  });
});
