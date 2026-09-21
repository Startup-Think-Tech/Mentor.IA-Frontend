export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-slate-100 flex items-center justify-center min-h-screen sm:py-6">
      <div className="w-full max-w-[420px] min-h-screen sm:min-h-[850px] sm:rounded-[40px] shadow-2xl overflow-hidden relative flex flex-col bg-slate-100 sm:border-[8px] sm:border-slate-800">
        {children}
      </div>
    </main>
  );
}