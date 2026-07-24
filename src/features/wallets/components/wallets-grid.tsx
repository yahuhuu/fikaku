import { deleteWalletAction } from "../actions/delete-wallet.action";
import type { WalletListItem } from "../repositories/wallet.repository";
import { formatCurrency } from "@/shared/utils/format-currency";

type WalletsGridProps = {
  wallets: WalletListItem[];
};

export function WalletsGrid({ wallets }: WalletsGridProps) {
  if (wallets.length === 0) {
    return <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">Belum ada wallet.</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {wallets.map((wallet) => (
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm" key={wallet.id}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">{wallet.currency}</p>
              <h2 className="mt-2 text-xl font-bold text-slate-950">{wallet.name}</h2>
            </div>
            <form action={deleteWalletAction}>
              <input name="id" type="hidden" value={wallet.id} />
              <button className="rounded-lg px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50" type="submit">Hapus</button>
            </form>
          </div>
          <p className="mt-6 text-3xl font-black text-emerald-700">{formatCurrency(wallet.balance, wallet.currency)}</p>
        </article>
      ))}
    </div>
  );
}
