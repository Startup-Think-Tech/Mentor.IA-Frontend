import { CheckCircle2, CircleX, Target } from "lucide-react";

import {
  diagnosticSubjectLabels,
} from "@/features/diagnostic/constants/diagnostic-questions";
import type { DiagnosticResults } from "@/features/diagnostic/schemas/diagnostic-results.schema";
import { diagnosticSubjects } from "@/features/diagnostic/types/diagnostic.types";
import { cn } from "@/lib/utils";

type PerformanceSummaryProps = {
  results: DiagnosticResults;
};

export function PerformanceSummary({
  results,
}: PerformanceSummaryProps) {
  const weakSubjects = diagnosticSubjects.filter(
    (subject) => results[subject] === false,
  );

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {diagnosticSubjects.map((subject) => {
          const correct = results[subject] === true;

          return (
            <div
              key={subject}
              className="rounded-2xl border border-[#e4e8f2] bg-white p-4"
            >
              <div className="flex items-center gap-2">
                {correct ? (
                  <CheckCircle2 className="size-5 text-emerald-500" />
                ) : (
                  <CircleX className="size-5 text-rose-500" />
                )}

                <span className="font-bold text-[#22305b]">
                  {diagnosticSubjectLabels[subject]}
                </span>
              </div>

              <p
                className={cn(
                  "mt-2 text-sm font-medium",
                  correct ? "text-emerald-600" : "text-rose-500",
                )}
              >
                {correct ? "Acertou" : "Precisa reforçar"}
              </p>
            </div>
          );
        })}
      </div>
      <div className="flex items-start gap-4 rounded-2xl bg-[#eef4ff] p-5">
        <div className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-[#3555b6]">
          <Target className="size-6" />
        </div>

        <div>
          <h2 className="font-bold text-[#22305b]">
            Foco nas suas dificuldades
          </h2>

          <p className="mt-1 text-sm leading-6 text-[#52639c]">
            {weakSubjects.length
              ? `Vamos priorizar ${weakSubjects
                  .map((subject) => diagnosticSubjectLabels[subject])
                  .join(" e ")} no seu cronograma.`
              : "Seu desempenho foi equilibrado. Vamos distribuir as matérias de forma uniforme."}
          </p>
        </div>
      </div>
    </div>
  );
}
