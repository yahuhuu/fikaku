import { AssetAllocationCard } from "@/features/assets/components/asset-allocation-card";
import { AssetSummaryCards } from "@/features/assets/components/asset-summary-cards";
import { DashboardCharts } from "./dashboard-charts";
import { RecentTransactions } from "./recent-transactions";
import { SummaryCards } from "./summary-cards";
import { getDashboardSummary } from "../queries/get-dashboard-summary.query";

const quickActions = [
  { label: "Tambah transaksi", href: "/transactions", description: "Catat income atau expense baru." },
  { label: "Kelola wallet", href: "/wallets", description: "Atur cash, rekening, dan e-wallet." },
  { label: "Lihat reports", href: "/reports", description: "Analisis cashflow bulanan." },
];

type DashboardPageProps = {
  userId: string;
};

export async function DashboardPage({ userId }: DashboardPageProps) {
  const month = new Date().toISOString().slice(0, 7);
  const summary = await getDashboardSummary({ userId, month });

  return (
    <main className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr] xl:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#53b6e0]">Fikaku Dashboard</p>
          <h1 className="mt-3 text-3xl font-bold text-[#000000]">Ringkasan keuangan</h1>
          <p className="mt-2 max-w-2xl text-[#94a3b8]">Pantau cashflow bulan berjalan, kategori pengeluaran terbesar, dan transaksi terbaru dari MySQL.</p>
        </div>
        <div className="rounded-2xl border border-[#e5e5e5] bg-[#e5fbff] p-4">
          <p className="text-sm font-semibold text-[#000000]">Quick actions</p>
          <div className="mt-3 grid gap-3 md:grid-cols-3 xl:grid-cols-1">
            {quickActions.map((action) => (
              <a className="rounded-xl bg-white p-3 text-sm shadow-[0_6px_18px_rgba(83,182,224,0.10)] transition hover:-translate-y-0.5" href={action.href} key={action.href}>
                <span className="font-semibold text-[#53b6e0]">{action.label}</span>
                <span className="mt-1 block text-[#94a3b8]">{action.description}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <SummaryCards {...summary.summary} />
      <AssetSummaryCards summary={summary.assets.summary} />
      <AssetAllocationCard allocation={summary.assets.allocation} />
      <DashboardCharts dailyCashflow={summary.dailyCashflow} expenseByCategory={summary.expenseByCategory} />
      <RecentTransactions transactions={summary.recentTransactions} />
    </main>
  );
}
