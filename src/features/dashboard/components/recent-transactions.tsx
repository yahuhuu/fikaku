import Link from "next/link";
import type { TransactionListItem } from "../../transactions/repositories/transaction.repository";
import { formatCurrency } from "@/shared/utils/format-currency";
import { formatDate } from "@/shared/utils/format-date";

type RecentTransactionsProps = {
  transactions: TransactionListItem[];
};

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <section className="rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-[0_10px_30px_rgba(83,182,224,0.12)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#000000]">Recent transactions</h2>
          <p className="mt-1 text-sm text-[#94a3b8]">5 transaksi terbaru bulan ini.</p>
        </div>
        <Link className="rounded-xl bg-[#111033] px-4 py-2 text-sm font-semibold text-white" href="/transactions">Lihat semua</Link>
      </div>

      {transactions.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-[#e5e5e5] bg-[#e5fbff] p-6 text-center text-[#94a3b8]">
          Belum ada transaksi. Tambahkan pemasukan/pengeluaran pertama kamu.
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {transactions.map((transaction) => (
            <div className="grid gap-3 rounded-2xl border border-[#e5e5e5] bg-white p-4 text-sm md:grid-cols-[1fr_0.8fr_0.8fr_auto] md:items-center" key={transaction.id}>
              <div>
                <p className="font-semibold text-[#000000]">{transaction.description ?? transaction.categoryName ?? "Transaction"}</p>
                <p className="text-[#94a3b8]">{formatDate(transaction.date)}</p>
              </div>
              <p className="text-[#94a3b8]">{transaction.categoryName ?? "Tanpa kategori"}</p>
              <p className="text-[#94a3b8]">{transaction.walletName ?? "Tanpa wallet"}</p>
              <p className={transaction.type === "INCOME" ? "font-bold text-[#53b6e0]" : "font-bold text-rose-600"}>
                {transaction.type === "INCOME" ? "+" : "-"}{formatCurrency(transaction.amount)}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
