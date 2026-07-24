import { createTransactionAction } from "../actions/create-transaction.action";

type Option = {
  id: string;
  name: string;
  type?: "INCOME" | "EXPENSE";
};

type TransactionFormProps = {
  categories: Option[];
  wallets: Option[];
};

export function TransactionForm({ categories, wallets }: TransactionFormProps) {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <form action={createTransactionAction} className="grid gap-4 rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-sm lg:grid-cols-6">
      <div className="lg:col-span-1">
        <label className="text-sm font-medium text-[#000000]" htmlFor="type">Tipe</label>
        <select className="mt-2 w-full rounded-xl border border-[#e5e5e5] px-4 py-3 text-[#000000]" id="type" name="type" defaultValue="EXPENSE">
          <option value="EXPENSE">Expense</option>
          <option value="INCOME">Income</option>
        </select>
      </div>
      <div className="lg:col-span-1">
        <label className="text-sm font-medium text-[#000000]" htmlFor="amount">Amount</label>
        <input className="mt-2 w-full rounded-xl border border-[#e5e5e5] px-4 py-3 text-[#000000]" id="amount" min="1" name="amount" placeholder="125000" required type="number" />
      </div>
      <div className="lg:col-span-1">
        <label className="text-sm font-medium text-[#000000]" htmlFor="date">Tanggal</label>
        <input className="mt-2 w-full rounded-xl border border-[#e5e5e5] px-4 py-3 text-[#000000]" defaultValue={today} id="date" name="date" required type="date" />
      </div>
      <div className="lg:col-span-1">
        <label className="text-sm font-medium text-[#000000]" htmlFor="categoryId">Kategori</label>
        <select className="mt-2 w-full rounded-xl border border-[#e5e5e5] px-4 py-3 text-[#000000]" id="categoryId" name="categoryId">
          <option value="">Tanpa kategori</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name} {category.type ? `(${category.type.toLowerCase()})` : ""}</option>
          ))}
        </select>
      </div>
      <div className="lg:col-span-1">
        <label className="text-sm font-medium text-[#000000]" htmlFor="walletId">Wallet</label>
        <select className="mt-2 w-full rounded-xl border border-[#e5e5e5] px-4 py-3 text-[#000000]" id="walletId" name="walletId">
          <option value="">Tanpa wallet</option>
          {wallets.map((wallet) => (
            <option key={wallet.id} value={wallet.id}>{wallet.name}</option>
          ))}
        </select>
      </div>
      <div className="lg:col-span-1">
        <label className="text-sm font-medium text-[#000000]" htmlFor="description">Deskripsi</label>
        <input className="mt-2 w-full rounded-xl border border-[#e5e5e5] px-4 py-3 text-[#000000]" id="description" name="description" placeholder="Catatan" />
      </div>
      <button className="rounded-xl bg-[#53b6e0] px-4 py-3 font-semibold text-white hover:bg-[#3aa6d4] lg:col-span-6" type="submit">Tambah transaksi</button>
    </form>
  );
}
