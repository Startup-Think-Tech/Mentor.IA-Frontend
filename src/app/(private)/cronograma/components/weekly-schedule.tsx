"use client";

import { CheckCircle2, Circle, Clock3 } from "lucide-react";
import { useState } from "react";

import { scheduleService } from "@/app/(private)/cronograma/services/schedule.service";
import type { WeeklyScheduleProps } from "@/app/(private)/cronograma/types/schedule.types";
import { cn } from "@/lib/utils";

export function WeeklySchedule({ plan, onSessionCompleted }: WeeklyScheduleProps) {
  const [pendingSessionId, setPendingSessionId] = useState<string | null>(null);
  const sessionsByDate = Map.groupBy(plan.sessoes, (session) =>
    new Date(session.agendadoPara).toLocaleDateString("pt-BR", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
    }),
  );
  const total = plan.sessoes.length;
  const done = plan.sessoes.filter((session) => session.status === "CONCLUIDA").length;

  async function completeSession(id: string) {
    setPendingSessionId(id);
    try {
      await scheduleService.completeSession(id);
      onSessionCompleted(id);
    } finally {
      setPendingSessionId(null);
    }
  }

  return (
    <section>
      <div>
        <h2 className="text-2xl font-extrabold text-[#22305b]">Cronograma</h2>
        <p className="mt-1 text-sm text-[#7180af]">Sessões planejadas a partir dos seus gaps e disponibilidade.</p>
      </div>
      <div className="mt-5 rounded-2xl border border-[#dce5fb] bg-white p-4">
        <div className="flex items-center justify-between gap-3 text-sm font-semibold text-[#22305b]">
          <span>Progresso</span><span>{done} de {total} sessões concluídas</span>
        </div>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-[#e9eef9]" role="progressbar" aria-valuenow={done} aria-valuemin={0} aria-valuemax={total}>
          <div className="h-full rounded-full bg-[#3555b6] transition-all" style={{ width: `${total ? (done / total) * 100 : 0}%` }} />
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[...sessionsByDate].map(([date, sessions]) => (
          <article key={date} className="rounded-2xl border border-[#e4e8f2] bg-white p-4">
            <h3 className="font-extrabold capitalize text-[#22305b]">{date}</h3>
            <div className="mt-4 space-y-3">
              {sessions?.map((session) => {
                const completed = session.status === "CONCLUIDA";
                return <div key={session.id} className={cn("rounded-xl border p-3", completed ? "border-emerald-100 bg-emerald-50" : "border-blue-100 bg-blue-50")}>
                  <p className="text-xs font-bold uppercase">{session.disciplina.nome}</p>
                  <p className="mt-2 text-sm font-semibold">{session.conteudo.nome}</p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs"><Clock3 className="size-3.5" />{session.duracaoMinutos} min</div>
                  <button type="button" disabled={completed || pendingSessionId === session.id} onClick={() => void completeSession(session.id)} className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-current/20 bg-white/75 px-3 py-2 text-xs font-bold disabled:cursor-not-allowed disabled:opacity-60">
                    {completed ? <CheckCircle2 className="size-4" /> : <Circle className="size-4" />}
                    {completed ? "Concluída" : pendingSessionId === session.id ? "Salvando..." : "Marcar como concluída"}
                  </button>
                </div>;
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
