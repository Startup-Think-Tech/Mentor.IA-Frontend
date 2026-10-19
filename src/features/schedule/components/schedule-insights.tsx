"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarDays, Target, LayoutDashboard, CheckCircle2 } from "lucide-react";
import { diagnosticStorage } from "@/features/diagnostic/storage/diagnostic.storage";
import { onboardingStorage } from "@/features/onboarding/storage/onboarding.storage";
import { diagnosticSubjects } from "@/features/diagnostic/types/diagnostic.types";
import { diagnosticSubjectLabels } from "@/features/diagnostic/constants/diagnostic-questions";
import { subjectTopics } from "@/features/schedule/constants/schedule.constants";
import { scheduleService } from "@/features/schedule/services/schedule.service";
import type { DiagnosticResults } from "@/features/diagnostic/schemas/diagnostic-results.schema";
import type { OnboardingDraft } from "@/features/onboarding/types/onboarding.types";
import type { SchedulePlan } from "@/features/schedule/types/schedule.types";

const links = [
  { href: "/cronograma", label: "Cronograma", icon: CalendarDays },
  { href: "/gaps", label: "Gaps", icon: Target },
  { href: "/desempenho", label: "Desempenho", icon: LayoutDashboard },
];
const completedKey = "mentor.ia.completed-study-sessions";
type Data = { results: DiagnosticResults | null; draft: OnboardingDraft | null; plan: SchedulePlan | null; completed: string[] };

function useStudyData() {
  const [data, setData] = useState<Data | null>(null);
  useEffect(() => {
    const results = diagnosticStorage.getResults();
    const draft = onboardingStorage.getDraft();
    let completed: string[] = [];
    try {
      const parsed: unknown = JSON.parse(localStorage.getItem(completedKey) ?? "[]");
      if (Array.isArray(parsed)) completed = parsed.filter((v): v is string => typeof v === "string");
    } catch { /* No saved progress */ }
    setData({ results, draft, plan: results && draft ? scheduleService.buildSchedulePlan(draft, results) : null, completed });
  }, []);
  return data;
}

