import { Clock3 } from "lucide-react";

import {
  diagnosticSubjectLabels,
} from "@/features/diagnostic/constants/diagnostic-questions";
import {
  subjectBadgeClasses,
} from "@/features/schedule/constants/schedule.constants";
import type { SchedulePlan } from "@/features/schedule/types/schedule.types";
import { cn } from "@/lib/utils";

export function WeeklySchedule({ plan }: { plan: SchedulePlan }) {
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
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
