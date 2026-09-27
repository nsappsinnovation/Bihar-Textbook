import { useT } from "../../i18n/LanguageContext";

export default function BrandMark({ compact = false, subtitle }) {
  const { t } = useT();
  return (
    <div className="flex min-w-0 items-center gap-3">
      <img src="/bihar-seal.png" alt={t("govBihar")} className="h-11 w-11 shrink-0 object-contain" />
      <div className="min-w-0 leading-tight">
        <p className="truncate text-sm font-bold text-slate-900 sm:text-base">
          {compact ? t("portalTitle") : t("govBihar")}
        </p>
        <p className="truncate text-xs text-slate-500">{subtitle || t("idaName")}</p>
      </div>
    </div>
  );
}
