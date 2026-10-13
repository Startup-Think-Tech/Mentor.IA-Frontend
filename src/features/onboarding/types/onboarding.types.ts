export const studyDays = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"] as const;
export const studyDurations = ["30", "60", "90", "120"] as const;

export const studyDayToWeekDay = {
  SEG: 0,
  TER: 1,
  QUA: 2,
  QUI: 3,
  SEX: 4,
  SAB: 5,
  DOM: 6,
} as const;

export type StudyDay = (typeof studyDays)[number];
export type StudyDuration = (typeof studyDurations)[number];

export function toStudyDays(
  disponibilidades: { diaSemana: number; minutosDisponiveis: number }[],
): StudyDay[] {
  const availableDays = new Set(
    disponibilidades
      .filter(({ minutosDisponiveis }) => minutosDisponiveis > 0)
      .map(({ diaSemana }) => diaSemana),
  );

  return studyDays.filter((day) => availableDays.has(studyDayToWeekDay[day]));
}

export type OnboardingDraft = {
  studyDays: StudyDay[];
  dailyMinutes?: StudyDuration;
  completed?: boolean;
};
