import { BookOpen, GraduationCap, Star } from "lucide-react";

export function RoutineBrandPanel() {
  return (
    <aside className="relative hidden min-h-dvh overflow-hidden bg-[#2150d9] px-14 py-12 text-white lg:flex lg:flex-col lg:justify-between">
      <div className="flex items-center gap-3 text-3xl font-extrabold">
        <GraduationCap className="size-10" />
        <span>
          Mentor<span className="text-[#3bd2da]">.ia</span>
        </span>
      </div>

      <div className="relative z-10 max-w-xl">
        <h2 className="text-5xl font-extrabold leading-[1.15]">
          Uma rotina de estudos que se adapta{" "}
          <span className="text-[#3bd2da]">a voce.</span>
        </h2>
        <p className="mt-6 max-w-lg text-xl leading-9 text-white/85">
          Vamos entender a sua disponibilidade para criar um plano de estudos
          realista, eficiente e personalizado.
        </p>

        <div className="relative mt-10 h-[360px]">
          <div className="absolute left-24 bottom-14 h-28 w-52 rounded-3xl bg-[#173baf]/55" />
          <BookOpen className="absolute bottom-20 left-28 size-28 text-white" strokeWidth={1.35} />
          <GraduationCap className="absolute bottom-40 left-44 size-28 text-[#172052]" strokeWidth={1.5} />
          <Star className="absolute bottom-32 right-20 size-10 fill-[#ffd55a] text-[#ffd55a]" />
        </div>
      </div>
      <p className="text-sm text-white/60">
        Mentor.ia - tecnologia que entende como voce aprende.
      </p>
    </aside>
  );
}
