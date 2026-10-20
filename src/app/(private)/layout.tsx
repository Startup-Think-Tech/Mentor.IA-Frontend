import { LogoutButton } from "@/app/_shared/auth/components/logout-button";
import { PrivateRoute } from "@/app/_shared/auth/components/private-route";

export default function PrivateLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <PrivateRoute>
      {children}
      <LogoutButton />
    </PrivateRoute>
  );
}
