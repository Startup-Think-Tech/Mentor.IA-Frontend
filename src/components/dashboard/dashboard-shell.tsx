"use client";

import type { ReactNode } from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { MobileDashboardSidebar, DashboardSidebar } from "./dashboard-sidebar";

type DashboardShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function DashboardShell({ title, subtitle, children }: DashboardShellProps) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="min-h-dvh bg-[#f5f7fb] px-4 py-5 sm:px-6 sm:py-7 xl:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <header className="flex items-start gap-4">
            <MobileDashboardSidebar />
            <div>
              <p className="text-sm font-semibold text-[#7180af]">Plano personalizado</p>
              <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-[#172052] sm:text-4xl">
                {title}
              </h1>
              <p className="mt-2 max-w-3xl text-[#52639c]">{subtitle}</p>
            </div>
          </header>
          <div className="mt-8">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
