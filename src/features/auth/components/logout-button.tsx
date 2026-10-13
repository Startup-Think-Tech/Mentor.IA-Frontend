"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { authService } from "@/features/auth/services/auth.service";

export function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);

    try {
      await authService.logout();
    } finally {
      router.replace("/login");
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleLogout}
      disabled={isLoading}
      className="fixed top-4 right-4 z-50 h-10 gap-2 rounded-full border-[#dce2f4] bg-white/95 px-4 text-[#3555b6] shadow-sm hover:bg-white"
    >
      <LogOut className="size-4" />
      {isLoading ? "Saindo..." : "Sair"}
    </Button>
  );
}
