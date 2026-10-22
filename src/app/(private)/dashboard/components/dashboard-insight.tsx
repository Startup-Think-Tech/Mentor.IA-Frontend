import { Brain, Loader2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { DashboardInsight } from "@/app/(private)/dashboard/types/insight.types";

type DashboardInsightProps = {
  insight: DashboardInsight | null;
  status: "idle" | "loading" | "generating" | "waiting" | "failed";
};

export function DashboardInsight({ insight, status }: DashboardInsightProps) {
  if (status === "failed") return null;

  return (
    <section className="rounded-3xl border border-[#d9e9f6] bg-[#f5faff] p-6">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-2xl bg-mentor-blue text-white">
          <Brain className="size-5" />
        </span>
        <div>
          <p className="text-sm font-bold text-mentor-blue">Orientação do Mentor.ia</p>
          <p className="text-sm text-[#7180af]">Uma leitura prática do seu momento.</p>
        </div>
      </div>

      {insight ? (
        <>
          <p className="mt-5 leading-7 text-[#35446f]">{insight.conteudo}</p>
          {insight.disciplinas.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {insight.disciplinas.map((disciplina) => (
                <Badge key={disciplina.id} variant="secondary">
                  {disciplina.nome}
                </Badge>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="mt-5">
          {status === "generating" && (
            <p className="mb-3 flex items-center gap-2 text-sm font-medium text-[#52639c]">
              <Loader2 className="size-4 animate-spin text-mentor-blue" />
              Preparando uma orientação com base no seu diagnóstico.
            </p>
          )}
          {status === "waiting" && (
            <p className="mb-3 flex items-center gap-2 text-sm font-medium text-[#52639c]">
              <Loader2 className="size-4 animate-spin text-mentor-blue" />
              Aguardando a orientação que já está sendo preparada para você.
            </p>
          )}
          <Skeleton className="h-4 w-full bg-[#dce9f5]" />
          <Skeleton className="mt-3 h-4 w-4/5 bg-[#dce9f5]" />
        </div>
      )}
    </section>
  );
}
