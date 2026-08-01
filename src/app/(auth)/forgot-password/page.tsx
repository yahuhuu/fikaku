import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <section className="w-full max-w-md rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-[0_10px_30px_rgba(83,182,224,0.12)]">
        <Link className="text-2xl font-black text-[#53b6e0]" href="/">fikaku</Link>
        <h1 className="mt-8 text-3xl font-bold text-[#000000]">Lupa password</h1>
        <p className="mt-2 text-[#94a3b8]">Reset password mandiri belum aktif. Untuk sementara, hubungi admin agar password akun kamu dibantu reset.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="rounded-xl bg-[#53b6e0] px-4 py-3 font-semibold text-white hover:bg-[#3aa6d4]" href="/login">Kembali login</Link>
          <Link className="rounded-xl border border-[#e5e5e5] px-4 py-3 font-semibold text-[#000000] hover:bg-[#e5fbff]" href="/register">Register</Link>
        </div>
      </section>
    </main>
  );
}
