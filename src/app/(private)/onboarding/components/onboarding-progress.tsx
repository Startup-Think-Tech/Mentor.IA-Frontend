"use client";

import { Check } from "lucide-react";
import { useEffect, useState } from "react";

import type { OnboardingProgressProps } from "@/app/(private)/onboarding/types/onboarding-component.types";

const stepLabels = ["Boas-vindas", "Disponibilidade", "Rotina", "Quiz"];

export function OnboardingProgress({
  current,
  total,
}: OnboardingProgressProps) {
  const [animatedCurrent, setAnimatedCurrent] = useState(
    Math.max(1, current - 1),
  );

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setAnimatedCurrent(current);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [current]);

  return (
    <nav aria-label={`Etapa ${current} de ${total}`}>
      <div className="mb-4 flex items-center justify-between text-sm">
        <p className="font-bold text-mentor-blue">
          Etapa {current} de {total}
        </p>
        <p className="font-medium text-[#7180af]">
          {stepLabels[current - 1] ?? `Etapa ${current}`}
        </p>
      </div>
      <ol className="flex w-full items-center">
        {Array.from({ length: total }, (_, index) => {
          const step = index + 1;
          const isCurrent = step === current;
          const isComplete = step < current;

          return (
            <li
              key={step}
              className="flex min-w-0 flex-1 items-center last:flex-none"
            >
              <span
                aria-current={isCurrent ? "step" : undefined}
                aria-label={isComplete ? `Etapa ${step} concluída` : `Etapa ${step}`}
                className={`grid size-8 shrink-0 place-items-center rounded-full border-2 text-xs font-extrabold ${
                  isCurrent
                    ? "border-mentor-blue bg-mentor-blue text-white ring-4 ring-mentor-blue/15"
                    : isComplete
                      ? "border-mentor-blue bg-mentor-blue text-white"
                      : "border-mentor-blue-pale bg-white text-[#7180af]"
                }`}
              >
                {isComplete ? <Check aria-hidden className="size-4" strokeWidth={3} /> : step}
              </span>
              {step < total ? (
                <span className="mx-2 h-0.5 min-w-3 flex-1 overflow-hidden rounded-full bg-mentor-blue-pale">
                  <span
                    className={`block h-full origin-left bg-mentor-blue transition-transform duration-500 ease-in-out ${
                      animatedCurrent > step ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
