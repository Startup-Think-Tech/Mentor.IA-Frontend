import { MentorBrandPanel } from "@/components/mentor-brand-panel";

export function RoutineBrandPanel() {
  return (
    <MentorBrandPanel
      variant="rotina"
      accentClassName="text-[#3bd2da]"
      title={
        <>
          Uma rotina de estudos que se adapta{" "}
          <span className="text-[#3bd2da]">a você.</span>
        </>
      }
      description="Vamos entender a sua disponibilidade para criar um plano de estudos realista, eficiente e personalizado."
    />
  );
}
