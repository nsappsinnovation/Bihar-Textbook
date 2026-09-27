import { useState } from "react";
import { FiCrosshair, FiPlus, FiTrash2 } from "react-icons/fi";
import Alert from "../ui/Alert";
import Spinner from "../ui/Spinner";
import { Input } from "../ui/Field";
import BoundaryView from "./BoundaryView";
import { useT } from "../../i18n/LanguageContext";
import { newCorner } from "../../lib/enterprisesApi";
import { MAX_CORNERS, isOutsideBihar, isPoint } from "../../lib/geo";

const clean = (v) => v.replace(/[^\d.-]/g, "");

/**
 * Unit boundary corners, in order around the unit. Each corner can be captured from
 * the device GPS while standing at it, or typed in. Errors: "boundary.<i>.<lat|lng>".
 */
export default function BoundaryCorners({ corners, onChange, errors = {} }) {
  const { t } = useT();
  // { [cornerId]: { state: "loading" | "success" | "error", accuracy?, message? } }
  const [gps, setGps] = useState({});

  const update = (id, patch) => onChange(corners.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  const remove = (id) => onChange(corners.filter((c) => c.id !== id));

  const capture = (id) => {
    if (!("geolocation" in navigator)) {
      setGps((g) => ({ ...g, [id]: { state: "error", message: "gpsUnsupported" } }));
      return;
    }
    setGps((g) => ({ ...g, [id]: { state: "loading" } }));
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        update(id, { lat: latitude.toFixed(6), lng: longitude.toFixed(6) });
        setGps((g) => ({ ...g, [id]: { state: "success", accuracy: Math.round(accuracy) } }));
      },
      (err) => setGps((g) => ({ ...g, [id]: { state: "error", message: err.code === 1 ? "gpsDenied" : "gpsUnavailable" } })),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
    );
  };

  const outside = corners.some(isOutsideBihar);
  const valid = corners.filter(isPoint);

  return (
    <div className="space-y-4">
      <p className="rounded-2xl border border-dashed border-brand-200 bg-brand-50/50 p-4 text-sm text-slate-600">{t("boundaryHowTo")}</p>

      <ol className="space-y-3">
        {corners.map((c, i) => {
          const g = gps[c.id] || {};
          return (
            <li key={c.id} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-3 sm:p-4">
              <div className="flex flex-wrap items-end gap-3">
                <span className="mb-3 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-700 text-xs font-bold text-white" title={t("cornerN", { n: i + 1 })}>
                  {i + 1}
                </span>
                <Input
                  name={`boundary.${i}.lat`}
                  label={t("latitude")}
                  inputMode="decimal"
                  placeholder="25.594095"
                  className="min-w-[8.5rem] flex-1"
                  value={c.lat}
                  onChange={(e) => update(c.id, { lat: clean(e.target.value) })}
                  error={errors[`boundary.${i}.lat`]}
                />
                <Input
                  name={`boundary.${i}.lng`}
                  label={t("longitude")}
                  inputMode="decimal"
                  placeholder="85.137566"
                  className="min-w-[8.5rem] flex-1"
                  value={c.lng}
                  onChange={(e) => update(c.id, { lng: clean(e.target.value) })}
                  error={errors[`boundary.${i}.lng`]}
                />
                <div className="mb-0.5 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => capture(c.id)}
                    disabled={g.state === "loading"}
                    className="inline-flex items-center gap-1.5 rounded-full bg-brand-700 px-3.5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-brand-900 disabled:opacity-60"
                  >
                    {g.state === "loading" ? <Spinner className="h-3.5 w-3.5" light /> : <FiCrosshair className="h-3.5 w-3.5" />}
                    {t("captureHere")}
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(c.id)}
                    aria-label={t("remove")}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {g.state === "success" && <p className="mt-2 pl-10 text-xs font-medium text-gold-800">{t("gpsCaptured", { m: g.accuracy })}</p>}
              {g.state === "error" && <p className="mt-2 pl-10 text-xs font-medium text-red-600">{t(g.message)}</p>}
            </li>
          );
        })}
      </ol>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" data-field="boundary">
        {corners.length < MAX_CORNERS ? (
          <button
            type="button"
            onClick={() => onChange([...corners, newCorner()])}
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-brand-200 px-4 py-3 text-sm font-semibold text-brand-800 transition hover:border-brand-400 hover:bg-brand-50"
          >
            <FiPlus className="h-4 w-4" />
            {t("addCorner")}
          </button>
        ) : (
          <p className="text-xs text-slate-500">{t("maxCornersReached", { n: MAX_CORNERS })}</p>
        )}
        <p className="rounded-xl bg-gold-50 px-4 py-2.5 text-sm font-semibold text-gold-800 ring-1 ring-gold-200">
          {t("cornersCount", { n: valid.length })}
        </p>
      </div>

      {errors.boundary && <Alert tone="error">{t(errors.boundary)}</Alert>}
      {outside && <Alert tone="warning">{t("outsideBihar")}</Alert>}
      {valid.length >= 3 && <BoundaryView points={valid} compact />}
    </div>
  );
}
