import { z } from "zod";

import { studyDurations } from "@/app/(private)/onboarding/types/onboarding.types";

export const studyTimeSchema = z.object({
  dailyMinutes: z.enum(studyDurations, {
    error: "Selecione quanto tempo você tem disponível por dia.",
  }),
});
