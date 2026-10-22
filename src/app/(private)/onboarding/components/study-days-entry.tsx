import { OnboardingShell } from "./onboarding-shell";
import { StudyDaysStep } from "./study-days-step";

export function StudyDaysEntry() {
  return (
    <OnboardingShell>
      <StudyDaysStep />
    </OnboardingShell>
  );
}
