import { z } from "zod";

export const enemAlternativeSchema = z.object({
  letter: z.string().min(1),
  text: z.string().nullable(),
  isCorrect: z.boolean(),
});

export const enemQuestionSchema = z.object({
  title: z.string(),
  index: z.number(),
  discipline: z.string(),
  language: z.string().nullable(),
  year: z.number(),
  context: z.string().nullable(),
  files: z.array(z.string()).default([]),
  correctAlternative: z.string().min(1),
  alternativesIntroduction: z.string().min(1),
  alternatives: z.array(enemAlternativeSchema).min(2),
});

export type EnemQuestionResponse = z.infer<typeof enemQuestionSchema>;
