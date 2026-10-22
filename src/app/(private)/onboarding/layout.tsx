import type { ReactNode } from "react";

export default function OnboardingLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#f6f7fb] px-6 py-8 sm:px-10">
      <div className="w-full max-w-[610px]">{children}</div>
    </main>
  );
}
