import { createWalletAction } from "../actions/create-wallet.action";

export function WalletForm() {
  return (
    <form action={createWalletAction} className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-4">
      <div className="md:col-span-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="name">Nama wallet</label>
        <input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900" id="name" name="name" placeholder="BCA / Cash / GoPay" required />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700" htmlFor="balance">Saldo awal</label>
        <input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900" defaultValue="0" id="balance" min="0" name="balance" required type="number" />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700" htmlFor="currency">Currency</label>
        <input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 uppercase" defaultValue="IDR" id="currency" maxLength={3} minLength={3} name="currency" required />
      </div>
      <button className="rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-700 md:col-span-4" type="submit">Tambah wallet</button>
    </form>
  );
}
