export default function Spinner({ className = "h-5 w-5", light = false }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={`inline-block animate-spin rounded-full border-2 ${
        light ? "border-white/40 border-t-white" : "border-brand-200 border-t-brand-700"
      } ${className}`}
    />
  );
}

export function PageLoader({ label }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-sm font-medium text-slate-500">
      <Spinner className="h-8 w-8" />
      {label}
    </div>
  );
}
