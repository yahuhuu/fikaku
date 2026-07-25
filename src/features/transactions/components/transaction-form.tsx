import type { FamilyListItem } from "@/features/families/repositories/family.repository";
import { createTransactionAction } from "../actions/create-transaction.action";
import { RupiahAmountInput } from "./rupiah-amount-input";

type Option = {
  id: string;
  name: string;
  type?: "INCOME" | "EXPENSE";
};

type TransactionFormProps = {
  categories: Option[];
  wallets: Option[];
  families: FamilyListItem[];
};

function canShowPersonalOption(families: FamilyListItem[]) {
  if (families.length === 0) return false;
  return families.some((family) => family.transactionMode === "ALLOW_PERSONAL");
}

export function TransactionForm({ categories, wallets, families }: TransactionFormProps) {
  const today = new Date().toISOString().slice(0, 10);
  const showFamilySelector = families.length > 0;
  const showPersonalOption = canShowPersonalOption(families);
  const defaultFamilyId = families.length === 1 && families[0]?.transactionMode === "AUTO_FAMILY" ? families[0].id : (showPersonalOption ? "personal" : families[0]?.id);

  return (
    <form action={createTransactionAction} className="grid gap-4 rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-sm lg:grid-cols-6">
      {showFamilySelector ? (
        <div className="lg:col-span-6">
          <label className="text-sm font-medium text-[#000000]" htmlFor="familyId">Simpan sebagai</label>
          <select className="mt-2 w-full rounded-xl border border-[#e5e5e5] px-4 py-3 text-[#000000]" id="familyId" name="familyId" defaultValue={defaultFamilyId}>
            {showPersonalOption ? <option value="personal">Pribadi</option> : null}
            {families.map((family) => (
              <option key={family.id} value={family.id}>{family.name} · {family.transactionMode === "AUTO_FAMILY" ? "semua masuk keluarga" : "boleh personal"}</option>
            ))}
          </select>
          <p className="mt-2 text-xs text-[#94a3b8]">Mode ini mengikuti settings family. Jika semua family mewajibkan transaksi keluarga, opsi Pribadi tidak ditampilkan.</p>
        </div>
      ) : null}
      <div className="lg:col-span-1">
        <label className="text-sm font-medium text-[#000000]" htmlFor="type">Tipe</label>
        <select className="mt-2 w-full rounded-xl border border-[#e5e5e5] px-4 py-3 text-[#000000]" id="type" name="type" defaultValue="EXPENSE">
          <option value="EXPENSE">Expense</option>
          <option value="INCOME">Income</option>
        </select>
      </div>
      <RupiahAmountInput id="amount" label="Amount" name="amount" required />
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
