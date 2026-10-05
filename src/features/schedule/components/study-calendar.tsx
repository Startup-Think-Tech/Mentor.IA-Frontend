import type { StudyDay } from "@/features/onboarding/types/onboarding.types";
import { cn } from "@/lib/utils";

const weekdayToStudyDay: Record<number, StudyDay> = {
  0: "DOM",
  1: "SEG",
  2: "TER",
  3: "QUA",
  4: "QUI",
  5: "SEX",
  6: "SAB",
};

const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];

export function StudyCalendar({
  studyDays,
  referenceDate,
}: {
  studyDays: StudyDay[];
  referenceDate: Date;
}) {
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = referenceDate.getDate();
  const monthLabel = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(referenceDate);
  const cells = Array.from(
    { length: firstDay + daysInMonth },
    (_, index) => (index < firstDay ? null : index - firstDay + 1),
  );

  return (
    <aside className="rounded-[28px] border border-[#e4e8f2] bg-white p-5">
      <h2 className="text-xl font-extrabold text-[#22305b]">Calendário</h2>
      <p className="mt-1 capitalize text-sm font-semibold text-[#52639c]">
        {monthLabel}
      </p>

      <div className="mt-5 grid grid-cols-7 gap-1 text-center">
        {weekdays.map((weekday, index) => (
          <span
            key={weekday + "-" + index}
            className="py-2 text-xs font-bold text-[#8a97bd]"
          >
            {weekday}
          </span>
        ))}

        {cells.map((day, index) => {
          if (!day) {
            return <span key={"empty-" + index} className="h-10" />;
          }

          const date = new Date(year, month, day);
          const studyDay = weekdayToStudyDay[date.getDay()];
          const hasStudy = studyDays.includes(studyDay);
          const isToday = day === today;

          return (
            <div
              key={day}
              className={cn(
                "relative grid h-10 place-items-center rounded-full text-sm text-[#35446f]",
                isToday && "bg-[#3555b6] font-bold text-white",
                !isToday && hasStudy &&
                  "bg-[#eef2ff] font-semibold text-[#3555b6]",
              )}
            >
              {day}
              {!isToday && hasStudy && (
                <span className="absolute bottom-1 size-1 rounded-full bg-[#38c7cf]" />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl bg-[#f7f9fe] p-4">
        <p className="text-sm font-bold text-[#22305b]">Meta semanal</p>
        <p className="mt-1 text-sm text-[#7180af]">
          Estudar em {studyDays.length} dias da semana.
        </p>
      </div>
    </aside>
  );
}