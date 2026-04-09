import Link from "next/link";
import { AuthForm } from "@/components/forms";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md">
      <div className="card p-6">
        <h1 className="text-3xl font-bold">Entrar</h1>
        <p className="mt-2 text-sm text-slate-600">Use sua conta para acessar o planner premium.</p>
        <div className="mt-6">
          <AuthForm mode="login" />
        </div>
        <p className="mt-4 text-sm text-slate-600">
          Ainda não tem conta? <Link href="/register" className="font-semibold text-brand-600">Criar conta</Link>
        </p>
      </div>
    </div>
  );
}
