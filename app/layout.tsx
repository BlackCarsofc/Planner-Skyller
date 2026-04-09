import "./globals.css";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { getSessionUser } from "@/lib/auth";

export const metadata = {
  title: "Planner Premium",
  description: "Planner premium com acesso, pagamentos e painel admin.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();

  return (
    <html lang="pt-BR">
      <body>
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="card overflow-hidden">
            <header className="border-b border-rose-200 px-4 py-4 lg:px-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <Link href="/" className="text-xl font-bold text-slate-900">Planner Premium</Link>
                  <p className="text-sm text-slate-600">Base real com banco, login, premium e admin</p>
                </div>
                <div className="flex items-center gap-3">
                  <ThemeToggle />
                  {user ? (
                    <div className="flex items-center gap-3">
                      <Link href="/dashboard" className="button-secondary">Dashboard</Link>
                      {user.role === "ADMIN" && <Link href="/admin" className="button-secondary">Admin</Link>}
                      <form action="/api/auth/logout" method="post">
                        <button className="button-primary">Sair</button>
                      </form>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Link href="/login" className="button-secondary">Entrar</Link>
                      <Link href="/register" className="button-primary">Criar conta</Link>
                    </div>
                  )}
                </div>
              </div>
            </header>
            <main className="p-4 sm:p-6 lg:p-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
