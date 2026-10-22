import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

import type { DiagnosticoResultado } from "@/app/(private)/diagnostico/types/diagnostico.types";
import { cn } from "@/lib/utils";

type DiagnosticQuizResultProps = {
  result: DiagnosticoResultado | null;
};

export function DiagnosticQuizResult({ result }: DiagnosticQuizResultProps) {
  const percentualGeral = result?.percentualGeral ?? 0;
  const totalAcertos = result?.totalAcertos ?? 0;
  const totalQuestoes = result?.totalQuestoes ?? 0;

  return (
    <section className="mx-auto max-w-3xl rounded-[32px] border border-[#e3e7f1] bg-white p-6 shadow-sm sm:p-10">
      <header className="flex flex-col gap-5 border-b border-[#e8ecf7] pb-7 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-bold text-mentor-blue">
            <CheckCircle2 className="size-5" />
            Diagnóstico concluído
          </div>
          <h1 className="mt-3 text-3xl font-extrabold text-[#22305b]">
            Seu resultado está pronto
          </h1>
          <p className="mt-2 max-w-lg text-[#7180af]">
            Seus desempenhos foram salvos e já podem orientar a análise de gaps.
          </p>
        </div>

        <div className="rounded-2xl bg-mentor-blue-soft px-5 py-3 text-center sm:min-w-32">
          <strong className="block text-2xl font-extrabold text-mentor-blue">
            {percentualGeral}%
          </strong>
          <span className="text-xs font-semibold text-[#52618c]">acerto geral</span>
        </div>
      </header>

      <section className="mt-7">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-extrabold text-[#22305b]">Desempenho por área</h2>
          <span className="text-sm font-semibold text-[#7180af]">
            {totalAcertos} de {totalQuestoes} acertos
          </span>
        </div>

        <div className="mt-4 grid gap-3">
          {result?.desempenhos.map((performance) => (
            <article
              key={performance.disciplina.id}
              className="rounded-2xl border border-[#e8ecf7] bg-[#f9faff] px-4 py-4 sm:px-5"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="font-bold text-[#22305b]">{performance.disciplina.nome}</p>
                <p className="shrink-0 text-sm font-extrabold text-mentor-blue">
                  {performance.percentual}%
                </p>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#e5eaf7]">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      performance.percentual >= 50 ? "bg-[#38c7cf]" : "bg-mentor-blue",
                    )}
                    style={{ width: `${performance.percentual}%` }}
                  />
                </div>
                <span className="shrink-0 text-sm font-medium text-[#7180af]">
                  {performance.acertos} de {performance.totalQuestoes}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Link
        href="/cronograma"
        className="mt-8 inline-flex h-12 items-center gap-2 rounded-[24px] bg-mentor-blue px-6 text-sm font-bold text-white transition-colors hover:bg-mentor-blue-hover"
      >
        Ver meu cronograma
        <ArrowRight className="size-4" />
      </Link>
    </section>
  );
}
