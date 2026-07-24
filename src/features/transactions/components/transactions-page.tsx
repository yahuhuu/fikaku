import { getCategories } from "@/features/categories/queries/get-categories.query";
import { getWallets } from "@/features/wallets/queries/get-wallets.query";
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
    error?: string;
  };
};

function normalizeType(type?: string): TransactionType | undefined {
  if (type === "INCOME" || type === "EXPENSE") return type;
  return undefined;
}

export async function TransactionsPage({ userId, searchParams }: TransactionsPageProps) {
  const selectedMonth = searchParams?.month ?? new Date().toISOString().slice(0, 7);
  const selectedType = normalizeType(searchParams?.type);

  const [transactions, categories, wallets] = await Promise.all([
    getTransactions({ userId, month: selectedMonth, type: selectedType }),
    getCategories(userId),
    getWallets(userId),
  ]);

  return (
    <main className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">Transactions</h1>
          <p className="mt-2 text-slate-600">Tambah, hapus, dan filter transaksi milik user yang sedang login.</p>
        </div>
      </div>

      {searchParams?.created ? <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">Transaksi berhasil ditambahkan.</p> : null}
      {searchParams?.error ? <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{searchParams.error}</p> : null}

      <TransactionForm categories={categories} wallets={wallets} />

      <form className="flex flex-wrap gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <input className="rounded-xl border border-slate-200 px-4 py-3 text-slate-900" defaultValue={selectedMonth} name="month" type="month" />
        <select className="rounded-xl border border-slate-200 px-4 py-3 text-slate-900" defaultValue={selectedType ?? ""} name="type">
          <option value="">Semua tipe</option>
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
        </select>
        <button className="rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white" type="submit">Filter</button>
      </form>

      <TransactionsTable transactions={transactions} />
    </main>
  );
}
