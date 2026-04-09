import Link from "next/link";
import { AuthForm } from "@/components/forms";

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md">
      <div className="card p-6">
        <h1 className="text-3xl font-bold">Criar conta</h1>
        <p className="mt-2 text-sm text-slate-600">Cadastre-se para começar a usar o planner.</p>
        <div className="mt-6">
          <AuthForm mode="register" />
        </div>
        <p className="mt-4 text-sm text-slate-600">
          Já tem conta? <Link href="/login" className="font-semibold text-brand-600">Entrar</Link>
        </p>
      </div>
    </div>
  );
}
