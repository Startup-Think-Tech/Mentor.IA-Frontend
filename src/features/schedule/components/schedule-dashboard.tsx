"use client";

import { CalendarDays, LayoutDashboard, Target } from "lucide-react";
import { useEffect, useState } from "react";

import { useAuthSession } from "@/features/auth/context/auth-session.context";
import type { DiagnosticResults } from "@/features/diagnostic/schemas/diagnostic-results.schema";
import { diagnosticStorage } from "@/features/diagnostic/storage/diagnostic.storage";
import type { OnboardingDraft } from "@/features/onboarding/types/onboarding.types";
import { onboardingStorage } from "@/features/onboarding/storage/onboarding.storage";
import { scheduleService } from "@/features/schedule/services/schedule.service";
import type { SchedulePlan } from "@/features/schedule/types/schedule.types";

import { PerformanceSummary } from "./performance-summary";
import { StudyCalendar } from "./study-calendar";
import { WeeklySchedule } from "./weekly-schedule";

type ScheduleState = {
  draft: OnboardingDraft | null;
  results: DiagnosticResults | null;
  plan: SchedulePlan | null;
  referenceDate: Date | null;
};

const initialState: ScheduleState = {
  draft: null,
  results: null,
  plan: null,
  referenceDate: null,
};

export function ScheduleDashboard() {
  const session = useAuthSession();
  const [state, setState] = useState<ScheduleState>(initialState);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const draft = onboardingStorage.getDraft();
      const results = diagnosticStorage.getResults();
      const plan = scheduleService.buildSchedulePlan(draft, results);

      setState({
        draft,
        results,
        plan,
        referenceDate: new Date(),
      });
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  if (!state.draft || !state.results || !state.plan || !state.referenceDate) {
    return (
      <main className="grid min-h-dvh place-items-center bg-[#f6f7fb]">
        <div className="size-10 animate-spin rounded-full border-4 border-[#dbe5ff] border-t-[#3555b6]" />
      </main>
    );
  }

  const firstName = session.user.name.trim().split(/\s+/)[0];

  return (
    <main className="min-h-dvh bg-[#f5f7fb]">
      <div className="grid min-h-dvh lg:grid-cols-[240px_1fr]">
        <aside className="hidden bg-[#174fc9] px-6 py-8 text-white lg:flex lg:flex-col">
          <div className="text-2xl font-extrabold">
            Mentor<span className="text-[#ffd55a]">.ia</span>
          </div>

          <nav className="mt-12 space-y-2">
            <div className="flex items-center gap-3 rounded-2xl bg-white/15 px-4 py-3 font-semibold">
              <CalendarDays className="size-5" />
              Cronograma
            </div>
            <div className="flex items-center gap-3 px-4 py-3 text-white/75">
              <Target className="size-5" />
              Gaps
            </div>
            <div className="flex items-center gap-3 px-4 py-3 text-white/75">
              <LayoutDashboard className="size-5" />
              Desempenho
            </div>
          </nav>

          <div className="mt-auto rounded-3xl bg-white/10 p-5">
            <p className="font-bold">Continue firme!</p>
            <p className="mt-2 text-sm leading-6 text-white/75">
              Estudar um pouco todos os dias faz grandes resultados.
            </p>
          </div>
        </aside>

        <div className="p-4 sm:p-6 xl:p-8">
          <div className="mx-auto max-w-[1500px]">
            <header className="mb-6">
              <p className="text-sm font-semibold text-[#7180af]">
                Plano personalizado
              </p>
              <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-[#172052] sm:text-4xl">
                Seu cronograma está pronto, {firstName}!
              </h1>
              <p className="mt-2 max-w-3xl text-[#52639c]">
                Montamos sua rotina com base no diagnóstico, nos dias disponíveis
                e no tempo diário escolhido durante o onboarding.
              </p>
            </header>

            <div className="grid gap-6 2xl:grid-cols-[1fr_340px]">
              <div className="space-y-8">
                <PerformanceSummary results={state.results} />

                <div className="rounded-2xl bg-[#eef4ff] p-5">
                  <p className="font-bold text-[#22305b]">Carga diária planejada</p>
                  <p className="mt-1 text-sm text-[#52639c]">
                    Até {state.plan.dailyMinutes} minutos por dia, priorizando as
                    matérias com maior necessidade de reforço.
                  </p>
                </div>

                <WeeklySchedule plan={state.plan} />
              </div>

              <div className="space-y-6">
                <StudyCalendar
                  studyDays={state.draft.studyDays}
                  referenceDate={state.referenceDate}
                />

                <div className="rounded-[28px] border border-[#e4e8f2] bg-white p-5">
                  <p className="text-sm font-semibold text-[#7180af]">Estratégia do plano</p>
                  <p className="mt-2 text-lg font-extrabold text-[#22305b]">
                    Reforçar dificuldades sem abandonar as matérias dominadas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}