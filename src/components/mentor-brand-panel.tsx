import type { ReactNode } from "react";

type MentorBrandPanelProps = {
  title: ReactNode;
  description: ReactNode;
  accentClassName?: string;
};

export function MentorBrandPanel({
  title,
  description,
  accentClassName = "text-[#ffd55a]",
}: MentorBrandPanelProps) {
  return (
    <aside className="relative hidden min-h-dvh overflow-hidden bg-mentor-blue px-14 py-12 text-white lg:flex lg:flex-col lg:justify-between">
      <div className="flex items-center gap-3 text-3xl font-extrabold">
        <span>
          Mentor<span className={accentClassName}>.ia</span>
        </span>
        <span className="text-[#ffd55a]">✦</span>
      </div>

      <div className="relative z-10 max-w-xl">
        <h2 className="text-5xl font-extrabold leading-[1.15]">{title}</h2>
        <p className="mt-6 max-w-lg text-xl leading-9 text-white/85">
          {description}
        </p>
        <div className="mt-8 h-1.5 w-16 rounded-full bg-[#ffd55a]" />
      </div>

      <p className="text-sm text-white/60">
        Mentor.ia • tecnologia que entende como você aprende.
      </p>
    </aside>
  );
}
