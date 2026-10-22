import { Check, Circle, Loader2, Sparkles } from "lucide-react";

type DiagnosticQuizValidationProps = {
  totalQuestions: number;
  phase: "answers" | "result" | "complete" | null;
};

const steps = [
  {
    id: "answers",
    title: "Conferindo suas respostas",
    description: "Validando as alternativas marcadas nas questões do ENEM.",
  },
  {
    id: "result",
    title: "Calculando seu desempenho",
    description: "Organizando os resultados por área e identificando prioridades.",
  },
] as const;

export function DiagnosticQuizValidation({
  totalQuestions,
  phase,
}: DiagnosticQuizValidationProps) {
  const activeStep = phase === "complete" ? steps.length : phase === "result" ? 1 : 0;
  const isComplete = phase === "complete";

  return (
    <section className="mx-auto max-w-2xl rounded-[32px] border border-[#e3e7f1] bg-white p-7 shadow-sm sm:p-10">
      <div className="grid size-12 place-items-center rounded-2xl bg-mentor-blue-soft text-mentor-blue">
        <Sparkles className="size-6" />
      </div>
      <p className="mt-6 text-sm font-bold uppercase tracking-[0.12em] text-mentor-blue">
        {isComplete ? "Tudo pronto" : "Quase lá"}
      </p>
      <h1 className="mt-2 text-3xl font-extrabold text-[#172052]">
        {isComplete ? "Abrindo sua visão geral" : "Validando seu diagnóstico"}
      </h1>
      <p className="mt-3 text-[#657196]">
        {isComplete
          ? "Seu desempenho foi calculado e suas prioridades já estão prontas."
          : `Estamos processando suas ${totalQuestions} respostas para preparar um retrato fiel do seu momento.`}
      </p>

      <div className="mt-8 space-y-4">
        {steps.map((step, index) => {
          const isStepComplete = index < activeStep;
          const isActive = index === activeStep;

          return (
            <div
              key={step.id}
              className="flex gap-4 rounded-2xl border border-[#e8ecf7] bg-[#fbfcff] p-4"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-mentor-blue shadow-sm">
                {isStepComplete ? (
                  <Check className="size-5" />
                ) : isActive ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <Circle className="size-5 text-[#b6c0dc]" />
                )}
              </span>
              <div>
                <p className="font-bold text-[#22305b]">{step.title}</p>
                <p className="mt-1 text-sm leading-5 text-[#7180af]">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
