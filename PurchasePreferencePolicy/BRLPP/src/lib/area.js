import { AREA_UNITS } from "../data/areaUnits";

export const findUnit = (value) => AREA_UNITS.find((u) => u.value === value);

export const toAcres = (area, unit) => {
  const n = Number(area);
  const u = findUnit(unit);
  if (!Number.isFinite(n) || !u) return 0;
  return Math.round(n * u.toAcres * 10000) / 10000;
};

export const formatArea = (area, unit, lang = "en") => {
  const u = findUnit(unit);
  if (area === undefined || area === null || area === "") return "—";
  return `${area} ${u ? u[lang] || u.en : unit || ""}`.trim();
};
