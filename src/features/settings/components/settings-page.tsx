import { changePasswordAction } from "../actions/change-password.action";
import { updateProfileAction } from "../actions/update-profile.action";
import { getCurrentProfile } from "../queries/get-current-profile.query";

type SettingsPageProps = {
  userId: string;
  searchParams?: {
    updated?: string;
    error?: string;
    passwordUpdated?: string;
    passwordError?: string;
  };
};

export async function SettingsPage({ userId, searchParams }: SettingsPageProps) {
  const profile = await getCurrentProfile(userId);
  if (!profile) return null;

  return (
    <main className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#53b6e0]">Account settings</p>
        <h1 className="mt-2 text-3xl font-bold text-[#000000]">Settings & Profile</h1>
        <p className="mt-2 max-w-2xl text-[#94a3b8]">Kelola profil, password, dan status subscription kamu.</p>
      </div>

      {searchParams?.updated ? <p className="rounded-2xl bg-[#e5fbff] px-4 py-3 text-sm font-medium text-[#53b6e0]">Profile berhasil diperbarui. Login ulang jika email/name di session belum berubah.</p> : null}
      {searchParams?.passwordUpdated ? <p className="rounded-2xl bg-[#e5fbff] px-4 py-3 text-sm font-medium text-[#53b6e0]">Password berhasil diperbarui.</p> : null}
      {searchParams?.error ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">{searchParams.error}</p> : null}
      {searchParams?.passwordError ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">{searchParams.passwordError}</p> : null}

      <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <div className="space-y-6">
          <form action={updateProfileAction} className="rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-[0_10px_30px_rgba(83,182,224,0.12)]">
            <h2 className="text-xl font-bold text-[#000000]">Profile</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-[#000000]" htmlFor="name">Nama</label>
                <input className="mt-2 w-full rounded-2xl border border-[#e5e5e5] px-4 py-3 text-[#000000]" id="name" name="name" defaultValue={profile.name ?? ""} required />
              </div>
              <div>
                <label className="text-sm font-medium text-[#000000]" htmlFor="email">Email</label>
                <input className="mt-2 w-full rounded-2xl border border-[#e5e5e5] px-4 py-3 text-[#000000]" id="email" name="email" defaultValue={profile.email} required type="email" />
              </div>
            </div>
            <button className="mt-6 rounded-xl bg-[#53b6e0] px-5 py-3 font-semibold text-white" type="submit">Simpan profile</button>
          </form>

          <form action={changePasswordAction} className="rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-[0_10px_30px_rgba(83,182,224,0.12)]">
            <h2 className="text-xl font-bold text-[#000000]">Change password</h2>
            <p className="mt-2 text-sm text-[#94a3b8]">Gunakan password minimal 8 karakter.</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-[#000000]" htmlFor="currentPassword">Password saat ini</label>
                <input className="mt-2 w-full rounded-2xl border border-[#e5e5e5] px-4 py-3 text-[#000000]" id="currentPassword" name="currentPassword" required type="password" />
              </div>
              <div>
                <label className="text-sm font-medium text-[#000000]" htmlFor="newPassword">Password baru</label>
                <input className="mt-2 w-full rounded-2xl border border-[#e5e5e5] px-4 py-3 text-[#000000]" id="newPassword" minLength={8} name="newPassword" required type="password" />
              </div>
            </div>
            <button className="mt-6 rounded-xl bg-[#111033] px-5 py-3 font-semibold text-white" type="submit">Update password</button>
          </form>
        </div>

        <section className="rounded-2xl border border-[#e5e5e5] bg-[#e5fbff] p-6 shadow-[0_10px_30px_rgba(83,182,224,0.12)]">
          <h2 className="text-xl font-bold text-[#000000]">Subscription</h2>
          <div className="mt-6 space-y-4 text-sm">
            <p><span className="text-[#94a3b8]">Role:</span> <strong>{profile.role}</strong></p>
            <p><span className="text-[#94a3b8]">Plan:</span> <strong>{profile.subscription?.plan ?? "FREE"}</strong></p>
            <p><span className="text-[#94a3b8]">Status:</span> <strong>{profile.subscription?.status ?? "ACTIVE"}</strong></p>
          </div>
        </section>
      </div>
    </main>
  );
}
