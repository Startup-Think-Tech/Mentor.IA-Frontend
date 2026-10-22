"use client";

import { useEffect, useState } from "react";

import { StudyDashboardEmpty, StudyDashboardLayout } from "@/components/study-dashboard-layout";
import { performanceService } from "@/app/(private)/desempenho/services/performance.service";
import type { Performance, StudySession } from "@/app/(private)/desempenho/types/performance.types";

export function ProgressDashboard() {
  const [performances, setPerformances] = useState<Performance[] | null>(null);
  const [sessions, setSessions] = useState<StudySession[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    Promise.all([performanceService.getCurrent(), performanceService.getSessions()]).then(([nextPerformances, nextSessions]) => { setPerformances(nextPerformances); setSessions(nextSessions); }).catch((caught) => setError(caught instanceof Error ? caught.message : "Não foi possível carregar seu desempenho."));
  }, []);
  const done = sessions?.filter((session) => session.status === "CONCLUIDA").length ?? 0;
  const average = performances?.length ? Math.round(performances.reduce((sum, item) => sum + item.percentual, 0) / performances.length) : 0;
  return <StudyDashboardLayout title="Meu desempenho" subtitle="Acompanhe suas sessões concluídas e resultados persistidos." current="/desempenho">
    {error ? <p role="alert" className="text-destructive">{error}</p> : !performances || !sessions ? <p>Carregando...</p> : performances.length === 0 ? <StudyDashboardEmpty /> : <><div className="grid gap-4 sm:grid-cols-3"><article className="rounded-3xl border border-[#e4e8f2] bg-white p-6"><p className="text-sm font-semibold text-[#7180af]">Sessões concluídas</p><p className="mt-3 text-4xl font-extrabold text-[#174fc9]">{done}</p></article><article className="rounded-3xl border border-[#e4e8f2] bg-white p-6"><p className="text-sm font-semibold text-[#7180af]">Sessões planejadas</p><p className="mt-3 text-4xl font-extrabold text-[#174fc9]">{sessions.length}</p></article><article className="rounded-3xl border border-[#e4e8f2] bg-white p-6"><p className="text-sm font-semibold text-[#7180af]">Média de desempenho</p><p className="mt-3 text-4xl font-extrabold text-[#174fc9]">{average}%</p></article></div><section className="mt-6 rounded-3xl border border-[#e4e8f2] bg-white p-6"><h2 className="text-xl font-bold text-[#22305b]">Resultado por conteúdo</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">{performances.map((item) => <div key={item.id} className="flex items-center justify-between rounded-xl bg-[#f7f9fe] p-4"><span className="font-semibold text-[#22305b]">{item.disciplina.nome} · {item.conteudo.nome}</span><span className="text-sm text-[#52639c]">{item.percentual}%</span></div>)}</div></section></>}
  </StudyDashboardLayout>;
}
