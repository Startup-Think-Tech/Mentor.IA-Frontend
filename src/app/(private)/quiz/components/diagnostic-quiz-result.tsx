import { CheckCircle2, CircleX } from "lucide-react";
import Link from "next/link";

import type { DiagnosticoResultado } from "@/app/(private)/diagnostico/types/diagnostico.types";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DiagnosticQuizResultProps = {
  result: DiagnosticoResultado | null;
};

export function DiagnosticQuizResult({ result }: DiagnosticQuizResultProps) {
  return (
    <section className="mx-auto max-w-3xl rounded-[32px] bg-white p-8 shadow-sm sm:p-10">
      <h1 className="text-3xl font-extrabold text-[#22305b]">
        Diagnóstico concluído
      </h1>
      <p className="mt-3 text-[#7180af]">
        Os resultados foram salvos e já podem ser usados na análise de gaps.
      </p>

      <div className="mt-8 grid gap-3">
        {result?.desempenhos.map((performance) => (
          <div
            key={performance.disciplina.id}
            className="flex items-center justify-between rounded-2xl bg-[#f7f8fc] px-5 py-4"
          >
            <span className="font-semibold text-[#22305b]">
              {performance.disciplina.nome}
            </span>

            <span
              className={cn(
                "flex items-center gap-2 text-sm font-bold",
                performance.percentual >= 50 ? "text-emerald-600" : "text-red-500",
              )}
            >
              {performance.percentual >= 50 ? (
                <CheckCircle2 className="size-5" />
              ) : (
                <CircleX className="size-5" />
              )}
              {performance.percentual}% · {performance.acertos} de {performance.totalQuestoes}
            </span>
          </div>
        ))}
      </div>

      <Link
        href="/cronograma"
        className={cn(
          buttonVariants({ size: "lg" }),
          "mt-8 h-12 rounded-[24px] bg-mentor-blue px-6 font-bold text-white hover:bg-mentor-blue-hover",
        )}
      >
        Ver meu cronograma
      </Link>
    </section>
  );
}
