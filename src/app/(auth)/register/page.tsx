import Link from "next/link";
import { RegisterForm } from "@/features/auth/components/register-form";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <section className="w-full max-w-md">
        <Link className="text-2xl font-black text-[#53b6e0]" href="/">fikaku</Link>
        <h1 className="mt-8 text-3xl font-bold text-[#000000]">Buat akun fikaku</h1>
        <p className="mb-6 mt-2 text-[#94a3b8]">Mulai dari plan Free untuk MVP.</p>
        <RegisterForm />
      </section>
    </main>
  );
}
