"use client";

import { diagnosticSubjectLabels } from "@/app/(private)/diagnostico/constants/diagnostic-questions";
import { subjectTopics } from "@/app/(private)/cronograma/constants/schedule.constants";
import { StudyDashboardEmpty, StudyDashboardLayout } from "@/components/study-dashboard-layout";
import { useStudyData } from "@/hooks/use-study-data";
import { diagnosticSubjects } from "@/app/(private)/diagnostico/types/diagnostic.types";

export function GapsDashboard() {
  const data = useStudyData();

  return (
    <StudyDashboardLayout
      title="Gaps de aprendizagem"
      subtitle="Identifique os assuntos que merecem mais atenção no seu plano de estudos."
      current="/gaps"
    >
      {!data ? <p>Carregando...</p> : !data.results || !data.plan ? <StudyDashboardEmpty /> : (
        <div className="grid gap-5 md:grid-cols-2">
          {diagnosticSubjects.map((subject) => {
            const result = data.results?.[subject];

            return (
              <article key={subject} className="rounded-3xl border border-[#e4e8f2] bg-white p-6">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-bold text-[#22305b]">{diagnosticSubjectLabels[subject]}</h2>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${result === false ? "bg-rose-100 text-rose-700" : result === true ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                    {result === false ? "Prioridade alta" : result === true ? "Bom desempenho" : "Não avaliado"}
                  </span>
                </div>
                <p className="mt-3 text-sm text-[#52639c]">
                  {result === false ? "Reserve mais sessões para reforçar esta matéria." : result === true ? "Continue revisando para manter seu resultado." : "Faça o diagnóstico para identificar suas dificuldades."}
                </p>
                <h3 className="mt-5 font-semibold text-[#22305b]">Sugestões de revisão</h3>
                <ul className="mt-2 space-y-2 text-sm text-[#52639c]">
                  {subjectTopics[subject].slice(0, 3).map((topic) => <li key={topic}>• {topic}</li>)}
                </ul>
              </article>
            );
          })}
        </div>
      )}
    </StudyDashboardLayout>
  );
}
