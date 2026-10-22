import type { OnboardingShellProps } from "@/app/(private)/onboarding/types/onboarding-component.types";

export function OnboardingShell({ children }: OnboardingShellProps) {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#f6f7fb] px-6 py-8 sm:px-10">
      <div className="w-full max-w-[610px]">{children}</div>
    </main>
  );
}
