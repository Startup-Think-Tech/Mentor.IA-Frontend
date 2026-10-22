"use client";

import { useEffect, useState } from "react";

import { StudyDashboardEmpty, StudyDashboardLayout } from "@/components/study-dashboard-layout";
import { gapsService } from "@/app/(private)/gaps/services/gaps.service";
import type { Gap } from "@/app/(private)/gaps/types/gap.types";

export function GapsDashboard() {
  const [gaps, setGaps] = useState<Gap[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    gapsService.getCurrent().then(setGaps).catch((caught) => setError(caught instanceof Error ? caught.message : "Não foi possível carregar seus gaps."));
  }, []);
  return <StudyDashboardLayout title="Gaps de aprendizagem" subtitle="Prioridades calculadas a partir do seu desempenho." current="/gaps">
    {error ? <p role="alert" className="text-destructive">{error}</p> : !gaps ? <p>Carregando...</p> : gaps.length === 0 ? <StudyDashboardEmpty /> : <div className="grid gap-5 md:grid-cols-2">
      {gaps.map((gap) => <article key={gap.id} className="rounded-3xl border border-[#e4e8f2] bg-white p-6"><div className="flex items-center justify-between gap-3"><h2 className="text-xl font-bold text-[#22305b]">{gap.disciplina.nome}</h2><span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700">{gap.nivelPrioridade}</span></div><p className="mt-2 font-semibold text-[#52639c]">{gap.conteudo.nome}</p><p className="mt-4 text-sm text-[#52639c]">Desempenho: {gap.desempenho}% · Gap: {gap.pontuacaoGap}%</p></article>)}
    </div>}
  </StudyDashboardLayout>;
}
