"use client";

import { useState } from "react";

type Provider = "PIX" | "PAYPAL" | "STRIPE";

const providers: { key: Provider; label: string }[] = [
  { key: "PIX", label: "Pix por QR Code" },
  { key: "PAYPAL", label: "PayPal" },
  { key: "STRIPE", label: "Stripe" },
];

export function PaymentButtons() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<Provider | null>(null);

  async function createPayment(provider: Provider) {
    setLoading(provider);
    setMessage(null);

    const response = await fetch("/api/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider, amountInCents: 2990, currency: "BRL" }),
    });

    const result = await response.json();
    setLoading(null);

    if (!response.ok) {
      setMessage(result.error ?? "Erro ao iniciar pagamento.");
      return;
    }

    if (provider === "PIX") {
      setMessage(`Cobrança criada. QR: ${result.payment.qrCodeText}`);
      return;
    }

    setMessage(`Pagamento ${provider} criado com status ${result.payment.status}. Configure as credenciais reais no .env.`);
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-3">
        {providers.map((provider) => (
          <button
            key={provider.key}
            onClick={() => void createPayment(provider.key)}
            className="button-secondary"
            type="button"
            disabled={loading !== null}
          >
            {loading === provider.key ? "Criando..." : provider.label}
          </button>
        ))}
      </div>
      {message && <p className="text-sm text-slate-700">{message}</p>}
    </div>
  );
}
