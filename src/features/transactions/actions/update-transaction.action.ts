"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";
import { updateTransaction } from "../services/update-transaction.service";
import { prismaTransactionRepository } from "../repositories/prisma-transaction.repository";
import { prismaFamilyRepository } from "@/features/families/repositories/prisma-family.repository";

export async function updateTransactionAction(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  const result = await updateTransaction(String(formData.get("id") ?? ""), {
    type: formData.get("type") === "INCOME" ? "INCOME" : "EXPENSE",
    amount: String(formData.get("amount") ?? ""),
    categoryId: String(formData.get("categoryId") || "") || undefined,
    walletId: String(formData.get("walletId") || "") || undefined,
    familyId: String(formData.get("familyId") || "") || undefined,
    description: String(formData.get("description") || "") || undefined,
    date: String(formData.get("date") || new Date().toISOString()),
  }, { userId: session.user.id, transactionRepository: prismaTransactionRepository, familyRepository: prismaFamilyRepository });
  if (result.ok === false) redirect(`/transactions?error=${encodeURIComponent(result.error)}`);
  revalidatePath("/transactions"); revalidatePath("/dashboard"); revalidatePath("/reports");
  redirect("/transactions?updated=1");
}
