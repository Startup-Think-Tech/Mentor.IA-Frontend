import { OnboardingShell } from "./onboarding-shell";
import { QuizReadyStep } from "./quiz-ready-step";
import { RoutineBrandPanel } from "./routine-brand-panel";

export function QuizReadyEntry() {
  return (
    <OnboardingShell brandPanel={<RoutineBrandPanel />}>
      <QuizReadyStep />
    </OnboardingShell>
  );
}
