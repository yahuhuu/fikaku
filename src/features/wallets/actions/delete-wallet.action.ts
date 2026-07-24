"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";
import { prismaWalletRepository } from "../repositories/prisma-wallet.repository";

export async function deleteWalletAction(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const id = String(formData.get("id") ?? "");

  if (id) {
    await prismaWalletRepository.deleteByUser(id, session.user.id);
  }

  revalidatePath("/wallets");
  revalidatePath("/transactions");
}