function Layout({ title, subtitle, current, children }: { title: string; subtitle: string; current: string; children: React.ReactNode }) {
  return <main className="min-h-dvh bg-[#f5f7fb] lg:grid lg:grid-cols-[240px_1fr]">
    <aside className="bg-[#174fc9] p-6 text-white lg:min-h-dvh">
      <Link href="/cronograma" className="text-2xl font-extrabold">Mentor<span className="text-[#ffd55a]">.ia</span></Link>
      <nav aria-label="Navegação dos estudos" className="mt-8 flex flex-wrap gap-2 lg:flex-col">
        {links.map(({href,label,icon:Icon}) => <Link key={href} href={href} aria-current={current === href ? "page" : undefined} className={`flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold transition hover:bg-white/20 ${current === href ? "bg-white/20" : "text-white/80"}`}><Icon className="size-5"/>{label}</Link>)}
      </nav>
    </aside>
    <div className="mx-auto w-full max-w-6xl p-5 sm:p-8">
      <p className="text-sm font-semibold text-[#7180af]">Plano personalizado</p>
      <h1 className="mt-2 text-3xl font-extrabold text-[#172052]">{title}</h1>
      <p className="mt-2 text-[#52639c]">{subtitle}</p>
      <div className="mt-8">{children}</div>
    </div>
  </main>;
}
function Empty() {
  return <section className="rounded-3xl border border-[#e4e8f2] bg-white p-8">
    <h2 className="text-xl font-bold text-[#22305b]">Seu plano ainda não está completo</h2>
    <p className="mt-2 text-[#52639c]">Escolha seus dias e tempo de estudo e conclua o diagnóstico para visualizar os resultados.</p>
    <Link href="/onboarding" className="mt-5 inline-block rounded-xl bg-[#174fc9] px-5 py-3 font-semibold text-white">Configurar meus estudos</Link>
  </section>;
}
export function GapsDashboard() {
  const data = useStudyData();
  return <Layout title="Gaps de aprendizagem" subtitle="Identifique os assuntos que merecem mais atenção no seu plano de estudos." current="/gaps">
    {!data ? <p>Carregando...</p> : !data.results || !data.plan ? <Empty/> :
      <div className="grid gap-5 md:grid-cols-2">
        {diagnosticSubjects.map(subject => {
          const result = data.results?.[subject];
          return <article key={subject} className="rounded-3xl border border-[#e4e8f2] bg-white p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-[#22305b]">{diagnosticSubjectLabels[subject]}</h2>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${result === false ? "bg-rose-100 text-rose-700" : result === true ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{result === false ? "Prioridade alta" : result === true ? "Bom desempenho" : "Não avaliado"}</span>
            </div>
            <p className="mt-3 text-sm text-[#52639c]">{result === false ? "Reserve mais sessões para reforçar esta matéria." : result === true ? "Continue revisando para manter seu resultado." : "Faça o diagnóstico para identificar suas dificuldades."}</p>
            <h3 className="mt-5 font-semibold text-[#22305b]">Sugestões de revisão</h3>
            <ul className="mt-2 space-y-2 text-sm text-[#52639c]">{subjectTopics[subject].slice(0,3).map(topic => <li key={topic}>• {topic}</li>)}</ul>
          </article>;
        })}
      </div>}
  </Layout>;
}
export function ProgressDashboard() {
  const data = useStudyData();
  const sessions = data?.plan?.days.flatMap(day => day.sessions.map((session, index) => ({ ...session, id: `${day.day}-${index}` }))) ?? [];
  const done = sessions.filter(session => data?.completed.includes(session.id)).length;
  const percent = sessions.length ? Math.round(done / sessions.length * 100) : 0;
  return <Layout title="Meu desempenho" subtitle="Acompanhe suas sessões concluídas e os resultados do diagnóstico." current="/desempenho">
    {!data ? <p>Carregando...</p> : !data.results || !data.plan ? <Empty/> : <>
      <div className="grid gap-4 sm:grid-cols-3">
        {[["Sessões concluídas", String(done)], ["Sessões planejadas", String(sessions.length)], ["Progresso semanal", `${percent}%`]].map(([label,value]) =>
          <article key={label} className="rounded-3xl border border-[#e4e8f2] bg-white p-6"><p className="text-sm font-semibold text-[#7180af]">{label}</p><p className="mt-3 text-4xl font-extrabold text-[#174fc9]">{value}</p></article>)}
      </div>
      <section className="mt-6 rounded-3xl border border-[#e4e8f2] bg-white p-6">
        <h2 className="text-xl font-bold text-[#22305b]">Evolução do cronograma</h2>
        <div role="progressbar" aria-label="Progresso semanal" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} className="mt-4 h-4 overflow-hidden rounded-full bg-[#e9eef9]"><div className="h-full rounded-full bg-[#3555b6]" style={{width: `${percent}%`}}/></div>
        <p className="mt-3 text-sm text-[#52639c]">Marque as sessões concluídas na tela de cronograma para atualizar este indicador.</p>
      </section>
      <section className="mt-6 rounded-3xl border border-[#e4e8f2] bg-white p-6">
        <h2 className="text-xl font-bold text-[#22305b]">Resultado por disciplina</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">{diagnosticSubjects.map(subject => <div key={subject} className="flex items-center justify-between rounded-xl bg-[#f7f9fe] p-4"><span className="font-semibold text-[#22305b]">{diagnosticSubjectLabels[subject]}</span><span className="flex items-center gap-1 text-sm text-[#52639c]">{data.results?.[subject] === true ? <><CheckCircle2 className="size-4 text-emerald-600"/> Acerto</> : data.results?.[subject] === false ? "Reforçar" : "Não avaliado"}</span></div>)}</div>
      </section>
    </>}
  </Layout>;
}
