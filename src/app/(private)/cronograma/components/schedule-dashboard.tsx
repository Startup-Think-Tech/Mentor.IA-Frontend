"use client";

import { CalendarDays, LayoutDashboard, Target } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useAuthSession } from "@/context/auth-session.context";
import { ApiError } from "@/services/api/client";
import { scheduleService } from "@/app/(private)/cronograma/services/schedule.service";
import type { SchedulePlan } from "@/app/(private)/cronograma/types/schedule.types";

import { WeeklySchedule } from "./weekly-schedule";

export function ScheduleDashboard() {
  const session = useAuthSession();
  const [plan, setPlan] = useState<SchedulePlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function loadPlan() {
      try {
        const current = await scheduleService.getCurrent();
        if (active) setPlan(current);
      } catch (caughtError) {
        if (!(caughtError instanceof ApiError) || caughtError.status !== 404) {
          if (active) setError(caughtError instanceof Error ? caughtError.message : "Não foi possível carregar o cronograma.");
          return;
        }
        try {
          const created = await scheduleService.generate();
          if (active) setPlan(created);
        } catch (generateError) {
          if (active) setError(generateError instanceof Error ? generateError.message : "Não foi possível gerar o cronograma.");
        }
      }
    }
    loadPlan();
    return () => { active = false; };
  }, []);

  function markSessionCompleted(id: string) {
    setPlan((current) => current && {
      ...current,
      sessoes: current.sessoes.map((item) => item.id === id ? { ...item, status: "CONCLUIDA" } : item),
    });
  }

  const firstName = session.user.name.trim().split(/\s+/)[0];

  return <main className="min-h-dvh bg-[#f5f7fb]">
    <div className="grid min-h-dvh lg:grid-cols-[240px_1fr]">
      <aside className="hidden bg-mentor-blue px-6 py-8 text-white lg:flex lg:flex-col">
        <div className="text-2xl font-extrabold">Mentor<span className="text-[#ffd55a]">.ia</span></div>
        <nav className="mt-12 space-y-2">
          <div className="flex items-center gap-3 rounded-2xl bg-white/15 px-4 py-3 font-semibold"><CalendarDays className="size-5" />Cronograma</div>
          <Link href="/gaps" className="flex items-center gap-3 rounded-2xl px-4 py-3 text-white/75 transition hover:bg-white/15"><Target className="size-5" />Gaps</Link>
          <Link href="/desempenho" className="flex items-center gap-3 rounded-2xl px-4 py-3 text-white/75 transition hover:bg-white/15"><LayoutDashboard className="size-5" />Desempenho</Link>
        </nav>
      </aside>
      <div className="p-4 sm:p-6 xl:p-8"><div className="mx-auto max-w-[1500px]">
        <header className="mb-6"><p className="text-sm font-semibold text-[#7180af]">Plano personalizado</p><h1 className="mt-1 text-3xl font-extrabold tracking-tight text-[#172052] sm:text-4xl">Seu cronograma, {firstName}</h1><p className="mt-2 max-w-3xl text-[#52639c]">Plano persistido e adaptado a partir do seu diagnóstico e disponibilidade.</p></header>
        {error ? <div role="alert" className="rounded-2xl bg-white p-6 text-destructive">{error}</div> : !plan ? <div className="grid min-h-80 place-items-center"><div className="size-10 animate-spin rounded-full border-4 border-mentor-blue-pale border-t-mentor-blue" /></div> : <WeeklySchedule plan={plan} onSessionCompleted={markSessionCompleted} />}
      </div></div>
    </div>
  </main>;
}
