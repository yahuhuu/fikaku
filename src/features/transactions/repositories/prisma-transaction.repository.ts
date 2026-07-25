import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/shared/lib/prisma";
import type {
  CreateTransactionData,
  ListTransactionsFilters,
  TransactionListItem,
  TransactionRepository,
} from "./transaction.repository";

type PrismaTransactionWithRelations = {
  id: string;
  userId: string;
  type: "INCOME" | "EXPENSE";
  amount: Prisma.Decimal;
  description: string | null;
  date: Date;
  categoryId: string | null;
  walletId: string | null;
  familyId: string | null;
  editedById: string | null;
  editedAt: Date | null;
  category: { name: string } | null;
  wallet: { name: string } | null;
  family: { name: string } | null;
  editedBy: { name: string | null; email: string } | null;
};

const transactionInclude = {
  category: { select: { name: true } },
  wallet: { select: { name: true } },
  family: { select: { name: true } },
  editedBy: { select: { name: true, email: true } },
};

function toTransactionListItem(transaction: PrismaTransactionWithRelations): TransactionListItem {
  return {
    id: transaction.id,
    userId: transaction.userId,
    type: transaction.type,
    amount: transaction.amount.toNumber(),
    description: transaction.description,
    date: transaction.date,
    categoryId: transaction.categoryId,
    walletId: transaction.walletId,
    familyId: transaction.familyId,
    familyName: transaction.family?.name ?? null,
    editedById: transaction.editedById,
    editedByName: transaction.editedBy?.name ?? transaction.editedBy?.email ?? null,
    editedAt: transaction.editedAt,
    categoryName: transaction.category?.name ?? null,
    walletName: transaction.wallet?.name ?? null,
  };
}

function getMonthRange(month?: string) {
  if (!month) return undefined;

  const [year, monthNumber] = month.split("-").map(Number);

  if (!year || !monthNumber) return undefined;

  const start = new Date(Date.UTC(year, monthNumber - 1, 1));
  const end = new Date(Date.UTC(year, monthNumber, 1));

  return { gte: start, lt: end };
}

export const prismaTransactionRepository: TransactionRepository = {
  async create(data: CreateTransactionData): Promise<TransactionListItem> {
    const transaction = await prisma.transaction.create({
      data: {
        userId: data.userId,
        type: data.type,
        amount: data.amount,
        description: data.description,
        date: data.date,
        categoryId: data.categoryId,
        walletId: data.walletId,
        familyId: data.familyId,
      },
      include: transactionInclude,
    });

    return toTransactionListItem(transaction);
  },

  async listByUser(filters: ListTransactionsFilters): Promise<TransactionListItem[]> {
    const monthRange = getMonthRange(filters.month);
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: filters.userId,
        type: filters.type,
        familyId: filters.familyId,
        date: monthRange,
      },
      include: transactionInclude,
      orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    });

    return transactions.map(toTransactionListItem);
  },

  async listByFamily(filters) {
    const monthRange = getMonthRange(filters.month);
    const transactions = await prisma.transaction.findMany({
      where: {
        familyId: filters.familyId,
        type: filters.type,
        date: monthRange,
      },
      include: transactionInclude,
      orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    });

    return transactions.map(toTransactionListItem);
  },

  async updateByUser(id, userId, data) {
    const existing = await prisma.transaction.findFirst({
      where: { id, userId },
      select: { id: true },
    });

    if (!existing) return null;

    const transaction = await prisma.transaction.update({
      where: { id },
      data: {
        type: data.type,
        amount: data.amount,
        description: data.description,
        date: data.date,
        categoryId: data.categoryId,
        walletId: data.walletId,
        familyId: data.familyId,
        editedById: data.editedById,
        editedAt: data.editedById ? new Date() : undefined,
      },
      include: transactionInclude,
    });

    return toTransactionListItem(transaction);
  },

  async updateByFamilyMember(id, familyId, data) {
    const existing = await prisma.transaction.findFirst({
      where: { id, familyId },
      select: { id: true },
    });

    if (!existing) return null;

    const transaction = await prisma.transaction.update({
      where: { id },
      data: {
        type: data.type,
        amount: data.amount,
        description: data.description,
        date: data.date,
        categoryId: data.categoryId,
        walletId: data.walletId,
        familyId: data.familyId,
        editedById: data.editedById,
        editedAt: data.editedById ? new Date() : undefined,
      },
      include: transactionInclude,
    });

    return toTransactionListItem(transaction);
  },

  async findById(id) {
    const transaction = await prisma.transaction.findUnique({ where: { id }, include: transactionInclude });
    return transaction ? toTransactionListItem(transaction) : null;
  },

  async deleteByUser(id: string, userId: string): Promise<boolean> {
    const result = await prisma.transaction.deleteMany({
      where: { id, userId, familyId: null },
    });

    return result.count > 0;
  },

  async deleteByFamilyPermission(id, familyId, _userId, canDelete) {
    if (!canDelete) return false;
    const result = await prisma.transaction.deleteMany({ where: { id, familyId } });
    return result.count > 0;
  },
};
