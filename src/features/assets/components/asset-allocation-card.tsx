import { formatCurrency } from "@/shared/utils/format-currency";
import type { AssetAllocationItem } from "../services/asset-allocation.service";

export function AssetAllocationCard({ allocation }: { allocation: AssetAllocationItem[] }) {
  return (
    <section className="rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#53b6e0]">Asset allocation</p>
        <h2 className="mt-2 text-xl font-bold text-[#000000]">Alokasi asset berdasarkan tipe</h2>
        <p className="mt-1 text-sm text-[#94a3b8]">Distribusi portfolio personal dan family asset yang bisa kamu akses.</p>
      </div>
      <div className="mt-5 space-y-4">
        {allocation.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#e5e5e5] p-8 text-center text-sm text-[#94a3b8]">Belum ada asset allocation.</div>
        ) : allocation.map((item) => (
          <div key={item.type}>
            <div className="mb-2 flex items-center justify-between gap-3 text-sm">
              <div>
                <p className="font-semibold text-[#000000]">{item.type}</p>
                <p className="text-xs text-[#94a3b8]">{item.assetCount} asset</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-[#000000]">{formatCurrency(item.currentValue)}</p>
                <p className="text-xs text-[#53b6e0]">{item.percentage.toFixed(2)}%</p>
              </div>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[#e5e5e5]">
              <div className="h-full rounded-full bg-[#53b6e0]" style={{ width: `${Math.min(item.percentage, 100)}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
