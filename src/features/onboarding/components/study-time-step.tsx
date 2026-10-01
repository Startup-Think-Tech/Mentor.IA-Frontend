"use client";

import { Clock3 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { studyTimeSchema } from "@/features/onboarding/schemas/study-time.schema";
import { onboardingStorage } from "@/features/onboarding/storage/onboarding.storage";
import {
  studyDurations,
  type StudyDuration,
} from "@/features/onboarding/types/onboarding.types";
import { cn } from "@/lib/utils";

import { OnboardingProgress } from "./onboarding-progress";

const durationLabels: Record<StudyDuration, string> = {
  "30": "30 minutos",
  "60": "1 hora",
  "90": "1 hora e 30 minutos",
  "120": "2 horas",
};

export function StudyTimeStep() {
  const router = useRouter();
  const [selected, setSelected] = useState<StudyDuration | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleContinue() {
    const result = studyTimeSchema.safeParse({ dailyMinutes: selected });

    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Selecione uma opção.");
      return;
    }

    onboardingStorage.saveStudyTime(result.data.dailyMinutes);
    router.push("/onboarding/quiz");
  }

  return (
    <div className="flex min-h-[720px] flex-col justify-between py-3">
      <OnboardingProgress current={3} total={4} />

      <div className="py-8 text-center">
        <div className="mx-auto mb-8 flex size-24 items-center justify-center rounded-full bg-[#eef2fb]">
          <Clock3 className="size-12 text-[#2f55bd]" strokeWidth={1.7} />
        </div>

        <h1 className="mx-auto max-w-[560px] text-3xl font-extrabold leading-tight text-[#2150d9] sm:text-4xl">
          Quanto tempo você tem disponível por dia?
        </h1>

        <p className="mx-auto mt-3 max-w-[460px] text-base leading-7 text-[#52639c]">
          Escolha a opção que melhor se adapta à sua rotina diária.
        </p>

        <div className="mx-auto mt-10 grid max-w-[520px] gap-4">
          {studyDurations.map((duration) => {
            const isSelected = selected === duration;

            return (
              <Button
                key={duration}
                type="button"
                aria-pressed={isSelected}
                onClick={() => {
                  setSelected(duration);
                  setError(null);
                }}
                className={cn(
                  "h-16 justify-start rounded-[30px] border-0 px-5 text-base font-semibold",
                  isSelected
                    ? "bg-[#526fc6] text-white hover:bg-[#4662b8]"
                    : "bg-[#f3eeee] text-[#3154b4] hover:bg-[#ebe4e4]",
                )}
              >

                <span
                  className={cn(
                    "mr-3 size-5 rounded-full border-2",
                    isSelected
                      ? "border-white bg-[#526fc6]"
                      : "border-white bg-transparent",
                  )}
                />
                {durationLabels[duration]}
              </Button>
            );
          })}
        </div>

        {error && (
          <p role="alert" className="mt-4 text-sm font-medium text-destructive">
            {error}
          </p>
        )}
      </div>

      <Button
        type="button"
        onClick={handleContinue}
        className="h-16 w-full rounded-[32px] bg-[#2f55bd] text-lg font-bold text-white hover:bg-[#2448a8]"
      >
        concluir
      </Button>
    </div>
  );
}
