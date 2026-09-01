"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpenCheck,
  CalendarClock,
  ClipboardCheck,
  LayoutDashboard,
  LibraryBig,
  Settings,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { type SidebarIconName } from "./constants/Sidebar.constants";

const sidebarIcons: Record<SidebarIconName, LucideIcon> = {
  "book-open-check": BookOpenCheck,
  "calendar-clock": CalendarClock,
  "clipboard-check": ClipboardCheck,
  "layout-dashboard": LayoutDashboard,
  "library-big": LibraryBig,
  settings: Settings,
  "user-round": UserRound,
};

type SidebarNavItemProps = {
  title: string;
  description: string;
  href: string;
  icon: SidebarIconName;
};

export function SidebarNavItem({
  title,
  description,
  href,
  icon,
}: SidebarNavItemProps) {
  const pathname = usePathname();
  const Icon = sidebarIcons[icon];
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group flex min-h-12 items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
        "hover:bg-muted hover:text-foreground",
        isActive
          ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
          : "text-muted-foreground"
      )}
      href={href}
    >
      <Icon className="size-4 shrink-0" />
      <span className="min-w-0">
        <span className="block truncate font-medium leading-5">{title}</span>
        <span
          className={cn(
            "block truncate text-xs leading-4",
            isActive
              ? "text-primary-foreground/80"
              : "text-muted-foreground group-hover:text-muted-foreground"
          )}
        >
          {description}
        </span>
      </span>
    </Link>
  );
}
