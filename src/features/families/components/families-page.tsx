import { addFamilyMemberAction } from "../actions/add-family-member.action";
import { createFamilyAction } from "../actions/create-family.action";
import { updateFamilySettingsAction } from "../actions/update-family-settings.action";
import { getFamilies } from "../queries/get-families.query";

type FamiliesPageProps = {
  userId: string;
  searchParams?: { created?: string; updated?: string; memberAdded?: string; error?: string };
};

const modeLabels = {
  AUTO_FAMILY: "Semua transaksi masuk keluarga",
  ALLOW_PERSONAL: "Bisa pilih personal atau keluarga",
};

export async function FamiliesPage({ userId, searchParams }: FamiliesPageProps) {
  const families = await getFamilies(userId);

  return (
    <main className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#53b6e0]">Family workspace</p>
        <h1 className="mt-2 text-3xl font-bold text-[#000000]">Families</h1>
        <p className="mt-2 max-w-2xl text-[#94a3b8]">Buat beberapa keluarga, tambah anggota via email terdaftar, dan atur mode transaksi keluarga.</p>
      </div>

      {searchParams?.created ? <p className="rounded-xl bg-[#e5fbff] px-4 py-3 text-sm font-medium text-[#53b6e0]">Family berhasil dibuat.</p> : null}
      {searchParams?.updated ? <p className="rounded-xl bg-[#e5fbff] px-4 py-3 text-sm font-medium text-[#53b6e0]">Settings family berhasil diperbarui.</p> : null}
      {searchParams?.memberAdded ? <p className="rounded-xl bg-[#e5fbff] px-4 py-3 text-sm font-medium text-[#53b6e0]">Member berhasil ditambahkan.</p> : null}
      {searchParams?.error ? <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{searchParams.error}</p> : null}

      <form action={createFamilyAction} className="grid gap-4 rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-sm lg:grid-cols-[1fr_1fr_auto] lg:items-end">
        <div>
          <label className="text-sm font-medium text-[#000000]" htmlFor="family-name">Nama keluarga</label>
          <input className="mt-2 w-full rounded-xl border border-[#e5e5e5] px-4 py-3 text-[#000000]" id="family-name" name="name" placeholder="Keluarga Rumah" required />
        </div>
        <div>
          <label className="text-sm font-medium text-[#000000]" htmlFor="transactionMode">Mode transaksi</label>
          <select className="mt-2 w-full rounded-xl border border-[#e5e5e5] px-4 py-3 text-[#000000]" id="transactionMode" name="transactionMode" defaultValue="AUTO_FAMILY">
            <option value="AUTO_FAMILY">Semua transaksi masuk keluarga</option>
            <option value="ALLOW_PERSONAL">Bisa pilih personal atau keluarga</option>
          </select>
        </div>
        <button className="rounded-xl bg-[#53b6e0] px-5 py-3 font-semibold text-white" type="submit">Buat family</button>
      </form>

      <div className="grid gap-6 xl:grid-cols-2">
        {families.length === 0 ? (
          <section className="rounded-2xl border border-dashed border-[#53b6e0]/40 bg-[#e5fbff] p-6 text-[#000000]">
            <h2 className="text-xl font-bold">Belum ada family</h2>
            <p className="mt-2 text-sm text-[#94a3b8]">Buat family pertama untuk mulai menggabungkan laporan transaksi bersama anggota lain.</p>
          </section>
        ) : families.map((family) => (
          <section className="rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-[0_10px_30px_rgba(83,182,224,0.12)]" key={family.id}>
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#53b6e0]">{family.role}</p>
                <h2 className="mt-1 text-2xl font-bold text-[#000000]">{family.name}</h2>
                <p className="mt-1 text-sm text-[#94a3b8]">{family.memberCount} anggota · {modeLabels[family.transactionMode]}</p>
              </div>
            </div>

            {family.role === "OWNER" ? (
              <details className="mt-5 rounded-2xl bg-[#e5fbff] p-4">
                <summary className="cursor-pointer font-semibold text-[#000000]">Settings & tambah member</summary>
                <form action={updateFamilySettingsAction} className="mt-4 grid gap-3">
                  <input name="familyId" type="hidden" value={family.id} />
                  <input className="rounded-xl border border-[#e5e5e5] px-4 py-3 text-[#000000]" name="name" defaultValue={family.name} required />
                  <select className="rounded-xl border border-[#e5e5e5] px-4 py-3 text-[#000000]" name="transactionMode" defaultValue={family.transactionMode}>
                    <option value="AUTO_FAMILY">Semua transaksi masuk keluarga</option>
                    <option value="ALLOW_PERSONAL">Bisa pilih personal atau keluarga</option>
                  </select>
                  <button className="rounded-xl bg-[#111033] px-4 py-3 font-semibold text-white" type="submit">Simpan settings</button>
                </form>
                <form action={addFamilyMemberAction} className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]">
                  <input name="familyId" type="hidden" value={family.id} />
                  <input className="rounded-xl border border-[#e5e5e5] px-4 py-3 text-[#000000]" name="email" placeholder="email user terdaftar" required type="email" />
                  <button className="rounded-xl bg-[#53b6e0] px-4 py-3 font-semibold text-white" type="submit">Tambah member</button>
                </form>
              </details>
            ) : null}

            <div className="mt-5 space-y-3">
              <h3 className="font-semibold text-[#000000]">Members</h3>
              {family.members.map((member) => (
                <div className="flex items-center justify-between gap-3 rounded-xl border border-[#e5e5e5] px-4 py-3 text-sm" key={member.id}>
                  <div>
                    <p className="font-semibold text-[#000000]">{member.name ?? member.email}</p>
                    <p className="text-[#94a3b8]">{member.email}</p>
                  </div>
                  <span className="rounded-full bg-[#e5fbff] px-3 py-1 text-xs font-bold text-[#53b6e0]">{member.role}</span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
