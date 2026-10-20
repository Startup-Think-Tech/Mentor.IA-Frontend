"use client";

import { CheckCircle2, Circle, Clock3 } from "lucide-react";
import { useEffect, useState } from "react";

import {
  diagnosticSubjectLabels,
} from "@/app/(private)/_shared/diagnostic/constants/diagnostic-questions";
import {
  subjectBadgeClasses,
} from "@/app/(private)/_shared/schedule/constants/schedule.constants";
import type { SchedulePlan } from "@/app/(private)/_shared/schedule/types/schedule.types";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "mentor.ia.completed-study-sessions";

export function WeeklySchedule({ plan }: { plan: SchedulePlan }) {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      if (Array.isArray(stored)) {
        setCompleted(stored.filter((item): item is string => typeof item === "string"));
      }
    } catch {
      setCompleted([]);
    }
  }, []);

  function toggleSession(id: string) {
    setCompleted((previous) => {
      const next = previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  const total = plan.days.reduce((sum, day) => sum + day.sessions.length, 0);
  const done = plan.days.reduce((sum, day) => sum + day.sessions.filter((_, index) => completed.includes(`${day.day}-${index}`)).length, 0);

  return (
    <section>
      <div>
        <h2 className="text-2xl font-extrabold text-[#22305b]">
          Cronograma da semana
        </h2>
        <p className="mt-1 text-sm text-[#7180af]">
          Sessões de 25 minutos distribuídas nos dias que você escolheu.
        </p>
      </div>

      <div className="mt-5 rounded-2xl border border-[#dce5fb] bg-white p-4" aria-live="polite">
        <div className="flex items-center justify-between gap-3 text-sm font-semibold text-[#22305b]">
          <span>Progresso da semana</span>
          <span>{done} de {total} sessões concluídas</span>
        </div>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-[#e9eef9]" role="progressbar" aria-valuenow={done} aria-valuemin={0} aria-valuemax={total} aria-label="Progresso das sessões">
          <div className="h-full rounded-full bg-[#3555b6] transition-all" style={{ width: `${total ? (done / total) * 100 : 0}%` }} />
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {plan.days.map((day) => (
          <article
            key={day.day}
            className="rounded-2xl border border-[#e4e8f2] bg-white p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-[#22305b]">{day.day}</h3>
                <p className="text-xs text-[#8a97bd]">{day.dateLabel}</p>
              </div>

              <span className="text-xs font-semibold text-[#7180af]">
                {day.sessions.reduce(
                  (total, item) => total + item.minutes,
                  0,
                )}{" "}
                min
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {day.sessions.map((session, index) => (
                <div
                  key={`${day.day}-${session.subject}-${index}`}
                  className={cn(
                    "rounded-xl border p-3",
                    subjectBadgeClasses[session.subject],
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-bold uppercase">
                      {diagnosticSubjectLabels[session.subject]}
                    </span>

                    {session.priority === "high" && (
                      <span className="rounded-full bg-white/70 px-2 py-1 text-[10px] font-bold">
                        prioridade
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-sm font-semibold">
                    {session.topic}
                  </p>

                  <div className="mt-3 flex items-center gap-1.5 text-xs">
                    <Clock3 className="size-3.5" />
                    {session.minutes} min
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleSession(`${day.day}-${index}`)}
                    aria-pressed={completed.includes(`${day.day}-${index}`)}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-current/20 bg-white/75 px-3 py-2 text-xs font-bold transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    {completed.includes(`${day.day}-${index}`) ? <CheckCircle2 className="size-4" /> : <Circle className="size-4" />}
                    {completed.includes(`${day.day}-${index}`) ? "Concluído · Desmarcar" : "Marcar como concluído"}
                  </button>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
