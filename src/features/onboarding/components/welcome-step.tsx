import { GraduationCap, ScrollText, Sparkles } from "lucide-react";

import { OnboardingPrimaryAction } from "./onboarding-primary-action";
import { OnboardingProgress } from "./onboarding-progress";

type WelcomeStepProps = {
  name: string;
};

export function WelcomeStep({ name }: WelcomeStepProps) {
  return (
    <div className="flex min-h-[720px] flex-col justify-between py-3">
      <OnboardingProgress current={1} total={4} />

      <div className="py-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#172052] sm:text-5xl">
          Olá, <span className="text-[#2f66e9]">{name}</span>!
        </h1>
        <div className="relative mx-auto my-10 flex h-[230px] max-w-[390px] items-center justify-center">
          <div className="absolute h-44 w-72 rotate-3 rounded-[45%] border-2 border-[#3555b6] bg-[#f3f5fb]" />
          <div className="absolute h-36 w-64 -rotate-6 rounded-[45%] bg-[#e9edf8]" />
          <GraduationCap
            className="relative z-10 size-24 text-[#213a88]"
            strokeWidth={1.6}
          />
          <ScrollText className="absolute right-16 top-28 z-10 size-12 text-[#d2a833]" />
          <Sparkles className="absolute right-12 top-8 size-9 text-[#ffd55a]" />
        </div>

        <p className="mx-auto max-w-[520px] text-lg leading-8 text-[#3851a6]">
          Antes de começarmos, queremos entender como funciona a sua rotina.
          Assim, podemos criar um plano de estudos que realmente combine com você.
        </p>
      </div>
      <OnboardingPrimaryAction
        href="/onboarding/dias"
        label="vamos começar"
      />
    </div>
  );
}
