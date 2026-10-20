import { LogoutButton } from "@/components/auth/logout-button";
import { PrivateRoute } from "@/components/auth/private-route";

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
