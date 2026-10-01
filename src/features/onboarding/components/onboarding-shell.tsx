import type { ReactNode } from "react";

import { OnboardingBrandPanel } from "./onboarding-brand-panel";

type OnboardingShellProps = {
  children: ReactNode;
  brandPanel?: ReactNode;
};

export function OnboardingShell({
  children,
  brandPanel,
}: OnboardingShellProps) {
  return (
    <main className="min-h-dvh bg-white">
      <section className="grid min-h-dvh lg:grid-cols-[1.02fr_0.98fr]">
        {brandPanel ?? <OnboardingBrandPanel />}
        <div className="flex min-h-dvh items-center justify-center px-6 py-8 sm:px-10 lg:min-h-0 lg:px-16">
          <div className="w-full max-w-[610px]">{children}</div>
        </div>
      </section>
    </main>
  );
}
