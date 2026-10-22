"use client";

import {
  ArrowRight,
  ClipboardCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { onboardingStorage } from "@/app/(private)/onboarding/storage/onboarding.storage";

import { OnboardingProgress } from "./onboarding-progress";
import { OnboardingPrimaryButton } from "./onboarding-primary-button";
import { OnboardingStepActions } from "./onboarding-step-actions";

export function QuizReadyStep() {
  const router = useRouter();

  function handleNext() {
    onboardingStorage.complete();
    router.push("/quiz");
  }

  return (
    <div className="flex min-h-[720px] flex-col justify-between py-3">
      <OnboardingProgress current={4} total={4} />

      <div className="py-8 text-center">
        <div className="relative mx-auto mb-8 grid size-44 place-items-center rounded-full bg-mentor-blue-soft sm:size-48">
          <div className="absolute inset-3 rounded-full border border-mentor-blue/15" />
          <ClipboardCheck
            className="relative z-10 size-24 text-mentor-blue"
            strokeWidth={1.5}
          />
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-mentor-blue">
          Hora do quiz!
        </h1>

        <p className="mx-auto mt-5 max-w-[520px] text-base leading-7 text-[#41548f]">
          Suas respostas vão nos ajudar a personalizar seu cronograma de estudos
          de acordo com o seu momento.
        </p>
      </div>

      <OnboardingStepActions onBack={() => router.push("/onboarding/tempo")}>
        <OnboardingPrimaryButton
          label="Iniciar quiz"
          onClick={handleNext}
          trailingIcon={<ArrowRight className="size-5" />}
        />
      </OnboardingStepActions>
    </div>
  );
}
