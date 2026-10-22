"use client";

import { Loader2 } from "lucide-react";

import { useDiagnosticQuiz } from "@/app/(private)/diagnostico/hooks/use-diagnostic-quiz";

import { DiagnosticQuizQuestion } from "./diagnostic-quiz-question";
import { DiagnosticQuizResult } from "./diagnostic-quiz-result";
import { DiagnosticQuizReview } from "./diagnostic-quiz-review";

export function DiagnosticQuiz() {
  const quiz = useDiagnosticQuiz();

  if (quiz.isLoading) {
    return (
      <main className="grid min-h-dvh place-items-center bg-[#f6f7fb]">
        <Loader2 className="size-9 animate-spin text-mentor-blue" />
      </main>
    );
  }

  if (quiz.isComplete) {
    return (
      <main className="min-h-dvh bg-[#f6f7fb] px-6 py-12">
        <DiagnosticQuizResult result={quiz.result} />
      </main>
    );
  }

  if ((quiz.error && !quiz.isReviewing) || !quiz.currentQuestion) {
    return (
      <main className="grid min-h-dvh place-items-center bg-[#f6f7fb] px-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-[#22305b]">
            Não foi possível carregar o quiz
          </h1>
          <p className="mt-3 text-[#7180af]">
            {quiz.error ?? "Questão indisponível no momento."}
          </p>
        </div>
      </main>
    );
  }

  if (quiz.isReviewing) {
    return (
      <main className="min-h-dvh bg-[#f6f7fb] px-4 py-8 sm:px-6 lg:py-12">
        <DiagnosticQuizReview
          questions={quiz.questions}
          answers={quiz.answers}
          error={quiz.error}
          isSubmitting={quiz.isSubmitting}
          onEditQuestion={quiz.goToQuestion}
          onBackToQuiz={() => quiz.goToQuestion(quiz.questions.length - 1)}
          onSubmit={quiz.submitAnswers}
        />
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-white px-4 py-8 sm:px-6 lg:py-12">
      <DiagnosticQuizQuestion
        question={quiz.currentQuestion}
        currentIndex={quiz.currentIndex}
        totalQuestions={quiz.questions.length}
        selectedAlternative={quiz.selectedAlternative}
        isSubmitting={quiz.isSubmitting}
        onSelectAlternative={quiz.selectAlternative}
        onPrevious={quiz.goToPreviousQuestion}
        onNext={quiz.goToNextQuestion}
      />
    </main>
  );
}
