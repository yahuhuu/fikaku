import { createWalletAction } from "../actions/create-wallet.action";

export function WalletForm() {
  return (
    <form action={createWalletAction} className="grid gap-4 rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-sm md:grid-cols-4">
      <div className="md:col-span-2">
        <label className="text-sm font-medium text-[#000000]" htmlFor="name">Nama wallet</label>
        <input className="mt-2 w-full rounded-xl border border-[#e5e5e5] px-4 py-3 text-[#000000]" id="name" name="name" placeholder="BCA / Cash / GoPay" required />
      </div>
      <div>
        <label className="text-sm font-medium text-[#000000]" htmlFor="balance">Saldo awal</label>
        <input className="mt-2 w-full rounded-xl border border-[#e5e5e5] px-4 py-3 text-[#000000]" defaultValue="0" id="balance" min="0" name="balance" required type="number" />
      </div>
      <div>
        <label className="text-sm font-medium text-[#000000]" htmlFor="currency">Currency</label>
        <input className="mt-2 w-full rounded-xl border border-[#e5e5e5] px-4 py-3 text-[#000000] uppercase" defaultValue="IDR" id="currency" maxLength={3} minLength={3} name="currency" required />
      </div>
      <button className="rounded-xl bg-[#53b6e0] px-4 py-3 font-semibold text-white hover:bg-[#3aa6d4] md:col-span-4" type="submit">Tambah wallet</button>
    </form>
  );
}
