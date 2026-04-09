"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type AuthFormProps = {
  mode: "login" | "register";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
    const body = Object.fromEntries(formData.entries());

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(result.error ?? "Erro ao processar solicitação.");
      return;
    }

    router.push(mode === "login" ? "/dashboard" : "/login");
    router.refresh();
  }

  return (
    <form
      action={async (formData) => {
        await onSubmit(formData);
      }}
      className="space-y-4"
    >
      {mode === "register" && <input name="name" className="input" placeholder="Seu nome" required />}
      <input name="email" type="email" className="input" placeholder="Seu e-mail" required />
      <input name="password" type="password" className="input" placeholder="Sua senha" required />
      {error && <p className="text-sm text-rose-600">{error}</p>}
      <button disabled={loading} className="button-primary w-full disabled:opacity-60">
        {loading ? "Carregando..." : mode === "login" ? "Entrar" : "Criar conta"}
      </button>
    </form>
  );
}
