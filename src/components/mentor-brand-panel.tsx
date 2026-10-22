import { BarChart3, BookOpen, GraduationCap, Star } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

type MentorBrandPanelProps = {
  variant: "login" | "cadastro" | "onboarding" | "rotina";
  title: ReactNode;
  description: ReactNode;
  accentClassName?: string;
};

export function MentorBrandPanel({
  variant,
  title,
  description,
  accentClassName = "text-[#ffd55a]",
}: MentorBrandPanelProps) {
  const isOnboarding = variant === "onboarding" || variant === "rotina";

  return (
    <aside className="relative hidden min-h-dvh overflow-hidden bg-mentor-blue px-14 py-12 text-white lg:flex lg:flex-col lg:justify-between">
      <div className="flex items-center gap-3 text-3xl font-extrabold">
        {isOnboarding ? <GraduationCap className="size-10" /> : null}
        <span>
          Mentor<span className={accentClassName}>.ia</span>
        </span>
        {!isOnboarding ? <span className="text-[#ffd55a]">✦</span> : null}
      </div>

      {variant === "login" ? (
        <div className="relative z-10 flex flex-col items-center text-center">
          <Image
            src="/figma/login/illustration.png"
            alt=""
            width={271}
            height={281}
            priority
            className="mb-8 h-auto w-[260px]"
          />
          <h2 className="max-w-xl text-4xl font-extrabold leading-tight">
            {title}
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-8 text-white/80">
            {description}
          </p>
        </div>
      ) : null}

      {variant === "cadastro" ? (
        <div className="relative z-10 max-w-xl">
          <h2 className="text-5xl font-extrabold leading-tight">{title}</h2>
          <p className="mt-6 max-w-lg text-xl leading-9 text-white/85">
            {description}
          </p>
          <Image
            src="/figma/login/illustration.png"
            alt=""
            width={271}
            height={281}
            priority
            className="mt-10 h-auto w-[300px]"
          />
        </div>
      ) : null}

      {variant === "onboarding" ? (
        <div className="relative z-10 max-w-xl">
          <h2 className="text-5xl font-extrabold leading-[1.15]">{title}</h2>
          <p className="mt-6 max-w-lg text-xl leading-9 text-white/85">
            {description}
          </p>
          <div className="relative mt-10 h-[360px]">
            <div className="absolute left-10 top-28 rounded-3xl bg-white p-5 text-mentor-blue shadow-xl">
              <BarChart3 className="size-12" />
            </div>
            <div className="absolute right-14 top-36 rounded-3xl bg-white p-5 text-[#f3bb35] shadow-xl">
              <Star className="size-12 fill-current" />
            </div>
            <div className="absolute inset-x-28 bottom-0 mx-auto flex h-[285px] items-end justify-center rounded-t-[140px] bg-mentor-blue-hover/45">
              <div className="mb-10 flex h-44 w-44 items-center justify-center rounded-full bg-mentor-blue-pale">
                <GraduationCap
                  className="size-24 text-mentor-blue-hover"
                  strokeWidth={1.6}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {variant === "rotina" ? (
        <div className="relative z-10 max-w-xl">
          <h2 className="text-5xl font-extrabold leading-[1.15]">{title}</h2>
          <p className="mt-6 max-w-lg text-xl leading-9 text-white/85">
            {description}
          </p>
          <div className="relative mt-10 h-[360px]">
            <div className="absolute bottom-14 left-24 h-28 w-52 rounded-3xl bg-mentor-blue-hover/55" />
            <BookOpen
              className="absolute bottom-20 left-28 size-28 text-white"
              strokeWidth={1.35}
            />
            <GraduationCap
              className="absolute bottom-40 left-44 size-28 text-[#22305b]"
              strokeWidth={1.5}
            />
            <Star className="absolute bottom-32 right-20 size-10 fill-[#ffd55a] text-[#ffd55a]" />
          </div>
        </div>
      ) : null}

      <p className="text-sm text-white/60">
        Mentor.ia • tecnologia que entende como você aprende.
      </p>
    </aside>
  );
}
