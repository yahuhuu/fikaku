"use server";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";
import { prismaProfileRepository } from "../repositories/prisma-profile.repository";
import { changePassword } from "../services/change-password.service";

export async function changePasswordAction(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const result = await changePassword(
    {
      currentPassword: String(formData.get("currentPassword") ?? ""),
      newPassword: String(formData.get("newPassword") ?? ""),
    },
    { userId: session.user.id, profileRepository: prismaProfileRepository },
  );

  if (result.ok === false) redirect(`/settings?passwordError=${encodeURIComponent(result.error)}`);
  redirect("/settings?passwordUpdated=1");
}
