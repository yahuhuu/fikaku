"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";
import { updateWallet } from "../services/update-wallet.service";
import { prismaWalletRepository } from "../repositories/prisma-wallet.repository";

export async function updateWalletAction(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  const result = await updateWallet(String(formData.get("id") ?? ""), {
    name: String(formData.get("name") ?? ""),
    balance: String(formData.get("balance") ?? "0"),
    currency: String(formData.get("currency") || "IDR"),
  }, { userId: session.user.id, walletRepository: prismaWalletRepository });
  if (!result.ok) redirect(`/wallets?error=${encodeURIComponent(result.error)}`);
  revalidatePath("/wallets"); revalidatePath("/transactions");
  redirect("/wallets?updated=1");
}
