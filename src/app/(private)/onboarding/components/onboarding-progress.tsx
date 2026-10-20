type OnboardingProgressProps = {
  current: number;
  total: number;
};

export function OnboardingProgress({
  current,
  total,
}: OnboardingProgressProps) {
  const progress = (current / total) * 100;

  return (
    <div className="flex items-center gap-5">
      <span className="rounded-full bg-[#38c7cf] px-5 py-2 text-sm font-bold text-white">
        {current} de {total}
      </span>
      <div
        className="h-2 flex-1 overflow-hidden rounded-full bg-[#e8ecf7]"
        aria-label={`Etapa ${current} de ${total}`}
      >
        <div
          className="h-full rounded-full bg-[#2f66e9] transition-[width]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
