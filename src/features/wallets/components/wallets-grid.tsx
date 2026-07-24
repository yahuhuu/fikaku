import { deleteWalletAction } from "../actions/delete-wallet.action";
import type { WalletListItem } from "../repositories/wallet.repository";
import { formatCurrency } from "@/shared/utils/format-currency";

type WalletsGridProps = {
  wallets: WalletListItem[];
};

export function WalletsGrid({ wallets }: WalletsGridProps) {
  if (wallets.length === 0) {
    return <div className="rounded-2xl border border-dashed border-[#e5e5e5] bg-white p-10 text-center text-[#94a3b8]">Belum ada wallet.</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {wallets.map((wallet) => (
        <article className="rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-sm" key={wallet.id}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-[#94a3b8]">{wallet.currency}</p>
              <h2 className="mt-2 text-xl font-bold text-[#000000]">{wallet.name}</h2>
            </div>
            <form action={deleteWalletAction}>
              <input name="id" type="hidden" value={wallet.id} />
              <button className="rounded-lg px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50" type="submit">Hapus</button>
            </form>
          </div>
          <p className="mt-6 text-3xl font-black text-[#53b6e0]">{formatCurrency(wallet.balance, wallet.currency)}</p>
        </article>
      ))}
    </div>
  );
}
