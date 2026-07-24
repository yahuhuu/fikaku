export type AuthUser = {
  id: string;
  name: string | null;
  email: string;
  passwordHash: string;
  role: "USER" | "ADMIN";
};

export type CreateUserData = {
  name: string;
  email: string;
  passwordHash: string;
};

export type UserRepository = {
  findByEmail(email: string): Promise<AuthUser | null>;
  create(data: CreateUserData): Promise<AuthUser>;
};
