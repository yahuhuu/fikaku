import { ConfirmSubmitButton } from "@/shared/components/forms/confirm-submit-button";
import { formatCurrency } from "@/shared/utils/format-currency";
import { AssetAllocationCard } from "./asset-allocation-card";
import { createAssetAction } from "../actions/create-asset.action";
import { createAssetTransactionAction } from "../actions/create-asset-transaction.action";
import { deleteAssetAction } from "../actions/delete-asset.action";
import { updateAssetAction } from "../actions/update-asset.action";
import { getAssetsPageData } from "../queries/get-assets.query";
import type { AssetListItem, AssetTransactionListItem, AssetTransactionType, AssetType, AssetValuationMode } from "../repositories/asset.repository";

const assetTypes: { value: AssetType; label: string }[] = [
  { value: "STOCK", label: "Saham" },
  { value: "MONEY_MARKET_MUTUAL_FUND", label: "Reksadana Pasar Uang" },
  { value: "EQUITY_MUTUAL_FUND", label: "Reksadana Saham" },
  { value: "FIXED_INCOME_MUTUAL_FUND", label: "Reksadana Pendapatan Tetap" },
  { value: "BALANCED_MUTUAL_FUND", label: "Reksadana Campuran" },
  { value: "CRYPTO", label: "Kripto" },
  { value: "DEPOSIT", label: "Deposito" },
  { value: "DIGITAL_BANK", label: "Bank Digital" },
  { value: "GOLD", label: "Emas" },
  { value: "BOND", label: "Obligasi" },
  { value: "OTHER", label: "Lainnya" },
];

const valuationModes: { value: AssetValuationMode; label: string }[] = [
  { value: "MANUAL_VALUE", label: "Manual value" },
  { value: "QUANTITY_PRICE", label: "Quantity + price" },
];

const assetTransactionTypes: { value: AssetTransactionType; label: string }[] = [
  { value: "BUY", label: "Buy" },
  { value: "SELL", label: "Sell" },
  { value: "TOP_UP", label: "Top up" },
  { value: "WITHDRAW", label: "Withdraw" },
  { value: "DIVIDEND", label: "Dividend" },
  { value: "INTEREST", label: "Interest" },
  { value: "FEE", label: "Fee" },
  { value: "ADJUSTMENT", label: "Adjustment" },
];

type AssetsPageProps = {
  userId: string;
  searchParams?: { created?: string; updated?: string; deleted?: string; transactionAdded?: string; error?: string };
};

function AssetTransactionForm({ asset }: { asset: AssetListItem }) {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <form action={createAssetTransactionAction} className="mt-4 grid gap-3 rounded-2xl border border-[#e5e5e5] bg-[#f8fafc] p-4 md:grid-cols-4">
      <input name="assetId" type="hidden" value={asset.id} />
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">Tipe transaksi</label>
        <select className="mt-1 w-full rounded-xl border border-[#e5e5e5] px-3 py-2 text-[#000000]" name="type" defaultValue={asset.valuationMode === "QUANTITY_PRICE" ? "BUY" : "TOP_UP"}>
          {assetTransactionTypes.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}
        </select>
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">Quantity</label>
        <input className="mt-1 w-full rounded-xl border border-[#e5e5e5] px-3 py-2 text-[#000000]" min="0" name="quantity" step="0.00000001" type="number" />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">Price</label>
        <input className="mt-1 w-full rounded-xl border border-[#e5e5e5] px-3 py-2 text-[#000000]" min="0" name="price" step="0.01" type="number" />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">Amount</label>
        <input className="mt-1 w-full rounded-xl border border-[#e5e5e5] px-3 py-2 text-[#000000]" min="0" name="amount" required step="0.01" type="number" />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">Tanggal</label>
        <input className="mt-1 w-full rounded-xl border border-[#e5e5e5] px-3 py-2 text-[#000000]" defaultValue={today} name="date" required type="date" />
      </div>
      <div className="md:col-span-2">
        <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">Notes</label>
        <input className="mt-1 w-full rounded-xl border border-[#e5e5e5] px-3 py-2 text-[#000000]" name="notes" placeholder="Catatan transaksi asset" />
      </div>
      <button className="rounded-xl bg-[#111033] px-4 py-3 font-semibold text-white md:self-end" type="submit">Tambah transaksi asset</button>
    </form>
  );
}

