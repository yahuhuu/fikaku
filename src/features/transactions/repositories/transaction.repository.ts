export type TransactionType = "INCOME" | "EXPENSE";

export type TransactionListItem = {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  description: string | null;
  date: Date;
  categoryId: string | null;
  walletId: string | null;
  categoryName: string | null;
  walletName: string | null;
};

export type CreateTransactionData = {
  userId: string;
  type: TransactionType;
  amount: number;
  description?: string;
  date: Date;
  categoryId?: string;
  walletId?: string;
};

export type ListTransactionsFilters = {
  userId: string;
  month?: string;
  type?: TransactionType;
};

export type TransactionRepository = {
  create(data: CreateTransactionData): Promise<TransactionListItem>;
  listByUser(filters: ListTransactionsFilters): Promise<TransactionListItem[]>;
  deleteByUser(id: string, userId: string): Promise<boolean>;
};
