import Link from "next/link";
import { RegisterForm } from "@/features/auth/components/register-form";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <section className="w-full max-w-md">
        <Link className="text-2xl font-black text-emerald-700" href="/">fikaku</Link>
        <h1 className="mt-8 text-3xl font-bold text-slate-950">Buat akun fikaku</h1>
        <p className="mb-6 mt-2 text-slate-600">Mulai dari plan Free untuk MVP.</p>
        <RegisterForm />
      </section>
    </main>
  );
}
