import { diagnosticSubjects } from "@/features/diagnostic/types/diagnostic.types";
import type { DiagnosticResults } from "@/features/diagnostic/schemas/diagnostic-results.schema";
import type {
  OnboardingDraft,
  StudyDay,
} from "@/features/onboarding/types/onboarding.types";
import { subjectTopics } from "@/features/schedule/constants/schedule.constants";
import type {
  ScheduleDay,
  SchedulePlan,
} from "@/features/schedule/types/schedule.types";

const dayOrder: StudyDay[] = [
  "SEG",
  "TER",
  "QUA",
  "QUI",
  "SEX",
  "SAB",
  "DOM",
];

function toDailyMinutes(draft: OnboardingDraft) {
  return Number(draft.dailyMinutes ?? "60");
}
function getSubjectsByResult(results: DiagnosticResults) {
  const weakSubjects = diagnosticSubjects.filter(
    (subject) => results[subject] === false,
  );
  const strongSubjects = diagnosticSubjects.filter(
    (subject) => results[subject] === true,
  );

  return { weakSubjects, strongSubjects };
}

function buildSubjectQueue(results: DiagnosticResults) {
  const { weakSubjects, strongSubjects } = getSubjectsByResult(results);
  const weakQueue = weakSubjects.flatMap((subject) => [subject, subject]);
  const fallback = diagnosticSubjects.filter(
    (subject) => results[subject] === undefined,
  );

  return [...weakQueue, ...strongSubjects, ...fallback];
}

function buildDateLabel(day: StudyDay, position: number) {
  const labels: Record<StudyDay, string> = {
    SEG: "Seg",
    TER: "Ter",
    QUA: "Qua",
    QUI: "Qui",
    SEX: "Sex",
    SAB: "Sáb",
    DOM: "Dom",
  };

  return `${labels[day]} · Dia ${position + 1}`;
}
export function buildSchedulePlan(
  draft: OnboardingDraft,
  results: DiagnosticResults,
): SchedulePlan {
  const selectedDays = draft.studyDays.length
    ? draft.studyDays
    : dayOrder.slice(0, 5);
  const dailyMinutes = toDailyMinutes(draft);
  const sessionCount = Math.max(1, Math.floor(dailyMinutes / 25));
  const subjectQueue = buildSubjectQueue(results);
  const { weakSubjects, strongSubjects } = getSubjectsByResult(results);

  let queueIndex = 0;
  const topicIndex = new Map<string, number>();

  const days: ScheduleDay[] = selectedDays.map((day, dayIndex) => {
    const sessions = Array.from({ length: sessionCount }, () => {
      const subject =
        subjectQueue[queueIndex % subjectQueue.length] ?? "portugues";
      queueIndex += 1;

      const currentTopicIndex = topicIndex.get(subject) ?? 0;
      const topics = subjectTopics[subject];
      const topic = topics[currentTopicIndex % topics.length];
      topicIndex.set(subject, currentTopicIndex + 1);

      return {
        subject,
        topic,
        minutes: 25,
        priority: weakSubjects.includes(subject) ? "high" : "normal",
      } as const;
    });
    return {
      day,
      dateLabel: buildDateLabel(day, dayIndex),
      sessions,
    };
  });

  return {
    days,
    weakSubjects,
    strongSubjects,
    dailyMinutes,
  };
}

export const scheduleService = {
  buildSchedulePlan,
};
