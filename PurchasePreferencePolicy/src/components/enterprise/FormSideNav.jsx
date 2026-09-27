import { FiCheck, FiAlertCircle } from "react-icons/fi";
import { useT } from "../../i18n/LanguageContext";

// status: complete | partial | empty | error | optional | ready | pending
const DOT = {
  complete: "bg-brand-600 text-white",
  ready: "bg-brand-600 text-white",
  error: "bg-red-500 text-white",
  partial: "bg-gold-500 text-brand-950",
  optional: "bg-white text-slate-500 ring-1 ring-slate-300",
  empty: "bg-white text-slate-400 ring-1 ring-slate-200",
  pending: "bg-white text-slate-400 ring-1 ring-slate-200",
};

function StatusDot({ status, index }) {
  const done = status === "complete" || status === "ready";
  return (
    <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${DOT[status]}`}>
      {done ? <FiCheck className="h-3.5 w-3.5" strokeWidth={3} /> : status === "error" ? <FiAlertCircle className="h-3.5 w-3.5" /> : index + 1}
    </span>
  );
}

/** Progress summary: bar + "x of y required sections complete". */
export function FormProgress({ done, total }) {
  const { t } = useT();
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{t("progressTitle")}</p>
        <p className="text-sm font-bold text-slate-900">{pct}%</p>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-gradient-to-r from-brand-700 to-gold-500 transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-2 text-xs text-slate-500">{t("progressRequired", { done, total })}</p>
    </div>
  );
}

/**
 * Section navigation for the registration form. Desktop: sticky vertical list.
 * Mobile: horizontally scrollable chips. Any section can be opened directly.
 */
export default function FormSideNav({ sections, current, onSelect, done, total }) {
  const { t } = useT();
  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 space-y-5 rounded-2xl border border-brand-900/10 bg-white p-5 shadow-sm">
          <FormProgress done={done} total={total} />
          <nav aria-label={t("progressTitle")}>
            <ol className="space-y-1">
              {sections.map((s, i) => {
                const active = s.id === current;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => onSelect(s.id)}
                      aria-current={active ? "step" : undefined}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                        active ? "bg-brand-50 ring-1 ring-brand-100" : "hover:bg-slate-50"
                      }`}
                    >
                      <StatusDot status={s.status} index={i} />
                      <span className="min-w-0">
                        <span className={`block truncate text-sm font-semibold ${active ? "text-brand-900" : "text-slate-800"}`}>{s.title}</span>
                        <span className={`block truncate text-xs ${s.status === "error" ? "text-red-600" : "text-slate-500"}`}>{s.statusText}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>
          <p className="border-t border-slate-100 pt-4 text-[11px] leading-4 text-slate-400">{t("autosaved")}</p>
        </div>
      </aside>

      {/* Mobile */}
      <div className="-mx-4 border-b border-slate-200 bg-white px-4 pb-3 pt-3 lg:hidden">
        <FormProgress done={done} total={total} />
        <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
          {sections.map((s, i) => {
            const active = s.id === current;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onSelect(s.id)}
                aria-current={active ? "step" : undefined}
                className={`flex shrink-0 items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3 text-xs font-semibold transition ${
                  active ? "border-brand-300 bg-brand-50 text-brand-900" : "border-slate-200 bg-white text-slate-600"
                }`}
              >
                <StatusDot status={s.status} index={i} />
                {s.title}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
