"use client";

import { useEffect, useState } from "react";

import type { OnboardingProgressProps } from "@/app/(private)/onboarding/types/onboarding-component.types";

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
                className={`grid size-8 shrink-0 place-items-center rounded-full border-2 text-xs font-extrabold ${
                  isCurrent
                    ? "border-mentor-blue bg-mentor-blue text-white ring-4 ring-mentor-blue/15"
                    : isComplete
                      ? "border-mentor-blue bg-mentor-blue text-white"
                      : "border-mentor-blue-pale bg-white text-[#7180af]"
                }`}
              >
                {step}
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
