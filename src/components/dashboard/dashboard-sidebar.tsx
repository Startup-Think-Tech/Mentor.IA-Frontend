"use client";

import {
  CalendarDays,
  ChevronUp,
  LayoutDashboard,
  LogOut,
  Menu,
  Target,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { authService } from "@/services/auth.service";
import { useAuthSession } from "@/context/auth-session.context";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/dashboard", label: "Visão geral", icon: LayoutDashboard },
  { href: "/cronograma", label: "Cronograma", icon: CalendarDays },
  { href: "/gaps", label: "Gaps", icon: Target },
];

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function Brand({ compact = false }: { compact?: boolean }) {
  const { open } = useSidebar();
  const showFullBrand = !compact || open;

  return (
    <Link href="/dashboard" className="text-2xl font-extrabold tracking-tight text-white">
      {showFullBrand ? (
        <>
          Mentor<span className="text-[#ffd55a]">.ia</span>
        </>
      ) : (
        "M"
      )}
    </Link>
  );
}

function Navigation({
  closeOnNavigate = false,
  compact = false,
}: {
  closeOnNavigate?: boolean;
  compact?: boolean;
}) {
  const pathname = usePathname();
  const { open } = useSidebar();
  const showLabels = !compact || open;

  return (
    <nav aria-label="Navegação dos estudos" className="space-y-1.5">
      {navigation.map(({ href, label, icon: Icon }) => {
        const isCurrent = pathname === href || (href === "/dashboard" && pathname === "/desempenho");
        const link = (
          <Link
            href={href}
            aria-current={isCurrent ? "page" : undefined}
            className={cn(
              "flex items-center rounded-xl py-3 text-sm font-semibold transition-colors",
              showLabels ? "gap-3 px-3.5" : "justify-center px-0",
              isCurrent
                ? "bg-white text-mentor-blue shadow-sm"
                : "text-white/80 hover:bg-white/12 hover:text-white",
            )}
          >
            <Icon className="size-[18px] shrink-0" />
            {showLabels && <span>{label}</span>}
          </Link>
        );
        const navigableLink = closeOnNavigate ? <SheetClose render={link} /> : link;

        return compact && !open ? (
          <Tooltip key={href}>
            <TooltipTrigger render={navigableLink} />
            <TooltipContent side="right">{label}</TooltipContent>
          </Tooltip>
        ) : (
          <div key={href}>{navigableLink}</div>
        );
      })}
    </nav>
  );
}

function ProfileMenu({ compact = false }: { compact?: boolean }) {
  const { open } = useSidebar();
  const router = useRouter();
  const { user } = useAuthSession();
  const [isLeaving, setIsLeaving] = useState(false);
  const showDetails = !compact || open;

  async function handleLogout() {
    setIsLeaving(true);
    try {
      await authService.logout();
    } finally {
      router.replace("/login");
    }
  }

  const trigger = (
    <button
      type="button"
      className={cn(
        "flex w-full items-center rounded-xl bg-white/10 p-2 text-left transition-colors hover:bg-white/16 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        showDetails ? "gap-2.5" : "justify-center",
      )}
    >
      <Avatar className="size-8">
        <AvatarFallback className="bg-[#38c7cf] font-bold text-[#172052]">
          {getInitials(user.name)}
        </AvatarFallback>
      </Avatar>
      {showDetails && (
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-bold text-white">{user.name}</span>
          <span className="block truncate text-xs text-white/60">{user.email}</span>
        </span>
      )}
      {showDetails && <ChevronUp className="size-4 shrink-0 text-white/65" />}
    </button>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={trigger} />
      <DropdownMenuContent side="top" align="start" className="w-60">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="py-2">
            <span className="block truncate text-sm font-semibold text-[#22305b]">{user.name}</span>
            <span className="mt-0.5 block truncate text-xs font-normal">{user.email}</span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" disabled={isLeaving} onClick={handleLogout}>
          <LogOut className="size-4" />
          {isLeaving ? "Saindo..." : "Sair"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DashboardSidebar() {
  const { open } = useSidebar();

  return (
    <TooltipProvider>
      <Sidebar>
        <SidebarHeader
          className={cn(
            "flex p-4",
            open ? "items-center justify-between gap-2" : "flex-col items-center gap-2",
          )}
        >
          <Brand compact />
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent>
          {open && (
            <p className="px-5 text-[0.6875rem] font-bold tracking-[0.14em] text-white/45">
              MEUS ESTUDOS
            </p>
          )}
          <div className="mt-3 px-3">
            <Navigation compact />
          </div>
        </SidebarContent>
        <SidebarFooter>
          <ProfileMenu compact />
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  );
}

export function MobileDashboardSidebar() {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Abrir navegação"
            className="border-[#dce2f4] bg-white text-mentor-blue hover:bg-[#f5f7fb] lg:hidden"
          />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="left" showCloseButton={false} className="w-[280px] border-0 bg-mentor-blue p-5 text-white">
        <SheetHeader className="p-0">
          <SheetTitle className="sr-only">Navegação dos estudos</SheetTitle>
          <Brand />
        </SheetHeader>
        <p className="mt-8 text-[0.6875rem] font-bold tracking-[0.14em] text-white/45">
          MEUS ESTUDOS
        </p>
        <div className="mt-3">
          <Navigation closeOnNavigate />
        </div>
        <div className="mt-auto">
          <ProfileMenu />
        </div>
      </SheetContent>
    </Sheet>
  );
}
