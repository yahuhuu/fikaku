import { prisma } from "@/shared/lib/prisma";
import type { AuthUser, CreateUserData, UserRepository } from "./user.repository";

const defaultExpenseCategories = [
  { name: "Food", color: "#10b981", icon: "utensils" },
  { name: "Transport", color: "#3b82f6", icon: "car" },
  { name: "Bills", color: "#f59e0b", icon: "receipt" },
  { name: "Entertainment", color: "#8b5cf6", icon: "gamepad" },
  { name: "Other", color: "#64748b", icon: "circle" },
];

const defaultIncomeCategories = [
  { name: "Salary", color: "#059669", icon: "wallet" },
  { name: "Freelance", color: "#0ea5e9", icon: "briefcase" },
  { name: "Other", color: "#64748b", icon: "circle" },
];

export const prismaUserRepository: UserRepository = {
  async findByEmail(email: string): Promise<AuthUser | null> {
    return prisma.user.findUnique({ where: { email } });
  },

  async create(data: CreateUserData): Promise<AuthUser> {
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash: data.passwordHash,
        subscription: {
          create: {
            plan: "FREE",
            status: "ACTIVE",
          },
        },
        wallets: {
          create: {
            name: "Cash",
            currency: "IDR",
          },
        },
        categories: {
          create: [
            ...defaultIncomeCategories.map((category) => ({ ...category, type: "INCOME" as const })),
            ...defaultExpenseCategories.map((category) => ({ ...category, type: "EXPENSE" as const })),
          ],
        },
      },
    });
  },
};
