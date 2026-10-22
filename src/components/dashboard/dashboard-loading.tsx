export function DashboardLoading() {
  return (
    <div className="grid min-h-80 place-items-center" role="status" aria-label="Carregando">
      <div className="size-10 animate-spin rounded-full border-4 border-mentor-blue-pale border-t-mentor-blue" />
    </div>
  );
}
