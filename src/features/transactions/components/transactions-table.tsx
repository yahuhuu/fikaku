import { deleteTransactionAction } from "../actions/delete-transaction.action";
import type { TransactionListItem } from "../repositories/transaction.repository";
import { formatCurrency } from "@/shared/utils/format-currency";
import { formatDate } from "@/shared/utils/format-date";

type TransactionsTableProps = {
  transactions: TransactionListItem[];
};

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  if (transactions.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
        Belum ada transaksi. Tambahkan transaksi pertama kamu dari form di atas.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="p-4">Tanggal</th>
            <th>Deskripsi</th>
            <th>Kategori</th>
            <th>Wallet</th>
            <th>Tipe</th>
            <th>Amount</th>
            <th className="pr-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr className="border-t border-slate-100" key={transaction.id}>
              <td className="p-4 text-slate-600">{formatDate(transaction.date)}</td>
              <td className="font-medium text-slate-900">{transaction.description ?? "-"}</td>
              <td className="text-slate-600">{transaction.categoryName ?? "-"}</td>
              <td className="text-slate-600">{transaction.walletName ?? "-"}</td>
              <td>
                <span className={transaction.type === "INCOME" ? "text-emerald-600" : "text-rose-600"}>{transaction.type}</span>
              </td>
              <td className="font-semibold text-slate-900">{formatCurrency(transaction.amount)}</td>
              <td className="pr-4 text-right">
                <form action={deleteTransactionAction}>
                  <input name="id" type="hidden" value={transaction.id} />
                  <button className="rounded-lg px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50" type="submit">Hapus</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
