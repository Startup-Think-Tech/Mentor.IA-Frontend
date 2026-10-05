import { onboardingDraftSchema } from "@/features/onboarding/schemas/onboarding-draft.schema";
import { studyDaysSchema } from "@/features/onboarding/schemas/study-days.schema";
import { studyTimeSchema } from "@/features/onboarding/schemas/study-time.schema";
import type { OnboardingDraft } from "@/features/onboarding/types/onboarding.types";

const ONBOARDING_KEY = "mentor.ia.onboarding";

function getStorage() {
  if (typeof window === "undefined") return null;
  return window.localStorage;
}

function readDraft(): OnboardingDraft {
  const storage = getStorage();
  if (!storage) return { studyDays: [] };

  const raw = storage.getItem(ONBOARDING_KEY);
  if (!raw) return { studyDays: [] };

  try {
    const parsed = JSON.parse(raw) as unknown;
    const result = onboardingDraftSchema.safeParse(parsed);

    return result.success ? result.data : { studyDays: [] };
  } catch {
    storage.removeItem(ONBOARDING_KEY);
    return { studyDays: [] };
  }
}
function saveDraft(draft: OnboardingDraft) {
  const validated = onboardingDraftSchema.parse(draft);
  getStorage()?.setItem(ONBOARDING_KEY, JSON.stringify(validated));
}

export const onboardingStorage = {
  getDraft(): OnboardingDraft {
    return readDraft();
  },

  saveStudyDays(studyDays: OnboardingDraft["studyDays"]) {
    const validated = studyDaysSchema.parse({ studyDays });
    saveDraft({ ...readDraft(), studyDays: validated.studyDays });
  },

  saveStudyTime(dailyMinutes: NonNullable<OnboardingDraft["dailyMinutes"]>) {
    const validated = studyTimeSchema.parse({ dailyMinutes });
    saveDraft({ ...readDraft(), dailyMinutes: validated.dailyMinutes });
  },
  complete() {
    saveDraft({ ...readDraft(), completed: true });
  },

  clear() {
    getStorage()?.removeItem(ONBOARDING_KEY);
  },
};