function AssetTransactionHistory({ transactions }: { transactions: AssetTransactionListItem[] }) {
  if (transactions.length === 0) return <p className="mt-3 rounded-xl border border-dashed border-[#e5e5e5] p-4 text-sm text-[#94a3b8]">Belum ada transaksi asset.</p>;
  return (
    <div className="mt-3 grid gap-2">
      {transactions.slice(0, 5).map((transaction) => (
        <div className="grid gap-2 rounded-xl border border-[#e5e5e5] p-3 text-sm md:grid-cols-5" key={transaction.id}>
          <span className="font-semibold text-[#000000]">{transaction.type}</span>
          <span className="text-[#94a3b8]">{transaction.date.toISOString().slice(0, 10)}</span>
          <span className="text-[#94a3b8]">Qty {transaction.quantity ?? "-"}</span>
          <span className="text-[#94a3b8]">Price {transaction.price ? formatCurrency(transaction.price) : "-"}</span>
          <span className="font-semibold text-[#000000]">{formatCurrency(transaction.amount)}</span>
        </div>
      ))}
    </div>
  );
}

function AssetForm({ asset, families }: { asset?: AssetListItem; families: { id: string; name: string }[] }) {
  return (
    <form action={asset ? updateAssetAction : createAssetAction} className="grid gap-3 rounded-2xl border border-[#e5e5e5] bg-white p-4 shadow-sm md:grid-cols-3">
      {asset ? <input name="id" type="hidden" value={asset.id} /> : null}
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">Scope</label>
        <select className="mt-1 w-full rounded-xl border border-[#e5e5e5] px-3 py-2 text-[#000000]" defaultValue={asset?.familyId ?? ""} name="familyId">
          <option value="">Personal</option>
          {families.map((family) => <option key={family.id} value={family.id}>Family: {family.name}</option>)}
        </select>
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">Nama asset</label>
        <input className="mt-1 w-full rounded-xl border border-[#e5e5e5] px-3 py-2 text-[#000000]" defaultValue={asset?.name} name="name" placeholder="BBCA / Blue Pocket" required />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">Symbol</label>
        <input className="mt-1 w-full rounded-xl border border-[#e5e5e5] px-3 py-2 text-[#000000]" defaultValue={asset?.symbol ?? ""} name="symbol" placeholder="BBCA / BTC" />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">Tipe</label>
        <select className="mt-1 w-full rounded-xl border border-[#e5e5e5] px-3 py-2 text-[#000000]" defaultValue={asset?.type ?? "STOCK"} name="type">
          {assetTypes.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}
        </select>
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">Mode valuasi</label>
        <select className="mt-1 w-full rounded-xl border border-[#e5e5e5] px-3 py-2 text-[#000000]" defaultValue={asset?.valuationMode ?? "MANUAL_VALUE"} name="valuationMode">
          {valuationModes.map((mode) => <option key={mode.value} value={mode.value}>{mode.label}</option>)}
        </select>
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">Platform</label>
        <input className="mt-1 w-full rounded-xl border border-[#e5e5e5] px-3 py-2 text-[#000000]" defaultValue={asset?.platform ?? ""} name="platform" placeholder="Stockbit / Blue" />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">Quantity</label>
        <input className="mt-1 w-full rounded-xl border border-[#e5e5e5] px-3 py-2 text-[#000000]" defaultValue={asset?.quantity ?? ""} min="0" name="quantity" step="0.00000001" type="number" />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">Current price</label>
        <input className="mt-1 w-full rounded-xl border border-[#e5e5e5] px-3 py-2 text-[#000000]" defaultValue={asset?.currentPrice ?? ""} min="0" name="currentPrice" step="0.01" type="number" />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">Cost basis</label>
        <input className="mt-1 w-full rounded-xl border border-[#e5e5e5] px-3 py-2 text-[#000000]" defaultValue={asset?.costBasis ?? "0"} min="0" name="costBasis" required step="0.01" type="number" />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">Current value</label>
        <input className="mt-1 w-full rounded-xl border border-[#e5e5e5] px-3 py-2 text-[#000000]" defaultValue={asset?.currentValue ?? ""} min="0" name="currentValue" step="0.01" type="number" />
      </div>
      <div className="md:col-span-2">
        <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">Notes</label>
        <input className="mt-1 w-full rounded-xl border border-[#e5e5e5] px-3 py-2 text-[#000000]" defaultValue={asset?.notes ?? ""} name="notes" placeholder="Catatan asset" />
      </div>
      <button className="rounded-xl bg-[#53b6e0] px-4 py-3 font-semibold text-white hover:bg-[#3aa6d4] md:col-span-3" type="submit">{asset ? "Simpan asset" : "Tambah asset"}</button>
    </form>
  );
}

