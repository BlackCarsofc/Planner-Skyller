import { redirect } from "next/navigation";
import { getDashboardSummary, getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PaymentButtons } from "@/components/payment-buttons";

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const summary = await getDashboardSummary(user.id);
  const entries = await prisma.plannerEntry.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 12,
  });

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-gradient-to-r from-brand-500 to-pink-500 p-8 text-white shadow-soft">
        <h1 className="text-4xl font-bold">Olá, {user.name}</h1>
        <p className="mt-3 max-w-2xl text-white/90">
          Seu painel reúne o planner, seus pagamentos e o status do acesso premium.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="card p-5"><p className="text-sm text-slate-600">Entradas do planner</p><p className="mt-3 text-3xl font-bold">{summary.entries}</p></div>
        <div className="card p-5"><p className="text-sm text-slate-600">Premium</p><p className="mt-3 text-3xl font-bold">{summary.premium?.active ? "Ativo" : "Pendente"}</p></div>
        <div className="card p-5"><p className="text-sm text-slate-600">Últimos pagamentos</p><p className="mt-3 text-3xl font-bold">{summary.payments.length}</p></div>
      </section>

      <section className="card p-6">
        <h2 className="text-2xl font-bold">Assinar premium</h2>
        <p className="mt-2 text-sm text-slate-600">
          O pagamento é registrado no banco de dados e aguarda aprovação manual do admin.
        </p>
        <div className="mt-5">
          <PaymentButtons />
        </div>
      </section>

      <section className="card p-6">
        <h2 className="text-2xl font-bold">Suas páginas e anotações</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {entries.map((entry) => (
            <article key={entry.id} className="rounded-3xl border border-rose-200 p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">{entry.type}</span>
                {entry.premiumOnly && <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">Premium</span>}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{entry.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{entry.content}</p>
              {entry.month && <p className="mt-3 text-xs font-semibold text-slate-500">Mês: {entry.month}</p>}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
