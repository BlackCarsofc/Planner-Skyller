import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  if (user.role !== "ADMIN") redirect("/dashboard");

  const [payments, users] = await Promise.all([
    prisma.payment.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    prisma.user.findMany({
      include: { premiumAccess: true },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
  ]);

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-gradient-to-r from-brand-500 to-pink-500 p-8 text-white shadow-soft">
        <h1 className="text-4xl font-bold">Painel administrativo</h1>
        <p className="mt-3 text-white/90">Aprovação manual do premium e conferência de pagamentos.</p>
      </section>

      <section className="card p-6">
        <h2 className="text-2xl font-bold">Pagamentos pendentes</h2>
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-rose-200 text-slate-500">
                <th className="px-3 py-3">Usuário</th>
                <th className="px-3 py-3">Provedor</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3">Valor</th>
                <th className="px-3 py-3">Ação</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b border-rose-100">
                  <td className="px-3 py-3">{payment.user.name}</td>
                  <td className="px-3 py-3">{payment.provider}</td>
                  <td className="px-3 py-3">{payment.status}</td>
                  <td className="px-3 py-3">R$ {(payment.amountInCents / 100).toFixed(2)}</td>
                  <td className="px-3 py-3">
                    <form action="/api/admin/approve" method="post" className="flex gap-2">
                      <input type="hidden" name="paymentId" value={payment.id} />
                      <input type="hidden" name="userId" value={payment.userId} />
                      <button className="button-primary px-4 py-2">Aprovar</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card p-6">
        <h2 className="text-2xl font-bold">Usuários</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {users.map((item) => (
            <div key={item.id} className="rounded-3xl border border-rose-200 p-4">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{item.email}</p>
              <p className="mt-2 text-sm"><strong>Role:</strong> {item.role}</p>
              <p className="mt-1 text-sm"><strong>Premium:</strong> {item.premiumAccess?.active ? "Ativo" : "Inativo"}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
