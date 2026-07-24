export type CategoryType = "INCOME" | "EXPENSE";

export type CategoryListItem = {
  id: string;
  userId: string;
  name: string;
  type: CategoryType;
  color: string | null;
  icon: string | null;
};

export type CreateCategoryData = {
  userId: string;
  name: string;
  type: CategoryType;
  color?: string;
  icon?: string;
};

export type CategoryRepository = {
  create(data: CreateCategoryData): Promise<CategoryListItem>;
  listByUser(userId: string): Promise<CategoryListItem[]>;
  deleteByUser(id: string, userId: string): Promise<boolean>;
};
