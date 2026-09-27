import { useT } from "../../i18n/LanguageContext";

export default function BrandMark({ compact = false, subtitle }) {
  const { t } = useT();
  return (
    <div className="flex min-w-0 items-center gap-3">
      <img src="/dept-industries.png" alt={t("deptTitle")} className="h-11 w-11 shrink-0 object-contain" />
      <div className="min-w-0 leading-tight">
        <p className="truncate text-sm font-bold text-slate-900 sm:text-base">
          {compact ? t("portalTitle") : t("deptTitle")}
        </p>
        <p className="truncate text-xs text-slate-500">{subtitle || t("govBihar")}</p>
      </div>
    </div>
  );
}
