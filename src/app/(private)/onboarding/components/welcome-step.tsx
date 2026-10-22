"use client";

import { GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuthSession } from "@/context/auth-session.context";

import { OnboardingPrimaryAction } from "./onboarding-primary-action";
import { OnboardingProgress } from "./onboarding-progress";
import { OnboardingStepActions } from "./onboarding-step-actions";

export function WelcomeStep() {
  const router = useRouter();
  const session = useAuthSession();
  const firstName = session.user.name.trim().split(/\s+/)[0];

  return (
    <div className="flex min-h-[720px] flex-col justify-between py-3">
      <OnboardingProgress current={1} total={4} />

      <div className="py-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#172052] sm:text-5xl">
          Olá, <span className="text-mentor-blue">{firstName}</span>!
        </h1>
        <div className="relative mx-auto my-10 grid size-44 place-items-center rounded-full bg-mentor-blue-soft sm:size-48">
          <div className="absolute inset-3 rounded-full border border-mentor-blue/15" />
          <GraduationCap
            className="relative z-10 size-24 text-mentor-blue"
            strokeWidth={1.5}
          />
        </div>

        <p className="mx-auto max-w-[520px] text-lg leading-8 text-[#3851a6]">
          Antes de começarmos, queremos entender como funciona a sua rotina.
          Assim, podemos criar um plano de estudos que realmente combine com você.
        </p>
      </div>
      <OnboardingStepActions onBack={() => router.back()}>
        <OnboardingPrimaryAction
          href="/onboarding/dias"
          label="Vamos começar"
        />
      </OnboardingStepActions>
    </div>
  );
}
