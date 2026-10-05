import { z } from "zod";

import { studyDurations } from "@/features/onboarding/types/onboarding.types";

export const studyTimeSchema = z.object({
  dailyMinutes: z.enum(studyDurations, {
    error: "Selecione quanto tempo você tem disponível por dia.",
  }),
});

export type StudyTimeInput = z.infer<typeof studyTimeSchema>;
