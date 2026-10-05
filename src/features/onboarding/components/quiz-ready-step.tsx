"use client";

import {
  ArrowLeft,
  ArrowRight,
  ClipboardCheck,
  Pencil,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { onboardingStorage } from "@/features/onboarding/storage/onboarding.storage";

import { OnboardingProgress } from "./onboarding-progress";

export function QuizReadyStep() {
  const router = useRouter();

  function handleNext() {
    onboardingStorage.complete();
    router.push("/diagnostico");
  }

  return (
    <div className="flex min-h-[720px] flex-col justify-between py-3">
      <OnboardingProgress current={4} total={4} />

      <div className="py-8 text-center">
        <div className="relative mx-auto mb-8 flex h-[250px] max-w-[390px] items-center justify-center">
          <div className="absolute h-40 w-72 rounded-[44%] bg-[#dff2ff]" />
          <div className="absolute h-32 w-64 rotate-6 rounded-[44%] border-2 border-[#3555b6] bg-white/70" />
          <ClipboardCheck
            className="relative z-10 size-28 text-[#2f55bd]"
            strokeWidth={1.5}
          />
          <Pencil className="absolute right-20 top-20 z-20 size-14 text-[#d3aa32]" />
          <Sparkles className="absolute right-10 top-8 size-9 text-[#ffd55a]" />
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-[#2f55bd]">
          Hora do quiz!
        </h1>

        <p className="mx-auto mt-5 max-w-[520px] text-base leading-7 text-[#41548f]">
          Suas respostas vão nos ajudar a personalizar seu cronograma de estudos
          de acordo com o seu momento.
        </p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/onboarding/tempo")}
          className="h-12 min-w-36 rounded-[24px] border-[#2f55bd] text-[#2f55bd] hover:bg-[#eef2fb]"
        >
          <ArrowLeft className="size-4" />
          Voltar
        </Button>

        <Button
          type="button"
          onClick={handleNext}
          className="h-12 min-w-36 rounded-[24px] bg-[#2f55bd] text-white hover:bg-[#2448a8]"
        >
          Próxima
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
