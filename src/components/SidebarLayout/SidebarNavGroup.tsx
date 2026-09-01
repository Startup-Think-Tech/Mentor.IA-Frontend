import { type sidebarSections } from "./constants/Sidebar.constants";
import { SidebarNavItem } from "./SidebarNavItem";

type SidebarSection = (typeof sidebarSections)[number];

type SidebarNavGroupProps = {
  section: SidebarSection;
};

export function SidebarNavGroup({ section }: SidebarNavGroupProps) {
  return (
    <section className="space-y-2">
      <h2 className="px-3 text-xs font-medium uppercase tracking-normal text-muted-foreground">
        {section.title}
      </h2>
      <nav className="space-y-1" aria-label={section.title}>
        {section.items.map((item) => (
          <SidebarNavItem key={item.href} {...item} />
        ))}
      </nav>
    </section>
  );
}
