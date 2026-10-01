import { OnboardingShell } from "./onboarding-shell";
import { RoutineBrandPanel } from "./routine-brand-panel";
import { StudyTimeStep } from "./study-time-step";

export function StudyTimeEntry() {
  return (
    <OnboardingShell brandPanel={<RoutineBrandPanel />}>
      <StudyTimeStep />
    </OnboardingShell>
  );
}
