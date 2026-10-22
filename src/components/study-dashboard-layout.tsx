import { CalendarDays, LayoutDashboard, Target } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

const links = [
  { href: "/cronograma", label: "Cronograma", icon: CalendarDays },
  { href: "/gaps", label: "Gaps", icon: Target },
  { href: "/desempenho", label: "Desempenho", icon: LayoutDashboard },
];

type StudyDashboardLayoutProps = {
  title: string;
  subtitle: string;
  current: string;
  children: ReactNode;
};

export function StudyDashboardLayout({
  title,
  subtitle,
  current,
  children,
}: StudyDashboardLayoutProps) {
  return (
    <main className="min-h-dvh bg-[#f5f7fb] lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="bg-mentor-blue p-6 text-white lg:min-h-dvh">
        <Link href="/cronograma" className="text-2xl font-extrabold">
          Mentor<span className="text-[#ffd55a]">.ia</span>
        </Link>
        <nav aria-label="Navegação dos estudos" className="mt-8 flex flex-wrap gap-2 lg:flex-col">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              aria-current={current === href ? "page" : undefined}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold transition hover:bg-white/20 ${current === href ? "bg-white/20" : "text-white/80"}`}
            >
              <Icon className="size-5" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="mx-auto w-full max-w-6xl p-5 sm:p-8">
        <p className="text-sm font-semibold text-[#7180af]">Plano personalizado</p>
        <h1 className="mt-2 text-3xl font-extrabold text-[#172052]">{title}</h1>
        <p className="mt-2 text-[#52639c]">{subtitle}</p>
        <div className="mt-8">{children}</div>
      </div>
    </main>
  );
}

export function StudyDashboardEmpty() {
  return (
    <section className="rounded-3xl border border-[#e4e8f2] bg-white p-8">
      <h2 className="text-xl font-bold text-[#22305b]">Seu plano ainda não está completo</h2>
      <p className="mt-2 text-[#52639c]">
        Escolha seus dias e tempo de estudo e conclua o diagnóstico para visualizar os resultados.
      </p>
      <Link href="/onboarding" className="mt-5 inline-block rounded-xl bg-mentor-blue px-5 py-3 font-semibold text-white hover:bg-mentor-blue-hover">
        Configurar meus estudos
      </Link>
    </section>
  );
}
