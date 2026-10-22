import type { z } from "zod";

import type { enemQuestionSchema } from "@/app/(private)/diagnostico/schemas/enem-question.schema";

export type EnemQuestionResponse = z.infer<typeof enemQuestionSchema>;
