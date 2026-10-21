import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type OnboardingPrimaryActionProps = {
  href: string;
  label: string;
};

export function OnboardingPrimaryAction({
  href,
  label,
}: OnboardingPrimaryActionProps) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ size: "lg" }),
        "h-16 w-full rounded-[32px] bg-[#2f66e9] text-lg font-bold text-white hover:bg-[#2858ca]",
      )}
    >
      {label}
      <ArrowRight className="size-5" />
    </Link>
  );
}
