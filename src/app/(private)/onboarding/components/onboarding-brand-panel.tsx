import { MentorBrandPanel } from "@/components/mentor-brand-panel";

export function OnboardingBrandPanel() {
  return (
    <MentorBrandPanel
      variant="onboarding"
      title={
        <>
          Seu aprendizado com mais{" "}
          <span className="text-[#ffd55a]">propósito</span>
        </>
      }
      description="Organize sua rotina, estude com foco e evolua no seu ritmo."
    />
  );
}
