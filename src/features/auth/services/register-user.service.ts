import { registerSchema, type RegisterInput } from "../schemas/auth.schema";
import type { AuthUser, UserRepository } from "../repositories/user.repository";

type RegisterUserDependencies = {
  userRepository: UserRepository;
  hashPassword(password: string): Promise<string>;
};

type RegisterUserResult =
  | { ok: true; data: AuthUser }
  | { ok: false; error: string };

export async function registerUser(
  input: RegisterInput,
  dependencies: RegisterUserDependencies,
): Promise<RegisterUserResult> {
  const parsed = registerSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const normalizedEmail = parsed.data.email.toLowerCase();
  const existingUser = await dependencies.userRepository.findByEmail(normalizedEmail);

  if (existingUser) {
    return { ok: false, error: "Email already registered" };
  }

  const passwordHash = await dependencies.hashPassword(parsed.data.password);
  const user = await dependencies.userRepository.create({
    name: parsed.data.name,
    email: normalizedEmail,
    passwordHash,
  });

  return { ok: true, data: user };
}
