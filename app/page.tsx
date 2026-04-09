import Link from "next/link";
import { CalendarDays, Crown, CreditCard, ShieldCheck, Sparkles, Wallet, BookOpen, Target } from "lucide-react";

const features = [
  { title: "Calendário anual", icon: CalendarDays },
  { title: "Metas e plano de ação", icon: Target },
  { title: "Controle financeiro", icon: Wallet },
  { title: "Minhas leituras", icon: BookOpen },
  { title: "Assinatura premium", icon: Crown },
  { title: "Pagamentos reais", icon: CreditCard },
  { title: "Aprovação manual", icon: ShieldCheck },
  { title: "Tema dinâmico", icon: Sparkles },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[32px] bg-gradient-to-r from-brand-500 to-pink-500 p-8 text-white shadow-soft">
        <div className="max-w-3xl">
          <p className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-medium">Planner baseado no seu PDF</p>
          <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
            Um site elegante com banco de dados, login, premium e painel admin.
          </h1>
          <p className="mt-4 text-base leading-7 text-white/90">
            Estrutura full-stack pronta para evoluir com PostgreSQL, Prisma, autenticação, pagamentos por Pix, PayPal e Stripe, e aprovação manual do acesso premium.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/register" className="rounded-2xl bg-white px-5 py-3 font-semibold text-slate-900">Começar agora</Link>
            <Link href="/login" className="rounded-2xl border border-white/30 px-5 py-3 font-semibold">Já tenho conta</Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {features.map(({ title, icon: Icon }) => (
          <div key={title} className="card p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-pink-500 text-white">
              <Icon size={22} />
            </div>
            <h2 className="mt-4 text-lg font-semibold">{title}</h2>
            <p className="mt-2 text-sm text-slate-600">Pronto para uso e expansão.</p>
          </div>
        ))}
      </section>
    </div>
  );
}
