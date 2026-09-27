/**
 * Ranked horizontal bars for category counts (single series → one hue, no legend).
 * Length carries the magnitude; the value and share are labelled directly, so the
 * chart never depends on colour alone. Rows can be clicked to filter a list.
 */
export default function BarList({ items, onSelect, emptyText, total, unitLabel }) {
  if (!items.length) return <p className="py-6 text-center text-sm text-slate-400">{emptyText}</p>;
  const max = Math.max(...items.map((i) => i.value));
  const sum = total ?? items.reduce((s, i) => s + i.value, 0);

  return (
    <ul className="space-y-3">
      {items.map((item) => {
        const share = sum ? Math.round((item.value / sum) * 100) : 0;
        const Row = onSelect ? "button" : "div";
        return (
          <li key={item.key}>
            <Row
              {...(onSelect ? { type: "button", onClick: () => onSelect(item) } : {})}
              className={`group block w-full text-left ${onSelect ? "cursor-pointer" : ""}`}
              title={`${item.label}: ${item.value}${unitLabel ? ` ${unitLabel}` : ""}`}
            >
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="truncate font-medium text-slate-700 group-hover:text-brand-800">
                  {item.label}
                  {item.sub && <span className="ml-1.5 text-xs font-normal text-slate-400">{item.sub}</span>}
                </span>
                <span className="shrink-0 tabular-nums">
                  <span className="font-bold text-slate-900">{item.value}</span>
                  <span className="ml-1.5 text-xs text-slate-400">{share}%</span>
                </span>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <div className="h-2 flex-1 overflow-hidden rounded-[2px] bg-slate-100">
                  <div
                    className="h-full rounded-r-[4px] bg-brand-700 transition-all duration-500 group-hover:bg-brand-900"
                    style={{ width: `${Math.max(2, (item.value / max) * 100)}%` }}
                  />
                </div>
                {item.secondary && <span className="w-24 shrink-0 text-right text-xs tabular-nums text-slate-500">{item.secondary}</span>}
              </div>
            </Row>
          </li>
        );
      })}
    </ul>
  );
}
