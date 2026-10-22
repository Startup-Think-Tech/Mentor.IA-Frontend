"use client";

import { CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { studyDaysSchema } from "@/app/(private)/onboarding/schemas/study-days.schema";
import { onboardingStorage } from "@/app/(private)/onboarding/storage/onboarding.storage";
import { availabilityService } from "@/app/(private)/onboarding/services/availability.service";
import {
  studyDays,
  toStudyDays,
  type StudyDay,
} from "@/app/(private)/onboarding/types/onboarding.types";
import { cn } from "@/lib/utils";

import { OnboardingProgress } from "./onboarding-progress";
import { OnboardingOptionIndicator } from "./onboarding-option-indicator";
import { OnboardingPrimaryButton } from "./onboarding-primary-button";
import { OnboardingStepActions } from "./onboarding-step-actions";

export function StudyDaysStep() {
  const router = useRouter();
  const [selectedDays, setSelectedDays] = useState<StudyDay[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function loadAvailability() {
    setIsLoading(true);
    setLoadError(null);

    try {
      const disponibilidades = await availabilityService.getMine();
      const savedDays = toStudyDays(disponibilidades);
      setSelectedDays(savedDays);

      if (savedDays.length > 0) {
        onboardingStorage.saveStudyDays(savedDays);
      }
    } catch (caughtError) {
      setLoadError(
        caughtError instanceof Error
          ? caughtError.message
          : "Não foi possível carregar sua disponibilidade.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let active = true;

    async function loadInitialAvailability() {
      try {
        const disponibilidades = await availabilityService.getMine();
        const savedDays = toStudyDays(disponibilidades);

        if (!active) return;

        setSelectedDays(savedDays);
        if (savedDays.length > 0) {
          onboardingStorage.saveStudyDays(savedDays);
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

    loadInitialAvailability();

    return () => {
      active = false;
    };
  }, []);

  function toggleDay(day: StudyDay) {
    setError(null);
    setSelectedDays((current) =>
      current.includes(day)
        ? current.filter((item) => item !== day)
        : [...current, day],
    );
  }

  function handleContinue() {
    const result = studyDaysSchema.safeParse({ studyDays: selectedDays });

    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Selecione um dia.");
      return;
    }

    onboardingStorage.saveStudyDays(result.data.studyDays);
    router.push("/onboarding/tempo");
  }

  return (
    <div className="flex min-h-[720px] flex-col justify-between py-3">
      <OnboardingProgress current={2} total={4} />

      <div className="py-8 text-center">
        {isLoading && (
          <p role="status" className="mb-6 text-sm font-medium text-[#52639c]">
            Carregando sua disponibilidade...
          </p>
        )}

        {loadError && (
          <div role="alert" className="mx-auto mb-6 max-w-[430px] rounded-2xl bg-[#fff4f4] px-4 py-3 text-sm text-destructive">
            <p>{loadError}</p>
            <Button
              type="button"
              variant="link"
              onClick={() => {
                loadAvailability();
              }}
              className="mt-1 h-auto p-0 text-destructive"
            >
              Tentar novamente
            </Button>
          </div>
        )}
        <div className="relative mx-auto mb-8 grid size-44 place-items-center rounded-full bg-mentor-blue-soft sm:size-48">
          <div className="absolute inset-3 rounded-full border border-mentor-blue/15" />
          <CalendarDays
            className="relative z-10 size-24 text-mentor-blue"
            strokeWidth={1.5}
          />
        </div>

        <h1 className="mx-auto max-w-[520px] text-3xl font-extrabold leading-tight text-mentor-blue sm:text-4xl">
          Em quais dias você consegue estudar?
        </h1>

        <p className="mx-auto mt-3 max-w-[460px] text-base leading-7 text-[#52639c]">
          Selecione todos os dias em que você tem disponibilidade.
        </p>

        <div className="mx-auto mt-8 grid max-w-[520px] grid-cols-12 gap-3">
          {studyDays.map((day, index) => {
            const selected = selectedDays.includes(day);

            return (
              <Button
                key={day}
                type="button"
                aria-pressed={selected}
                disabled={isLoading}
                onClick={() => toggleDay(day)}
                className={cn(
                  "col-span-3 h-14 cursor-pointer rounded-[28px] border-2 text-base font-bold transition-colors disabled:cursor-not-allowed",
                  index === 4 && "col-start-2",
                  selected
                    ? "border-mentor-blue-hover bg-mentor-blue text-white hover:bg-mentor-blue-hover"
                    : "border-transparent bg-[#f1f2f5] text-mentor-blue hover:bg-mentor-blue-soft",
                )}
              >
                <OnboardingOptionIndicator selected={selected} />
                {day}
              </Button>
            );
          })}
        </div>

        <p aria-live="polite" className="mt-4 text-sm font-semibold text-[#52639c]">
          {selectedDays.length === 0
            ? "Nenhum dia selecionado"
            : `${selectedDays.length} ${selectedDays.length === 1 ? "dia selecionado" : "dias selecionados"}`}
        </p>

        {error && (
          <p role="alert" className="mt-4 text-sm font-medium text-destructive">
            {error}
          </p>
        )}
      </div>
      <OnboardingStepActions onBack={() => router.push("/onboarding")}>
        <OnboardingPrimaryButton
          label="Próximo"
          onClick={handleContinue}
          disabled={isLoading}
        />
      </OnboardingStepActions>
    </div>
  );
}
