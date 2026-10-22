"use client";

import { CheckCircle2 } from "lucide-react";

import { diagnosticSubjectLabels } from "@/app/(private)/diagnostico/constants/diagnostic-questions";
import { StudyDashboardEmpty, StudyDashboardLayout } from "@/components/study-dashboard-layout";
import { useStudyData } from "@/hooks/use-study-data";
import { diagnosticSubjects } from "@/app/(private)/diagnostico/types/diagnostic.types";

export function ProgressDashboard() {
  const data = useStudyData();
  const sessions = data?.plan?.days.flatMap((day) => day.sessions.map((session, index) => ({
    ...session,
    id: `${day.day}-${index}`,
  }))) ?? [];
  const done = sessions.filter((session) => data?.completed.includes(session.id)).length;
  const percent = sessions.length ? Math.round((done / sessions.length) * 100) : 0;

  return (
    <StudyDashboardLayout
      title="Meu desempenho"
      subtitle="Acompanhe suas sessões concluídas e os resultados do diagnóstico."
      current="/desempenho"
    >
      {!data ? <p>Carregando...</p> : !data.results || !data.plan ? <StudyDashboardEmpty /> : (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            {[["Sessões concluídas", String(done)], ["Sessões planejadas", String(sessions.length)], ["Progresso semanal", `${percent}%`]].map(([label, value]) => (
              <article key={label} className="rounded-3xl border border-[#e4e8f2] bg-white p-6">
                <p className="text-sm font-semibold text-[#7180af]">{label}</p>
                <p className="mt-3 text-4xl font-extrabold text-[#174fc9]">{value}</p>
              </article>
            ))}
          </div>
          <section className="mt-6 rounded-3xl border border-[#e4e8f2] bg-white p-6">
            <h2 className="text-xl font-bold text-[#22305b]">Evolução do cronograma</h2>
            <div role="progressbar" aria-label="Progresso semanal" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} className="mt-4 h-4 overflow-hidden rounded-full bg-[#e9eef9]">
              <div className="h-full rounded-full bg-[#3555b6]" style={{ width: `${percent}%` }} />
            </div>
            <p className="mt-3 text-sm text-[#52639c]">Marque as sessões concluídas na tela de cronograma para atualizar este indicador.</p>
          </section>
          <section className="mt-6 rounded-3xl border border-[#e4e8f2] bg-white p-6">
            <h2 className="text-xl font-bold text-[#22305b]">Resultado por disciplina</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {diagnosticSubjects.map((subject) => (
                <div key={subject} className="flex items-center justify-between rounded-xl bg-[#f7f9fe] p-4">
                  <span className="font-semibold text-[#22305b]">{diagnosticSubjectLabels[subject]}</span>
                  <span className="flex items-center gap-1 text-sm text-[#52639c]">
                    {data.results?.[subject] === true ? <><CheckCircle2 className="size-4 text-emerald-600" /> Acerto</> : data.results?.[subject] === false ? "Reforçar" : "Não avaliado"}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </StudyDashboardLayout>
  );
}
