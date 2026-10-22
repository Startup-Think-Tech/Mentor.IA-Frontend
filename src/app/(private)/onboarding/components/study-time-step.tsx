"use client";

import { Clock3 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { studyTimeSchema } from "@/app/(private)/onboarding/schemas/study-time.schema";
import { onboardingStorage } from "@/app/(private)/onboarding/storage/onboarding.storage";
import { availabilityService } from "@/app/(private)/onboarding/services/availability.service";
import {
  studyDays,
  studyDayToWeekDay,
  studyDurations,
  toStudyDays,
  type StudyDuration,
} from "@/app/(private)/onboarding/types/onboarding.types";
import { cn } from "@/lib/utils";

import { OnboardingProgress } from "./onboarding-progress";
import { OnboardingOptionIndicator } from "./onboarding-option-indicator";
import { OnboardingPrimaryButton } from "./onboarding-primary-button";
import { OnboardingStepActions } from "./onboarding-step-actions";

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
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadAvailability() {
      const draft = onboardingStorage.getDraft();
      if (draft.dailyMinutes) {
        setSelected(draft.dailyMinutes);
      }

      try {
        const disponibilidades = await availabilityService.getMine();
        if (!active) return;

        const savedDays = toStudyDays(disponibilidades);
        const savedMinutes = Math.max(
          0,
          ...disponibilidades.map(({ minutosDisponiveis }) => minutosDisponiveis),
        );

        if (draft.studyDays.length === 0 && savedDays.length > 0) {
          onboardingStorage.saveStudyDays(savedDays);
        }
        if (!draft.dailyMinutes && studyDurations.includes(String(savedMinutes) as StudyDuration)) {
          setSelected(String(savedMinutes) as StudyDuration);
        }
      } catch (caughtError) {
        if (active) {
          setLoadError(
            caughtError instanceof Error
              ? caughtError.message
              : "Não foi possível carregar sua disponibilidade.",
          );
        }
      } finally {
        if (active) setIsLoading(false);
      }
    }

    loadAvailability();
    return () => {
      active = false;
    };
  }, []);

  async function handleContinue() {
    const result = studyTimeSchema.safeParse({ dailyMinutes: selected });

    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Selecione uma opção.");
      return;
    }

    const draft = onboardingStorage.getDraft();
    if (draft.studyDays.length === 0) {
      setError("Volte e selecione pelo menos um dia para estudar.");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      await availabilityService.replaceMine(
        studyDays.map((day) => ({
          diaSemana: studyDayToWeekDay[day],
          minutosDisponiveis: draft.studyDays.includes(day)
            ? Number(result.data.dailyMinutes)
            : 0,
        })),
      );
      onboardingStorage.saveStudyTime(result.data.dailyMinutes);
      //toast.success("Disponibilidade salva com sucesso.");
      router.push("/onboarding/quiz");
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Não foi possível salvar sua disponibilidade.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="flex min-h-[720px] flex-col justify-between py-3">
      <OnboardingProgress current={3} total={4} />

      <div className="py-8 text-center">
        {isLoading && (
          <p role="status" className="mb-6 text-sm font-medium text-[#52639c]">
            Carregando sua disponibilidade...
          </p>
        )}
        {loadError && (
          <p role="alert" className="mx-auto mb-6 max-w-[520px] text-sm font-medium text-destructive">
            {loadError} Você ainda pode ajustar e tentar salvar novamente.
          </p>
        )}
        <div className="relative mx-auto mb-8 grid size-44 place-items-center rounded-full bg-mentor-blue-soft sm:size-48">
          <div className="absolute inset-3 rounded-full border border-mentor-blue/15" />
          <Clock3 className="relative z-10 size-24 text-mentor-blue" strokeWidth={1.5} />
        </div>

        <h1 className="mx-auto max-w-[560px] text-3xl font-extrabold leading-tight text-mentor-blue sm:text-4xl">
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
                disabled={isLoading || isSaving}
                onClick={() => {
                  setSelected(duration);
                  setError(null);
                }}
                className={cn(
                  "h-16 cursor-pointer justify-start rounded-[30px] border-0 px-5 text-base font-semibold disabled:cursor-not-allowed",
                  isSelected
                    ? "bg-mentor-blue text-white hover:bg-mentor-blue-hover"
                    : "bg-[#f3eeee] text-mentor-blue hover:bg-mentor-blue-soft",
                )}
              >

                <OnboardingOptionIndicator selected={isSelected} />
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

      <OnboardingStepActions onBack={() => router.push("/onboarding/dias")}>
        <OnboardingPrimaryButton
          label={isSaving ? "Salvando..." : "Concluir"}
          onClick={handleContinue}
          disabled={isLoading || isSaving}
        />
      </OnboardingStepActions>
    </div>
  );
}
