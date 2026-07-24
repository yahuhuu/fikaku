import { deleteWalletAction } from "../actions/delete-wallet.action";
import { updateWalletAction } from "../actions/update-wallet.action";
import type { WalletListItem } from "../repositories/wallet.repository";
import { formatCurrency } from "@/shared/utils/format-currency";
import { ConfirmSubmitButton } from "@/shared/components/forms/confirm-submit-button";

type WalletsGridProps = { wallets: WalletListItem[] };

export function WalletsGrid({ wallets }: WalletsGridProps) {
  if (wallets.length === 0) return <div className="rounded-2xl border border-dashed border-[#e5e5e5] bg-white p-10 text-center text-[#94a3b8]">Belum ada wallet.</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {wallets.map((wallet) => (
        <details className="rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-[0_10px_30px_rgba(83,182,224,0.12)]" key={wallet.id}>
          <summary className="cursor-pointer list-none">
            <p className="text-sm text-[#94a3b8]">{wallet.currency}</p>
            <h2 className="mt-2 text-xl font-bold text-[#000000]">{wallet.name}</h2>
            <p className="mt-6 text-3xl font-black text-[#53b6e0]">{formatCurrency(wallet.balance, wallet.currency)}</p>
          </summary>
          <div className="mt-5 border-t border-[#e5e5e5] pt-4">
            <form action={updateWalletAction} className="space-y-3">
              <input name="id" type="hidden" value={wallet.id} />
              <input className="w-full rounded-xl border border-[#e5e5e5] px-3 py-2" defaultValue={wallet.name} name="name" required />
              <input className="w-full rounded-xl border border-[#e5e5e5] px-3 py-2" defaultValue={wallet.balance} min="0" name="balance" type="number" />
              <input className="w-full rounded-xl border border-[#e5e5e5] px-3 py-2 uppercase" defaultValue={wallet.currency} maxLength={3} minLength={3} name="currency" />
              <button className="w-full rounded-xl bg-[#53b6e0] px-4 py-2 font-semibold text-white" type="submit">Simpan wallet</button>
            </form>
            <form action={deleteWalletAction} className="mt-3"><input name="id" type="hidden" value={wallet.id} /><ConfirmSubmitButton className="rounded-lg px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 disabled:opacity-60" confirmMessage="Hapus wallet ini? Transaksi lama akan kehilangan label wallet.">Hapus wallet</ConfirmSubmitButton></form>
          </div>
        </details>
      ))}
    </div>
  );
}
