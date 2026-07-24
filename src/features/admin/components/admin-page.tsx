import { formatDate } from "@/shared/utils/format-date";
import { updateUserAdminControlsAction } from "../actions/update-user-admin-controls.action";
import { getAdminDashboard } from "../queries/get-admin-dashboard.query";

type AdminPageProps = {
  searchParams?: {
    updated?: string;
    error?: string;
  };
};

export async function AdminPage({ searchParams }: AdminPageProps) {
  const { users, summary } = await getAdminDashboard();
  const cards = [
    ["Total users", summary.totalUsers],
    ["Active subscriptions", summary.activeSubscriptions],
    ["Free users", summary.freeUsers],
    ["Pro users", summary.proUsers],
    ["Business users", summary.businessUsers],
  ];

  return (
    <main className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#53b6e0]">Admin</p>
        <h1 className="mt-2 text-3xl font-bold text-[#000000]">Users & subscriptions</h1>
        <p className="mt-2 text-[#94a3b8]">Pantau dan ubah role, plan, dan status subscription user.</p>
      </div>

      {searchParams?.updated ? <p className="rounded-xl bg-[#e5fbff] px-4 py-3 text-sm font-medium text-[#53b6e0]">User/subscription berhasil diperbarui.</p> : null}
      {searchParams?.error ? <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{searchParams.error}</p> : null}

      <div className="grid gap-4 md:grid-cols-5">
        {cards.map(([label, value]) => (
          <article className="rounded-2xl border border-[#e5e5e5] bg-white p-5 shadow-[0_10px_30px_rgba(83,182,224,0.12)]" key={label}>
            <p className="text-sm text-[#94a3b8]">{label}</p>
            <p className="mt-3 text-2xl font-black text-[#000000]">{value}</p>
          </article>
        ))}
      </div>

      <section className="space-y-3">
        {users.map((user) => (
          <details className="rounded-2xl border border-[#e5e5e5] bg-white p-4 shadow-[0_10px_30px_rgba(83,182,224,0.10)]" key={user.id}>
            <summary className="cursor-pointer list-none">
              <div className="grid gap-3 text-sm md:grid-cols-5 md:items-center">
                <div>
                  <p className="font-semibold text-[#000000]">{user.name ?? "-"}</p>
                  <p className="text-[#94a3b8]">{user.email}</p>
                </div>
                <p>{user.role}</p>
                <p>{user.subscription?.plan ?? "FREE"}</p>
                <p>{user.subscription?.status ?? "ACTIVE"}</p>
                <p className="text-[#94a3b8]">{formatDate(user.createdAt)}</p>
              </div>
            </summary>
            <form action={updateUserAdminControlsAction} className="mt-4 grid gap-3 border-t border-[#e5e5e5] pt-4 md:grid-cols-4">
              <input name="userId" type="hidden" value={user.id} />
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">Role</label>
                <select className="mt-1 w-full rounded-xl border border-[#e5e5e5] px-3 py-2 text-[#000000]" defaultValue={user.role} name="role">
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">Plan</label>
                <select className="mt-1 w-full rounded-xl border border-[#e5e5e5] px-3 py-2 text-[#000000]" defaultValue={user.subscription?.plan ?? "FREE"} name="plan">
                  <option value="FREE">Free</option>
                  <option value="PRO">Pro</option>
                  <option value="BUSINESS">Business</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">Status</label>
                <select className="mt-1 w-full rounded-xl border border-[#e5e5e5] px-3 py-2 text-[#000000]" defaultValue={user.subscription?.status ?? "ACTIVE"} name="status">
                  <option value="ACTIVE">Active</option>
                  <option value="CANCELED">Canceled</option>
                  <option value="EXPIRED">Expired</option>
                </select>
              </div>
              <button className="self-end rounded-xl bg-[#53b6e0] px-4 py-2 font-semibold text-white" type="submit">Simpan</button>
            </form>
          </details>
        ))}
      </section>
    </main>
  );
}
