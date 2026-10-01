import { PrivateRoute } from "@/features/auth/components/private-route";

export default function PrivateLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <PrivateRoute>{children}</PrivateRoute>;
}
