import { WalletForm } from "./wallet-form";
import { WalletsGrid } from "./wallets-grid";
import { getWallets } from "../queries/get-wallets.query";

type WalletsPageProps = {
  userId: string;
  searchParams?: {
    created?: string;
    error?: string;
  };
};

export async function WalletsPage({ userId, searchParams }: WalletsPageProps) {
  const wallets = await getWallets(userId);

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">Wallets</h1>
        <p className="mt-2 max-w-2xl text-slate-600">Kelola kas, bank, dan e-wallet sebagai sumber dana transaksi.</p>
      </div>
      {searchParams?.created ? <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">Wallet berhasil ditambahkan.</p> : null}
      {searchParams?.error ? <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{searchParams.error}</p> : null}
      <WalletForm />
      <WalletsGrid wallets={wallets} />
    </main>
  );
}
