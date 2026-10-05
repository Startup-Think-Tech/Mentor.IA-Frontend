import { z } from "zod";

export const diagnosticResultsSchema = z.object({
  portugues: z.boolean().optional(),
  matematica: z.boolean().optional(),
  historia: z.boolean().optional(),
  biologia: z.boolean().optional(),
  geografia: z.boolean().optional(),
});

export type DiagnosticResults = z.infer<typeof diagnosticResultsSchema>;
