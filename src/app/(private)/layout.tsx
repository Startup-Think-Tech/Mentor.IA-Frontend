import { PrivateRoute } from "@/components/auth/private-route";

export default function PrivateLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <PrivateRoute>
      {children}
    </PrivateRoute>
  );
}
