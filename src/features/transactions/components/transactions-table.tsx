import { deleteTransactionAction } from "../actions/delete-transaction.action";
import { updateTransactionAction } from "../actions/update-transaction.action";
import type { TransactionListItem } from "../repositories/transaction.repository";
import type { FamilyListItem } from "@/features/families/repositories/family.repository";
import { formatCurrency } from "@/shared/utils/format-currency";
import { formatDate } from "@/shared/utils/format-date";
import { ConfirmSubmitButton } from "@/shared/components/forms/confirm-submit-button";

type Option = {
  id: string;
  name: string;
  type?: "INCOME" | "EXPENSE";
};

type TransactionsTableProps = {
  categories: Option[];
  families: FamilyListItem[];
  transactions: TransactionListItem[];
  wallets: Option[];
};

export function TransactionsTable({ categories, families, transactions, wallets }: TransactionsTableProps) {
  if (transactions.length === 0) {
    return <div className="rounded-2xl border border-dashed border-[#e5e5e5] bg-white p-10 text-center text-[#94a3b8]">Belum ada transaksi. Tambahkan transaksi pertama kamu dari form di atas.</div>;
  }

  return (
    <div className="space-y-3" data-family-count={families.length}>
      {transactions.map((transaction) => (
        <details className="rounded-2xl border border-[#e5e5e5] bg-white p-4 shadow-[0_10px_30px_rgba(83,182,224,0.08)]" key={transaction.id}>
          <summary className="cursor-pointer list-none">
            <div className="grid gap-3 text-sm md:grid-cols-7 md:items-center">
              <span className="text-[#94a3b8]">{formatDate(transaction.date)}</span>
              <span className="font-medium text-[#000000] md:col-span-2">{transaction.description ?? "-"}</span>
              <span className="text-[#94a3b8]">{transaction.familyName ?? "Pribadi"}</span>
              <span className="text-[#94a3b8]">{transaction.walletName ?? "-"}</span>
              <span className={transaction.type === "INCOME" ? "text-[#53b6e0]" : "text-rose-600"}>{transaction.type}</span>
              <span className="font-semibold text-[#000000]">{formatCurrency(transaction.amount)}</span>
            </div>
          </summary>
          <div className="mt-4 border-t border-[#e5e5e5] pt-4">
            <form action={updateTransactionAction} className="grid gap-3 md:grid-cols-7">
              <input name="id" type="hidden" value={transaction.id} />
              <input name="familyId" type="hidden" value={transaction.familyId ?? "personal"} />
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">Tipe</label>
                <select className="mt-1 w-full rounded-xl border border-[#e5e5e5] px-3 py-2 text-[#000000]" defaultValue={transaction.type} name="type">
                  <option value="INCOME">Income</option>
                  <option value="EXPENSE">Expense</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">Amount</label>
                <input className="mt-1 w-full rounded-xl border border-[#e5e5e5] px-3 py-2 text-[#000000]" defaultValue={transaction.amount} min="1" name="amount" type="number" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">Tanggal</label>
                <input className="mt-1 w-full rounded-xl border border-[#e5e5e5] px-3 py-2 text-[#000000]" defaultValue={transaction.date.toISOString().slice(0, 10)} name="date" type="date" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">Kategori</label>
                <select className="mt-1 w-full rounded-xl border border-[#e5e5e5] px-3 py-2 text-[#000000]" defaultValue={transaction.categoryId ?? ""} name="categoryId">
                  <option value="">Tanpa kategori</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name} {category.type ? `(${category.type.toLowerCase()})` : ""}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">Wallet</label>
                <select className="mt-1 w-full rounded-xl border border-[#e5e5e5] px-3 py-2 text-[#000000]" defaultValue={transaction.walletId ?? ""} name="walletId">
                  <option value="">Tanpa wallet</option>
                  {wallets.map((wallet) => (
                    <option key={wallet.id} value={wallet.id}>{wallet.name}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">Deskripsi</label>
                <input className="mt-1 w-full rounded-xl border border-[#e5e5e5] px-3 py-2 text-[#000000]" defaultValue={transaction.description ?? ""} name="description" placeholder="Deskripsi" />
              </div>
              <button className="rounded-xl bg-[#53b6e0] px-4 py-2 font-semibold text-white md:col-span-7" type="submit">Simpan perubahan</button>
            </form>
            {transaction.editedByName ? <p className="mt-3 text-xs text-[#94a3b8]">Terakhir diedit oleh {transaction.editedByName}{transaction.editedAt ? ` · ${formatDate(transaction.editedAt)}` : ""}</p> : null}
            <form action={deleteTransactionAction} className="mt-3">
              <input name="id" type="hidden" value={transaction.id} />
              <ConfirmSubmitButton className="rounded-lg px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 disabled:opacity-60" confirmMessage="Hapus transaksi ini? Data yang sudah dihapus tidak bisa dikembalikan.">Hapus transaksi</ConfirmSubmitButton>
            </form>
          </div>
        </details>
      ))}
    </div>
  );
}
