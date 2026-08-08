import { formatCurrency } from "@/shared/utils/format-currency";
import type { AssetSummary } from "../services/asset-summary.service";

export function AssetSummaryCards({ summary }: { summary: AssetSummary }) {
  const cards = [
    { label: "Total asset value", value: summary.totalCurrentValue, tone: "text-[#53b6e0]" },
    { label: "Total modal asset", value: summary.totalCostBasis, tone: "text-[#000000]" },
    { label: "Asset gain/loss", value: summary.totalGainLoss, tone: summary.totalGainLoss >= 0 ? "text-[#53b6e0]" : "text-rose-600", suffix: `${summary.totalGainLossPercent.toFixed(2)}%` },
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#53b6e0]">Net worth</p>
          <h2 className="mt-1 text-xl font-bold text-[#000000]">Ringkasan asset</h2>
        </div>
        <a className="rounded-xl border border-[#e5e5e5] px-4 py-2 text-sm font-semibold text-[#000000] hover:bg-[#e5fbff]" href="/assets">Kelola assets</a>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-sm" key={card.label}>
            <p className="text-sm text-[#94a3b8]">{card.label}</p>
            <p className={`mt-3 text-2xl font-bold ${card.tone}`}>{formatCurrency(card.value)}</p>
            {card.suffix ? <p className="mt-1 text-sm text-[#94a3b8]">{card.suffix}</p> : null}
          </div>
        ))}
      </div>
    </section>
  );
}
