"use client";

import { useEffect, useState } from "react";

import { onboardingStorage } from "@/app/(private)/onboarding/storage/onboarding.storage";
import type { OnboardingDraft } from "@/app/(private)/onboarding/types/onboarding.types";
import type { DiagnosticResults } from "@/app/(private)/diagnostico/schemas/diagnostic-results.schema";
import { diagnosticStorage } from "@/app/(private)/diagnostico/storage/diagnostic.storage";
import type { SchedulePlan } from "@/app/(private)/cronograma/types/schedule.types";
import { scheduleService } from "@/app/(private)/cronograma/services/schedule.service";

const completedKey = "mentor.ia.completed-study-sessions";

type StudyData = {
  results: DiagnosticResults | null;
  draft: OnboardingDraft | null;
  plan: SchedulePlan | null;
  completed: string[];
};

export function useStudyData() {
  const [data, setData] = useState<StudyData | null>(null);

  useEffect(() => {
    const results = diagnosticStorage.getResults();
    const draft = onboardingStorage.getDraft();
    let completed: string[] = [];

    try {
      const parsed: unknown = JSON.parse(localStorage.getItem(completedKey) ?? "[]");
      if (Array.isArray(parsed)) {
        completed = parsed.filter((value): value is string => typeof value === "string");
      }
    } catch {
      // Ignore malformed local progress.
    }

    setData({
      results,
      draft,
      plan: results && draft ? scheduleService.buildSchedulePlan(draft, results) : null,
      completed,
    });
  }, []);

  return data;
}
