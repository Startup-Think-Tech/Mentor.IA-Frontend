"use client";

import { CalendarDays, GraduationCap, ScrollText, Sparkles } from "lucide-react";
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
          : "Nao foi possivel carregar sua disponibilidade.",
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
              : "Nao foi possivel carregar sua disponibilidade.",
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
              onClick={() => void loadAvailability()}
              className="mt-1 h-auto p-0 text-destructive"
            >
              Tentar novamente
            </Button>
          </div>
        )}
        <div className="relative mx-auto mb-8 flex h-[220px] max-w-[360px] items-center justify-center">
          <div className="absolute h-36 w-72 rounded-[45%] bg-[#eef2fb]" />
          <CalendarDays
            className="relative z-10 size-28 text-[#172052]"
            strokeWidth={1.4}
          />
          <GraduationCap
            className="absolute right-20 top-8 z-20 size-16 text-mentor-blue-hover"
            strokeWidth={1.5}
          />
          <ScrollText className="absolute right-10 bottom-8 z-20 size-12 text-[#caa43b]" />
          <Sparkles className="absolute right-6 top-6 size-8 text-[#ffd55a]" />
        </div>

        <h1 className="mx-auto max-w-[520px] text-3xl font-extrabold leading-tight text-mentor-blue sm:text-4xl">
          Em quais dias voce consegue estudar
        </h1>

        <div className="mx-auto mt-10 grid max-w-[430px] grid-cols-3 gap-4">
          {studyDays.map((day) => {
            const selected = selectedDays.includes(day);

            return (
              <Button
                key={day}
                type="button"
                aria-pressed={selected}
                disabled={isLoading}
                onClick={() => toggleDay(day)}
                className={cn(
                  "h-14 rounded-[28px] border-2 text-base font-bold transition-colors",
                  selected
                    ? "border-mentor-blue-hover bg-mentor-blue text-white hover:bg-mentor-blue-hover"
                    : "border-transparent bg-[#f1f2f5] text-mentor-blue hover:bg-mentor-blue-soft",
                )}
              >
                {day}
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
        disabled={isLoading}
        className="h-16 w-full rounded-[32px] bg-mentor-blue text-lg font-bold text-white hover:bg-mentor-blue-hover"
      >
        proximo
      </Button>
    </div>
  );
}
