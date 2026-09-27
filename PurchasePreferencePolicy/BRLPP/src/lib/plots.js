import { findUnit, formatArea, toAcres } from "./area";
import { formatNumber } from "./format";

let rowSeq = 0;
// Stable client-side key for React lists (not persisted).
export const newPlot = (areaUnit = "acre", landType = "") => ({
  id: `p${Date.now().toString(36)}${(rowSeq++).toString(36)}`,
  khataNo: "",
  khesraNo: "",
  jamabandiNo: "",
  area: "",
  areaUnit,
  landType,
});

// Khata / Khesra / Jamabandi numbers: English letters and digits only.
export const ALNUM_RE = /^[A-Za-z0-9]+$/;
export const toAlnum = (v) => String(v ?? "").replace(/[^A-Za-z0-9]/g, "");

// Plots of a saved application. Older submissions stored a single Khata/Khesra
// at the top level; they are presented as one plot so every screen works for both.
export function getPlots(app) {
  if (Array.isArray(app?.plots) && app.plots.length) return app.plots;
  if (!app || (!app.khataNo && !app.khesraNo)) return [];
  return [
    {
      khataNo: app.khataNo || "",
      khesraNo: app.khesraNo || "",
      jamabandiNo: app.jamabandiNo || "",
      area: app.area ?? "",
      areaUnit: app.areaUnit || "",
      areaAcres: app.areaAcres ?? toAcres(app.area, app.areaUnit),
      landType: app.landType || "",
    },
  ];
}

// Unique land-type values across plots, comma-joined (stored as the summary `landType`).
export const joinLandTypes = (plots) => [...new Set(plots.map((p) => p.landType).filter(Boolean))].join(",");

export const totalAcres = (plots) =>
  Math.round(plots.reduce((sum, p) => sum + (Number(p.areaAcres) || toAcres(p.area, p.areaUnit) || 0), 0) * 10000) / 10000;

const uniqueJoined = (values) => [...new Set(values.map((v) => String(v || "").trim()).filter(Boolean))].join(", ");
export const joinKhata = (plots) => uniqueJoined(plots.map((p) => p.khataNo));
export const joinKhesra = (plots) => uniqueJoined(plots.map((p) => p.khesraNo));

// Single plot: "2.5 Bigha"; several plots: "3 plots · 2.35 acres".
export function formatTotalArea(app, lang = "en", t) {
  const plots = getPlots(app);
  if (plots.length <= 1) {
    const p = plots[0];
    return p ? formatArea(p.area, p.areaUnit, lang) : "—";
  }
  const acres = formatNumber(totalAcres(plots), 2);
  const unit = findUnit("acre")[lang] || "acres";
  return t ? t("plotsTotal", { n: plots.length, area: `${acres} ${unit}` }) : `${plots.length} plots · ${acres} ${unit}`;
}
