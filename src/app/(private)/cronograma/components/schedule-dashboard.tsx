"use client";

import { useEffect, useState } from "react";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardLoading } from "@/components/dashboard/dashboard-loading";
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

  return (
    <DashboardShell
      title={`Seu cronograma, ${firstName}`}
      subtitle="Plano persistido e adaptado a partir do seu diagnóstico e disponibilidade."
    >
      {error ? (
        <div role="alert" className="rounded-2xl bg-white p-6 text-destructive">
          {error}
        </div>
      ) : !plan ? (
        <DashboardLoading />
      ) : (
        <WeeklySchedule plan={plan} onSessionCompleted={markSessionCompleted} />
      )}
    </DashboardShell>
  );
}