export async function AssetsPage({ userId, searchParams }: AssetsPageProps) {
  const { assets, families, summary, allocation, transactionsByAsset } = await getAssetsPageData(userId);
  return (
    <main className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#53b6e0]">Portfolio assets</p>
        <h1 className="mt-2 text-3xl font-bold text-[#000000]">Assets</h1>
        <p className="mt-2 max-w-2xl text-[#94a3b8]">Catat asset investasi personal maupun family: saham, kripto, reksadana, deposito, bank digital pocket, dan lainnya.</p>
      </div>
      {searchParams?.created ? <p className="rounded-xl bg-[#e5fbff] px-4 py-3 text-sm font-medium text-[#53b6e0]">Asset berhasil ditambahkan.</p> : null}
      {searchParams?.updated ? <p className="rounded-xl bg-[#e5fbff] px-4 py-3 text-sm font-medium text-[#53b6e0]">Asset berhasil diperbarui.</p> : null}
      {searchParams?.deleted ? <p className="rounded-xl bg-[#e5fbff] px-4 py-3 text-sm font-medium text-[#53b6e0]">Asset berhasil dihapus.</p> : null}
      {searchParams?.transactionAdded ? <p className="rounded-xl bg-[#e5fbff] px-4 py-3 text-sm font-medium text-[#53b6e0]">Transaksi asset berhasil ditambahkan.</p> : null}
      {searchParams?.error ? <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{searchParams.error}</p> : null}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-[#e5e5e5] bg-white p-5 shadow-sm"><p className="text-sm text-[#94a3b8]">Total value</p><p className="mt-2 text-2xl font-black text-[#53b6e0]">{formatCurrency(summary.totalCurrentValue)}</p></div>
        <div className="rounded-2xl border border-[#e5e5e5] bg-white p-5 shadow-sm"><p className="text-sm text-[#94a3b8]">Total modal</p><p className="mt-2 text-2xl font-black text-[#000000]">{formatCurrency(summary.totalCostBasis)}</p></div>
        <div className="rounded-2xl border border-[#e5e5e5] bg-white p-5 shadow-sm"><p className="text-sm text-[#94a3b8]">Gain/Loss</p><p className={summary.totalGainLoss >= 0 ? "mt-2 text-2xl font-black text-[#53b6e0]" : "mt-2 text-2xl font-black text-rose-600"}>{formatCurrency(summary.totalGainLoss)} · {summary.totalGainLossPercent.toFixed(2)}%</p></div>
      </div>
      <AssetAllocationCard allocation={allocation} />
      <AssetForm families={families} />
      <section className="space-y-3">
        {assets.length === 0 ? <div className="rounded-2xl border border-dashed border-[#e5e5e5] bg-white p-10 text-center text-[#94a3b8]">Belum ada asset. Tambahkan asset pertama kamu.</div> : assets.map((asset) => (
          <details className="rounded-2xl border border-[#e5e5e5] bg-white p-4 shadow-[0_10px_30px_rgba(83,182,224,0.08)]" key={asset.id}>
            <summary className="cursor-pointer list-none">
              <div className="grid gap-3 text-sm md:grid-cols-6 md:items-center">
                <span className="font-semibold text-[#000000] md:col-span-2">{asset.name} {asset.symbol ? <span className="text-[#94a3b8]">({asset.symbol})</span> : null}</span>
                <span className="text-[#94a3b8]">{asset.familyId ? "Family" : "Personal"}</span>
                <span className="text-[#94a3b8]">{asset.type}</span>
                <span className="font-semibold text-[#000000]">{formatCurrency(asset.currentValue)}</span>
                <span className={asset.currentValue - asset.costBasis >= 0 ? "text-[#53b6e0]" : "text-rose-600"}>{formatCurrency(asset.currentValue - asset.costBasis)}</span>
              </div>
            </summary>
            <div className="mt-4 border-t border-[#e5e5e5] pt-4">
              <AssetTransactionForm asset={asset} />
              <AssetTransactionHistory transactions={transactionsByAsset[asset.id] ?? []} />
              <div className="my-4 border-t border-[#e5e5e5]" />
              <AssetForm asset={asset} families={families} />
              <form action={deleteAssetAction} className="mt-3">
                <input name="id" type="hidden" value={asset.id} />
                <ConfirmSubmitButton className="rounded-lg px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 disabled:opacity-60" confirmMessage={`Hapus asset ${asset.name}?`}>Hapus asset</ConfirmSubmitButton>
              </form>
            </div>
          </details>
        ))}
      </section>
    </main>
  );
}
