import { FiPlus, FiTrash2 } from "react-icons/fi";
import { Input, Select } from "../ui/Field";
import { useT } from "../../i18n/LanguageContext";
import { AREA_UNITS } from "../../data/areaUnits";
import { findUnit } from "../../lib/area";
import { formatNumber } from "../../lib/format";
import { newPlot, toAlnum, totalAcres } from "../../lib/plots";
import { LAND_TYPES } from "../../data/landTypes";
import { MAX_PLOTS } from "../../lib/validation";

/**
 * Repeatable Khata / Khesra rows for one Mauja. Each row: Khata No. and
 * Khesra/Plot No. side by side, then Area + Unit, optional Jamabandi No. and
 * the land type. Numbers accept English letters and digits only.
 * Errors are keyed "plots.<index>.<field>".
 */
export default function PlotRows({ plots, onChange, errors = {} }) {
  const { t, lang } = useT();
  const unitOptions = AREA_UNITS.map((u) => ({ value: u.value, label: u[lang] }));
  const landTypeOptions = LAND_TYPES.map((x) => ({ value: x.value, label: x[lang] }));

  const update = (index, field, value) => onChange(plots.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
  // New rows start with the previous row's unit and land type (editable).
  const add = () => onChange([...plots, newPlot(plots.at(-1)?.areaUnit || "acre", plots.at(-1)?.landType || "")]);
  const remove = (index) => onChange(plots.filter((_, i) => i !== index));

  const acres = totalAcres(plots.filter((p) => Number(p.area) > 0));
  const err = (i, f) => errors[`plots.${i}.${f}`];

  return (
    <div className="space-y-4">
      {plots.map((plot, i) => (
        <div
          key={plot.id}
          className={`rounded-2xl border bg-slate-50/60 p-4 sm:p-5 ${
            Object.keys(errors).some((k) => k.startsWith(`plots.${i}.`)) ? "border-red-200" : "border-slate-200"
          }`}
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-slate-800">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-700 text-xs text-white">{i + 1}</span>
              {t("plotN", { n: i + 1 })}
            </span>
            {plots.length > 1 && (
              <button
                type="button"
                onClick={() => remove(i)}
                className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-500 transition hover:bg-red-50 hover:text-red-600"
              >
                <FiTrash2 className="h-3.5 w-3.5" />
                {t("removePlot")}
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <Input
              name={`plots.${i}.khataNo`}
              label={t("khataNo")}
              required
              maxLength={40}
              value={plot.khataNo}
              autoCapitalize="characters"
              onChange={(e) => update(i, "khataNo", toAlnum(e.target.value))}
              error={err(i, "khataNo")}
            />
            <Input
              name={`plots.${i}.khesraNo`}
              label={t("khesraNo")}
              required
              maxLength={40}
              value={plot.khesraNo}
              autoCapitalize="characters"
              onChange={(e) => update(i, "khesraNo", toAlnum(e.target.value))}
              error={err(i, "khesraNo")}
            />
          </div>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:mt-4 sm:grid-cols-2 sm:gap-4">
            <div className="grid grid-cols-5 gap-3">
              <Input
                name={`plots.${i}.area`}
                label={t("area")}
                required
                className="col-span-3"
                inputMode="decimal"
                placeholder="0.00"
                value={plot.area}
                onChange={(e) => update(i, "area", e.target.value.replace(/[^\d.]/g, ""))}
                error={err(i, "area")}
              />
              <Select
                name={`plots.${i}.areaUnit`}
                label={t("areaUnit")}
                className="col-span-2"
                options={unitOptions}
                value={plot.areaUnit}
                onChange={(e) => update(i, "areaUnit", e.target.value)}
                error={err(i, "areaUnit")}
              />
            </div>
            <Select
              name={`plots.${i}.landType`}
              label={t("landType")}
              required
              placeholder={t("select")}
              options={landTypeOptions}
              value={plot.landType || ""}
              onChange={(e) => update(i, "landType", e.target.value)}
              error={err(i, "landType")}
            />
            <Input
              name={`plots.${i}.jamabandiNo`}
              label={t("jamabandiNo")}
              optional={t("ifAvailable")}
              maxLength={40}
              autoCapitalize="characters"
              value={plot.jamabandiNo}
              onChange={(e) => update(i, "jamabandiNo", toAlnum(e.target.value))}
              error={err(i, "jamabandiNo")}
            />
          </div>
        </div>
      ))}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {plots.length < MAX_PLOTS ? (
          <button
            type="button"
            onClick={add}
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-brand-200 px-4 py-3 text-sm font-semibold text-brand-800 transition hover:border-brand-400 hover:bg-brand-50"
          >
            <FiPlus className="h-4 w-4" />
            {t("addPlot")}
          </button>
        ) : (
          <p className="text-xs text-slate-500">{t("maxPlotsReached", { n: MAX_PLOTS })}</p>
        )}
        <p className="rounded-xl bg-gold-50 px-4 py-2.5 text-sm font-semibold text-gold-800 ring-1 ring-gold-200">
          {t("plotsCount", { n: plots.length })} · {t("totalAreaApprox", { area: `${formatNumber(acres, 2)} ${findUnit("acre")[lang]}` })}
        </p>
      </div>
    </div>
  );
}
