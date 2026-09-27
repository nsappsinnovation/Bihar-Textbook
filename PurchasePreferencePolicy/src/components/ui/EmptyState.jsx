export default function EmptyState({ icon: Icon, title, children }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-14 text-center">
      {Icon && (
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
          <Icon className="h-7 w-7" />
        </div>
      )}
      <p className="max-w-sm text-sm font-medium text-slate-500">{title}</p>
      {children}
    </div>
  );
}
