import { AssetAllocationCard } from "@/features/assets/components/asset-allocation-card";
import { AssetSummaryCards } from "@/features/assets/components/asset-summary-cards";
import { getVisibleAssetsData } from "@/features/assets/queries/get-assets.query";
import { calculateAssetAllocation } from "@/features/assets/services/asset-allocation.service";
import { calculateAssetSummary } from "@/features/assets/services/asset-summary.service";
import { getFamilies } from "@/features/families/queries/get-families.query";
import { CategoryBreakdown } from "./category-breakdown";
import { CashflowTable } from "./cashflow-table";
import { ReportSummaryCards } from "./report-summary-cards";
import { ReportCharts } from "./report-charts";
import { getMonthlyReport } from "../queries/get-monthly-report.query";

type ReportsPageProps = {
  userId: string;
  searchParams?: {
    month?: string;
    familyId?: string;
  };
};

export async function ReportsPage({ userId, searchParams }: ReportsPageProps) {
  const selectedMonth = searchParams?.month ?? new Date().toISOString().slice(0, 7);
  const families = await getFamilies(userId);
  const selectedFamilyId = families.some((family) => family.id === searchParams?.familyId) ? searchParams?.familyId : undefined;
  const [report, assetData] = await Promise.all([
    getMonthlyReport({ userId, month: selectedMonth, familyId: selectedFamilyId }),
    getVisibleAssetsData(userId),
  ]);
  const reportAssets = selectedFamilyId ? assetData.assets.filter((asset) => asset.familyId === selectedFamilyId) : assetData.assets;
  const assetSummary = calculateAssetSummary(reportAssets);
  const assetAllocation = calculateAssetAllocation(reportAssets);

  return (
    <main className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#53b6e0]">Monthly report</p>
          <h1 className="mt-2 text-3xl font-bold text-[#000000]">Reports</h1>
          <p className="mt-2 max-w-2xl text-[#94a3b8]">Pantau laporan pribadi atau laporan gabungan family yang kamu ikuti.</p>
        </div>
        <form className="flex flex-wrap gap-3 rounded-2xl border border-[#e5e5e5] bg-white p-3 shadow-sm">
          <input className="rounded-xl border border-[#e5e5e5] px-4 py-3 text-[#000000]" defaultValue={selectedMonth} name="month" type="month" />
          <select className="rounded-xl border border-[#e5e5e5] px-4 py-3 text-[#000000]" defaultValue={selectedFamilyId ?? ""} name="familyId">
            <option value="">Laporan saya</option>
            {families.map((family) => <option key={family.id} value={family.id}>Family: {family.name}</option>)}
          </select>
          <button className="rounded-xl bg-[#111033] px-4 py-3 font-semibold text-white" type="submit">Filter</button>
        </form>
      </div>

      <ReportSummaryCards summary={report.summary} />
      <ReportCharts expenseByCategory={report.expenseByCategory} dailyCashflow={report.dailyCashflow} />

      <AssetSummaryCards summary={assetSummary} />
      <AssetAllocationCard allocation={assetAllocation} />

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <CategoryBreakdown items={report.expenseByCategory} />
        <CashflowTable rows={report.dailyCashflow} />
      </div>
    </main>
  );
}
