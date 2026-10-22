import { OnboardingShell } from "./onboarding-shell";
import { QuizReadyStep } from "./quiz-ready-step";

export function QuizReadyEntry() {
  return (
    <OnboardingShell>
      <QuizReadyStep />
    </OnboardingShell>
  );
}
