import { ArrowLeft, ArrowRight, ClipboardCheck, Pencil } from "lucide-react";

import { diagnosticAreaLabels } from "@/app/(private)/diagnostico/constants/diagnostic-questions";
import type { DiagnosticQuestion } from "@/app/(private)/diagnostico/types/diagnostic.types";
import { Button } from "@/components/ui/button";

type DiagnosticQuizReviewProps = {
  questions: DiagnosticQuestion[];
  answers: Record<string, string>;
  error: string | null;
  isSubmitting: boolean;
  onEditQuestion: (index: number) => void;
  onBackToQuiz: () => void;
  onSubmit: () => void;
};

export function DiagnosticQuizReview({
  questions,
  answers,
  error,
  isSubmitting,
  onEditQuestion,
  onBackToQuiz,
  onSubmit,
}: DiagnosticQuizReviewProps) {
  return (
    <section className="mx-auto max-w-4xl rounded-[32px] border border-[#e3e7f1] bg-white p-6 sm:p-10">
      <header className="border-b border-[#e8ecf7] pb-7">
        <div className="flex items-center gap-3 text-mentor-blue">
          <ClipboardCheck className="size-6" />
          <span className="text-sm font-bold uppercase tracking-[0.14em]">
            Revisão final
          </span>
        </div>
        <h1 className="mt-3 text-3xl font-extrabold text-[#172052] sm:text-4xl">
          Confira suas respostas
        </h1>
        <p className="mt-3 text-[#657196]">
          Você respondeu {questions.length} questões. Se quiser, altere uma resposta antes de finalizar.
        </p>
        {error && (
          <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        )}
      </header>

      <div className="mt-6 grid gap-3">
        {questions.map((question, index) => (
          <article
            key={question.id}
            className="flex items-center gap-4 rounded-2xl border border-[#e3e7f1] bg-[#fbfcff] px-4 py-4 sm:px-5"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-mentor-blue-soft text-sm font-extrabold text-mentor-blue">
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#7180af]">
                {diagnosticAreaLabels[question.discipline]} · Alternativa {answers[question.id]}
              </p>
              <p className="mt-1 truncate font-semibold text-[#22305b]">
                {question.question}
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onEditQuestion(index)}
              className="h-10 shrink-0 rounded-xl px-3 font-bold text-mentor-blue hover:bg-mentor-blue-soft hover:text-mentor-blue"
            >
              <Pencil className="size-4" />
              <span className="sr-only sm:not-sr-only sm:ml-2">Alterar</span>
            </Button>
          </article>
        ))}
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#e8ecf7] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="button"
          variant="ghost"
          disabled={isSubmitting}
          onClick={onBackToQuiz}
          className="h-12 rounded-[24px] px-5 font-bold text-[#52618c] hover:bg-[#f1f4fb] hover:text-[#22305b]"
        >
          <ArrowLeft className="size-4" />
          Voltar ao quiz
        </Button>
        <Button
          type="button"
          disabled={isSubmitting}
          onClick={onSubmit}
          className="h-12 rounded-[24px] bg-mentor-blue px-6 text-base font-bold text-white hover:bg-mentor-blue-hover"
        >
          {isSubmitting ? "Finalizando..." : "Finalizar diagnóstico"}
          {!isSubmitting && <ArrowRight className="size-4" />}
        </Button>
      </div>
    </section>
  );
}
