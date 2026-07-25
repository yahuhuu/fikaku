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
  familyId: string | null;
  familyName: string | null;
  editedById: string | null;
  editedByName: string | null;
  editedAt: Date | null;
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
  familyId?: string;
};

export type ListTransactionsFilters = {
  userId: string;
  month?: string;
  type?: TransactionType;
  familyId?: string;
};

export type UpdateTransactionData = Omit<CreateTransactionData, "userId"> & { editedById?: string };

export type TransactionRepository = {
  create(data: CreateTransactionData): Promise<TransactionListItem>;
  listByUser(filters: ListTransactionsFilters): Promise<TransactionListItem[]>;
  listByFamily(filters: { familyId: string; month?: string; type?: TransactionType }): Promise<TransactionListItem[]>;
  deleteByUser(id: string, userId: string): Promise<boolean>;
  updateByUser(id: string, userId: string, data: UpdateTransactionData): Promise<TransactionListItem | null>;
  updateByFamilyMember(id: string, familyId: string, data: UpdateTransactionData): Promise<TransactionListItem | null>;
  findById(id: string): Promise<TransactionListItem | null>;
  deleteByFamilyPermission(id: string, familyId: string, userId: string, canDelete: boolean): Promise<boolean>;
};
