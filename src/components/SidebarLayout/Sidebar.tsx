import Link from "next/link";
import { Sparkles } from "lucide-react";

import { sidebarBrand, sidebarSections } from "./constants/Sidebar.constants";
import { SidebarNavGroup } from "./SidebarNavGroup";

export function Sidebar() {
  return (
    <aside className="flex h-dvh w-72 shrink-0 flex-col border-r bg-background">
      <div className="border-b px-4 py-4">
        <Link className="flex items-center gap-3" href={sidebarBrand.href}>
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="size-4" />
          </span>
          <span className="min-w-0">
            <strong className="block truncate text-base font-semibold">
              {sidebarBrand.title}
            </strong>
            <span className="block truncate text-sm text-muted-foreground">
              {sidebarBrand.description}
            </span>
          </span>
        </Link>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
        {sidebarSections.map((section) => (
          <SidebarNavGroup key={section.title} section={section} />
        ))}
      </div>
    </aside>
  );
}
