import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useT } from "../../i18n/LanguageContext";

export default function Pagination({ page, pages, pageSize, onPage, onPageSize, sizes = [10, 25, 50] }) {
  const { t } = useT();
  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 text-sm text-slate-600 sm:flex-row sm:px-6">
      <label className="flex items-center gap-2">
        <span className="text-xs font-medium text-slate-500">{t("rowsPerPage")}</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSize(Number(e.target.value))}
          className="rounded-lg border border-brand-900/15 bg-white px-2 py-1.5 text-sm focus:border-brand-600 focus:outline-none focus:ring-4 focus:ring-brand-600/10"
        >
          {sizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPage(page - 1)}
          disabled={page <= 1}
          className="inline-flex items-center gap-1 rounded-lg border border-brand-900/15 bg-white px-3 py-1.5 text-xs font-semibold shadow-sm transition hover:bg-slate-50 disabled:opacity-40"
        >
          <FiChevronLeft className="h-4 w-4" /> {t("prev")}
        </button>
        <span className="px-2 text-xs font-medium text-slate-500">{t("pageOf", { page, pages: Math.max(pages, 1) })}</span>
        <button
          onClick={() => onPage(page + 1)}
          disabled={page >= pages}
          className="inline-flex items-center gap-1 rounded-lg border border-brand-900/15 bg-white px-3 py-1.5 text-xs font-semibold shadow-sm transition hover:bg-slate-50 disabled:opacity-40"
        >
          {t("nextPage")} <FiChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
