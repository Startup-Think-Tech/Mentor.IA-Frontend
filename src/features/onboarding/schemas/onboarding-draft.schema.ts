import { z } from "zod";

import {
  studyDays,
  studyDurations,
} from "@/features/onboarding/types/onboarding.types";

export const onboardingDraftSchema = z.object({
  studyDays: z.array(z.enum(studyDays)).default([]),
  dailyMinutes: z.enum(studyDurations).optional(),
  completed: z.boolean().optional(),
});
