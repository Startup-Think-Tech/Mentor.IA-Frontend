import { z } from "zod";

import { studyDays } from "@/features/onboarding/types/onboarding.types";

export const studyDaysSchema = z.object({
  studyDays: z
    .array(z.enum(studyDays))
    .min(1, "Selecione pelo menos um dia para estudar."),
});

export type StudyDaysInput = z.infer<typeof studyDaysSchema>;
