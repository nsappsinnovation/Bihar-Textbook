export default function StatCard({ label, value, hint, icon: Icon, accent = "from-brand-600 to-brand-700" }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-brand-900/10 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="min-h-[2.5rem] text-sm font-medium leading-tight text-slate-500">{label}</p>
          <p className="mt-3 truncate text-3xl font-extrabold tracking-tight text-slate-900">{value}</p>
        </div>
        {Icon && (
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${accent} text-white shadow-lg`}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
      {hint && <p className="mt-4 text-xs text-slate-400">{hint}</p>}
      <div
        className={`pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${accent} opacity-[0.06] blur-2xl transition group-hover:opacity-[0.12]`}
      />
    </div>
  );
}
