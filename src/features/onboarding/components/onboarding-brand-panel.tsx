import { BarChart3, GraduationCap, Star } from "lucide-react";

export function OnboardingBrandPanel() {
  return (
    <aside className="relative hidden min-h-dvh overflow-hidden bg-[#2150d9] px-14 py-12 text-white lg:flex lg:flex-col lg:justify-between">
      <div className="flex items-center gap-3 text-3xl font-extrabold">
        <GraduationCap className="size-10" />
        <span>
          Mentor<span className="text-[#ffd55a]">.ia</span>
        </span>
      </div>

      <div className="relative z-10 max-w-xl">
        <h2 className="text-5xl font-extrabold leading-[1.15]">
          Seu aprendizado com mais{" "}
          <span className="text-[#ffd55a]">proposito</span>
        </h2>
        <p className="mt-6 max-w-lg text-xl leading-9 text-white/85">
          Organize sua rotina, estude com foco e evolua no seu ritmo.
        </p>

        <div className="relative mt-10 h-[360px]">
          <div className="absolute left-10 top-28 rounded-3xl bg-white p-5 text-[#2f66e9] shadow-xl">
            <BarChart3 className="size-12" />
          </div>

          <div className="absolute right-14 top-36 rounded-3xl bg-white p-5 text-[#f3bb35] shadow-xl">
            <Star className="size-12 fill-current" />
          </div>
          <div className="absolute inset-x-28 bottom-0 mx-auto flex h-[285px] items-end justify-center rounded-t-[140px] bg-[#1a3daa]/45">
            <div className="mb-10 flex h-44 w-44 items-center justify-center rounded-full bg-[#dbe5ff]">
              <GraduationCap className="size-24 text-[#213a88]" strokeWidth={1.6} />
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-white/60">
        Mentor.ia - tecnologia que entende como voce aprende.
      </p>
    </aside>
  );
}
