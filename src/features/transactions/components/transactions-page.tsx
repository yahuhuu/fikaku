import { getCategories } from "@/features/categories/queries/get-categories.query";
import { getWallets } from "@/features/wallets/queries/get-wallets.query";
import { getFamilies } from "@/features/families/queries/get-families.query";
import { TransactionForm } from "./transaction-form";
import { TransactionsTable } from "./transactions-table";
import { getTransactions } from "../queries/get-transactions.query";
import type { TransactionType } from "../repositories/transaction.repository";

type TransactionsPageProps = {
  userId: string;
  searchParams?: {
    month?: string;
    type?: string;
    created?: string;
    deleted?: string;
    error?: string;
    updated?: string;
  };
};

function normalizeType(type?: string): TransactionType | undefined {
  if (type === "INCOME" || type === "EXPENSE") return type;
  return undefined;
}

export async function TransactionsPage({ userId, searchParams }: TransactionsPageProps) {
  const selectedMonth = searchParams?.month ?? new Date().toISOString().slice(0, 7);
  const selectedType = normalizeType(searchParams?.type);

  const [transactions, categories, wallets, families] = await Promise.all([
    getTransactions({ userId, month: selectedMonth, type: selectedType }),
    getCategories(userId),
    getWallets(userId),
    getFamilies(userId),
  ]);

  return (
    <main className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#000000]">Transactions</h1>
          <p className="mt-2 text-[#94a3b8]">Tambah, hapus, dan filter transaksi milik user yang sedang login.</p>
        </div>
      </div>

      {searchParams?.created ? <p className="rounded-xl bg-[#e5fbff] px-4 py-3 text-sm font-medium text-[#53b6e0]">Transaksi berhasil ditambahkan.</p> : null}
      {searchParams?.updated ? <p className="rounded-xl bg-[#e5fbff] px-4 py-3 text-sm font-medium text-[#53b6e0]">Transaksi berhasil diperbarui.</p> : null}
      {searchParams?.deleted ? <p className="rounded-xl bg-[#e5fbff] px-4 py-3 text-sm font-medium text-[#53b6e0]">Transaksi berhasil dihapus.</p> : null}
      {searchParams?.error ? <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{searchParams.error}</p> : null}

      <TransactionForm categories={categories} families={families} wallets={wallets} />

      <form className="flex flex-wrap gap-3 rounded-2xl border border-[#e5e5e5] bg-white p-4 shadow-sm">
        <input className="rounded-xl border border-[#e5e5e5] px-4 py-3 text-[#000000]" defaultValue={selectedMonth} name="month" type="month" />
        <select className="rounded-xl border border-[#e5e5e5] px-4 py-3 text-[#000000]" defaultValue={selectedType ?? ""} name="type">
          <option value="">Semua tipe</option>
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
        </select>
        <button className="rounded-xl bg-[#111033] px-4 py-3 font-semibold text-white" type="submit">Filter</button>
      </form>

      <TransactionsTable categories={categories} families={families} transactions={transactions} wallets={wallets} />
    </main>
  );
}
