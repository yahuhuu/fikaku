"use server";

import { redirect } from "next/navigation";
import { registerUser } from "../services/register-user.service";
import { hashPassword } from "../services/password.service";
import { prismaUserRepository } from "../repositories/prisma-user.repository";

export async function registerAction(formData: FormData) {
  const result = await registerUser(
    {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    },
    {
      userRepository: prismaUserRepository,
      hashPassword,
    },
  );

  if (!result.ok) {
    redirect(`/register?error=${encodeURIComponent(result.error)}`);
  }

  redirect("/login?registered=1");
}
