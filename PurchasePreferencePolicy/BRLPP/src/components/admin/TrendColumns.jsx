import { useId, useState } from "react";
import { useT } from "../../i18n/LanguageContext";
import { formatDate } from "../../lib/format";

/**
 * Daily submissions as a column chart (single series, so no legend).
 * Marks: <=24px wide, 4px rounded cap, square at the baseline, hairline axis.
 * Every value is also in the visually-hidden table, so the tooltip never gates data.
 */
export default function TrendColumns({ days, label }) {
  const { t } = useT();
  const [hover, setHover] = useState(null);
  const tableId = useId();
  const max = Math.max(1, ...days.map((d) => d.count));
  // Clean axis top: 1, 2, 5, 10, 20, 50 …
  const step = [1, 2, 5, 10, 20, 50, 100, 200, 500].find((s) => s * 4 >= max) || 1000;
  const top = Math.ceil(max / step) * step;

  return (
    <div>
      <div className="flex items-end gap-3">
        {/* y-axis: only two ticks, they carry what the bars don't label */}
        <div className="flex h-40 w-8 flex-col justify-between py-0.5 text-right text-[10px] tabular-nums text-slate-400">
          <span>{top}</span>
          <span>0</span>
        </div>
        <div className="relative min-w-0 flex-1">
          <div className="flex h-40 items-end gap-[2px] border-b border-slate-200">
            {days.map((d, i) => {
              const h = (d.count / top) * 100;
              const active = hover?.i === i;
              return (
                <button
                  key={d.date}
                  type="button"
                  aria-label={`${formatDate(d.date)}: ${d.count}`}
                  onMouseEnter={() => setHover({ i, ...d })}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover({ i, ...d })}
                  onBlur={() => setHover(null)}
                  className="group flex h-full max-w-[24px] flex-1 items-end justify-center focus:outline-none"
                >
                  <span
                    className={`w-full rounded-t-[4px] transition-colors ${active ? "bg-brand-900" : "bg-brand-700"} ${
                      d.count === 0 ? "bg-slate-200" : ""
                    }`}
                    style={{ height: `${Math.max(d.count ? 3 : 2, h)}%` }}
                  />
                </button>
              );
            })}
          </div>
          {hover && (
            <div
              className="pointer-events-none absolute -top-2 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg bg-brand-950 px-2.5 py-1.5 text-xs text-white shadow-lg"
              style={{ left: `${((hover.i + 0.5) / days.length) * 100}%` }}
            >
              <span className="font-bold">{hover.count}</span> · {formatDate(hover.date)}
            </div>
          )}
          <div className="mt-2 flex justify-between text-[10px] text-slate-400">
            <span>{formatDate(days[0]?.date)}</span>
            <span>{formatDate(days.at(-1)?.date)}</span>
          </div>
        </div>
      </div>

      <table id={tableId} className="sr-only">
        <caption>{label}</caption>
        <thead>
          <tr>
            <th>{t("submissionDate")}</th>
            <th>{t("totalSubmissions")}</th>
          </tr>
        </thead>
        <tbody>
          {days.map((d) => (
            <tr key={d.date}>
              <td>{formatDate(d.date)}</td>
              <td>{d.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
