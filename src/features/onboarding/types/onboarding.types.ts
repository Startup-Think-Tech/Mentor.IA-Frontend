export const studyDays = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"] as const;
export const studyDurations = ["30", "60", "90", "120"] as const;

export type StudyDay = (typeof studyDays)[number];
export type StudyDuration = (typeof studyDurations)[number];

export type OnboardingDraft = {
  studyDays: StudyDay[];
  dailyMinutes?: StudyDuration;
  completed?: boolean;
};
