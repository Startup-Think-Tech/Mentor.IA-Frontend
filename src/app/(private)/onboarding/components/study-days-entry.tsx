import { OnboardingShell } from "./onboarding-shell";
import { RoutineBrandPanel } from "./routine-brand-panel";
import { StudyDaysStep } from "./study-days-step";

export function StudyDaysEntry() {
  return (
    <OnboardingShell brandPanel={<RoutineBrandPanel />}>
      <StudyDaysStep />
    </OnboardingShell>
  );
}
