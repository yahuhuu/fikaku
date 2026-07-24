"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";
import { createWallet } from "../services/create-wallet.service";
import { prismaWalletRepository } from "../repositories/prisma-wallet.repository";

export async function createWalletAction(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const result = await createWallet(
    {
      name: String(formData.get("name") ?? ""),
      balance: String(formData.get("balance") ?? "0"),
      currency: String(formData.get("currency") || "IDR"),
    },
    {
      userId: session.user.id,
      walletRepository: prismaWalletRepository,
    },
  );

  if (!result.ok) {
    redirect(`/wallets?error=${encodeURIComponent(result.error)}`);
  }

  revalidatePath("/wallets");
  revalidatePath("/transactions");
  redirect("/wallets?created=1");
}
