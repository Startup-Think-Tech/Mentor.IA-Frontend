import type { DiagnosticSubject } from "@/features/diagnostic/types/diagnostic.types";
import type { StudyDay } from "@/features/onboarding/types/onboarding.types";

export type ScheduleSession = {
  subject: DiagnosticSubject;
  topic: string;
  minutes: number;
  priority: "high" | "normal";
};

export type ScheduleDay = {
  day: StudyDay;
  dateLabel: string;
  sessions: ScheduleSession[];
};

export type SchedulePlan = {
  days: ScheduleDay[];
  weakSubjects: DiagnosticSubject[];
  strongSubjects: DiagnosticSubject[];
  dailyMinutes: number;
};
