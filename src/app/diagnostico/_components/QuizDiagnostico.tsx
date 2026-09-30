"use client";

import Link from "next/link";
import { Check, ChevronLeft, ChevronRight, RotateCcw, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import type { QuizAlternative, QuizQuestion } from "@/types/quiz";

type QuizDiagnosticoProps = {
  questions: QuizQuestion[];
};

export function QuizDiagnostico({ questions }: QuizDiagnosticoProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, QuizAlternative["letter"]>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [finished, setFinished] = useState(false);

  const current = questions[currentIndex];
  const selected = current ? answers[current.id] : undefined;
  const isRevealed = current ? Boolean(revealed[current.id]) : false;

  const score = useMemo(
    () =>
      questions.reduce(
        (total, question) =>
          total + (answers[question.id] === question.correctAlternative ? 1 : 0),
        0,
      ),
    [answers, questions],
  );

  if (!current) return null;
  const progress = Math.round(((currentIndex + 1) / questions.length) * 100);

  function selectAlternative(letter: QuizAlternative["letter"]) {
    if (isRevealed) return;

    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [current.id]: letter,
    }));
  }

  function confirmOrAdvance() {
    if (!selected) return;

    if (!isRevealed) {
      setRevealed((currentRevealed) => ({
        ...currentRevealed,
        [current.id]: true,
      }));
      return;
    }

    if (currentIndex === questions.length - 1) {
      setFinished(true);
      return;
    }

    setCurrentIndex((index) => index + 1);
  }

  function goBack() {
    if (currentIndex === 0) return;
    setCurrentIndex((index) => index - 1);
  }

  function restart() {
    setAnswers({});
    setRevealed({});
    setCurrentIndex(0);
    setFinished(false);
  }
  if (finished) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-[#eef1f5] p-2 sm:p-6">
        <section className="w-full max-w-[430px] rounded-[24px] bg-white px-7 py-10 text-center shadow-sm">
          <div className="mx-auto grid size-14 place-items-center rounded-full bg-[#eef2ff] text-[#3452c7]">
            <Check className="size-7" strokeWidth={2.5} />
          </div>

          <h1 className="mt-5 text-2xl font-extrabold tracking-[-0.03em] text-[#182033]">
            Diagnóstico concluído
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#65728a]">
            Você acertou <strong>{score}</strong> de{" "}
            <strong>{questions.length}</strong> questões.
          </p>

          <button
            type="button"
            onClick={restart}
            className="mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[16px] bg-[#3452c7] text-sm font-bold text-white transition hover:bg-[#2d47ae]"
          >
            <RotateCcw className="size-4" />
            Refazer diagnóstico
          </button>

          <Link
            href="/"
            className="mt-4 inline-block text-xs font-semibold text-[#3452c7] underline underline-offset-2"
          >
            Voltar ao início
          </Link>
        </section>
      </main>
    );
  }
  return (
    <main className="min-h-dvh bg-[#eef1f5] p-1.5 sm:flex sm:items-center sm:justify-center sm:p-6">
      <section className="mx-auto flex min-h-[calc(100dvh-12px)] w-full max-w-[430px] flex-col bg-white px-7 pb-5 pt-5 text-[#182033] sm:min-h-[760px] sm:rounded-[2px] sm:shadow-sm">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={goBack}
            disabled={currentIndex === 0}
            aria-label="Voltar para a questão anterior"
            className="inline-flex size-8 items-center justify-center rounded-full text-[#42566f] transition hover:bg-slate-100 disabled:opacity-30"
          >
            <ChevronLeft className="size-6" strokeWidth={2} />
          </button>

          <h1 className="text-base font-extrabold tracking-[-0.02em]">
            Quiz Diagnóstico
          </h1>

          <div className="grid size-8 place-items-center rounded-full text-[#8aa0bd]">
            <span className="text-sm font-bold">◷</span>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-[#65728a]">
              Questão {String(currentIndex + 1).padStart(2, "0")} de{" "}
              {String(questions.length).padStart(2, "0")}
            </span>
            <span className="font-extrabold text-[#3452c7]">{progress}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#eef1f5]">
            <div
              className="h-full rounded-full bg-[#3452c7] transition-all"
              style={{ width: progress + "%" }}
            />
          </div>
        </div>

        <div className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#eef2ff] px-3 py-1.5 text-xs font-semibold text-[#2f479c]">
          <Sparkles className="size-3.5 text-[#3452c7]" />
          <span>
            {current.subject} • {current.topic}
          </span>
        </div>

        <h2 className="mt-5 text-[1.28rem] font-extrabold leading-[1.35] tracking-[-0.03em]">
          {current.title}
        </h2>

        {current.context ? (
          <div className="mt-5 rounded-[18px] border border-[#e3e8ef] bg-[#f8fafc] px-4 py-4">
            <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[#99a6ba]">
              Contexto
            </p>
            <p className="mt-1 text-sm leading-5 text-[#43506a]">
              {current.context}
            </p>
          </div>
        ) : null}
        <div className="mt-6 space-y-3">
          {current.alternatives.map((alternative) => {
            const isSelected = selected === alternative.letter;
            const isCorrect =
              isRevealed && alternative.letter === current.correctAlternative;
            const isWrong = isRevealed && isSelected && !isCorrect;

            return (
              <button
                type="button"
                key={alternative.letter}
                onClick={() => selectAlternative(alternative.letter)}
                className={cn(
                  "flex min-h-14 w-full items-center gap-3 rounded-[17px] border px-4 py-3 text-left transition",
                  isCorrect &&
                    "border-emerald-500 bg-emerald-50 text-emerald-800",
                  isWrong && "border-rose-400 bg-rose-50 text-rose-800",
                  isSelected &&
                    !isRevealed &&
                    "border-[#3452c7] bg-[#3452c7] text-white",
                  !isSelected &&
                    !isCorrect &&
                    "border-[#dfe5ed] bg-white text-[#243650] hover:border-[#b9c5d6]",
                )}
              >
                <span
                  className={cn(
                    "grid size-5 shrink-0 place-items-center rounded-full border-2 text-[0.65rem] font-bold",
                    isSelected || isCorrect
                      ? "border-current"
                      : "border-[#cdd8e6] text-[#7f90aa]",
                  )}
                >
                  {isCorrect ? "✓" : isSelected ? "•" : ""}
                </span>
                <span className="text-sm font-semibold">
                  <span className="mr-2 opacity-75">
                    {alternative.letter})
                  </span>
                  {alternative.text}
                </span>
              </button>
            );
          })}
        </div>

        {isRevealed ? (
          <div
            className={cn(
              "mt-5 rounded-[16px] border px-4 py-3 text-sm",
              selected === current.correctAlternative
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-amber-200 bg-amber-50 text-amber-900",
            )}
          >
            <p className="font-extrabold">
              {selected === current.correctAlternative
                ? "Resposta correta!"
                : "Confira o gabarito"}
            </p>
            <p className="mt-1 text-xs leading-5">
              Gabarito:{" "}
              <strong>
                {current.correctAlternative}){" "}
                {
                  current.alternatives.find(
                    (item) => item.letter === current.correctAlternative,
                  )?.text
                }
              </strong>
            </p>
          </div>
        ) : null}
        <div className="mt-auto grid grid-cols-[104px_1fr] gap-3 border-t border-[#edf0f4] pt-6">
          <button
            type="button"
            onClick={goBack}
            disabled={currentIndex === 0}
            className="inline-flex h-12 items-center justify-center gap-1.5 rounded-[15px] bg-[#f3f6fa] text-sm font-bold text-[#3d4c63] transition hover:bg-[#e9eef5] disabled:opacity-40"
          >
            <ChevronLeft className="size-4" />
            Voltar
          </button>

          <button
            type="button"
            onClick={confirmOrAdvance}
            disabled={!selected}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-[15px] bg-[#3452c7] px-4 text-sm font-extrabold text-white shadow-[0_8px_18px_rgba(52,82,199,0.18)] transition hover:bg-[#2d47ae] disabled:cursor-not-allowed disabled:opacity-45"
          >
            {isRevealed
              ? currentIndex === questions.length - 1
                ? "Ver resultado"
                : "Próxima questão"
              : "Confirmar resposta"}
            <ChevronRight className="size-4" />
          </button>
        </div>
      </section>
    </main>
  );
}
