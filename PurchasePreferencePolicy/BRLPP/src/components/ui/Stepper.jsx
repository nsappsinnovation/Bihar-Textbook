import { FiCheck } from "react-icons/fi";
import { useT } from "../../i18n/LanguageContext";

export default function Stepper({ steps, current, onStepClick }) {
  const { t } = useT();
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-700 sm:hidden">
        {t("stepOf", { n: current + 1, total: steps.length })} · {steps[current]}
      </p>
      <ol className="flex items-center gap-2">
        {steps.map((label, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <li key={label} className="flex flex-1 items-center gap-2 last:flex-none">
              <button
                type="button"
                disabled={!done}
                onClick={() => done && onStepClick?.(i)}
                className="flex items-center gap-2.5 disabled:cursor-default"
                aria-current={active ? "step" : undefined}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition ${
                    done
                      ? "bg-brand-600 text-white"
                      : active
                        ? "bg-gradient-to-br from-brand-700 to-brand-800 text-white shadow-lg shadow-brand-700/30"
                        : "bg-white text-slate-400 ring-1 ring-slate-200"
                  }`}
                >
                  {done ? <FiCheck className="h-4 w-4" /> : i + 1}
                </span>
                <span
                  className={`hidden whitespace-nowrap text-sm font-semibold lg:inline ${
                    active ? "text-slate-900" : done ? "text-slate-600" : "text-slate-400"
                  }`}
                >
                  {label}
                </span>
              </button>
              {i < steps.length - 1 && (
                <span className={`h-0.5 flex-1 rounded-full ${done ? "bg-brand-400" : "bg-slate-200"}`} />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
