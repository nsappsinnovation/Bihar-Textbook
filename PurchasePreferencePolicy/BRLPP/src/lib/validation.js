import { ALNUM_RE } from "./plots";

export const MOBILE_RE = /^[6-9]\d{9}$/;
export const AADHAAR_RE = /^[2-9]\d{11}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const BIHAR_BOUNDS = { minLat: 24.2, maxLat: 27.6, minLng: 83.2, maxLng: 88.4 };

export const MAX_PHOTOS = 5;
export const MAX_PHOTO_BYTES = 10 * 1024 * 1024;

const blank = (v) => v === undefined || v === null || String(v).trim() === "";

export const isValidMobile = (v) => MOBILE_RE.test(String(v || "").trim());

// UIDAI Verhoeff checksum: catches mistyped/transposed digits, which a plain
// 12-digit check would accept.
const V_D = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
  [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
  [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
  [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
  [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
  [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
  [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
  [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
];
const V_P = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
  [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
  [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
  [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
  [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
  [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
  [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
];

export function isValidAadhaar(value) {
  const digits = String(value || "").replace(/\D/g, "");
  if (!AADHAAR_RE.test(digits)) return false;
  let c = 0;
  [...digits].reverse().forEach((d, i) => {
    c = V_D[c][V_P[i % 8][Number(d)]];
  });
  return c === 0;
}
export const isValidOtp = (v) => /^\d{6}$/.test(String(v || "").trim());

// Each validator returns { field: translationKey } for failing fields.
// Boundary (Chauhaddi) and GPS/photos are optional.
export function validatePersonal(p) {
  const e = {};
  if (blank(p.name)) e.name = "errRequired";
  else if (String(p.name).trim().length < 3) e.name = "errMinName";
  if (blank(p.fatherHusbandName)) e.fatherHusbandName = "errRequired";
  if (!isValidMobile(p.mobile)) e.mobile = "errMobile";
  if (blank(p.aadhaar)) e.aadhaar = "errRequired";
  else if (!isValidAadhaar(p.aadhaar)) e.aadhaar = "errAadhaar";
  if (!blank(p.email) && !EMAIL_RE.test(String(p.email).trim())) e.email = "errEmail";
  if (blank(p.address)) e.address = "errRequired";
  else if (String(p.address).trim().length < 10) e.address = "errMinAddress";
  return e;
}

export const MAX_PLOTS = 20;

// District → Circle → Mauja. Revenue Thana No. is optional.
export function validateLandSite(l) {
  const e = {};
  if (blank(l.district)) e.district = "errRequired";
  if (blank(l.anchal)) e.anchal = "errRequired";
  if (l.maujaIsOther) {
    if (blank(l.mauja)) e.maujaOther = "errRequired";
  } else if (blank(l.mauja)) e.mauja = "errRequired";
  return e;
}

// Khata / Khesra rows (one or more), each with its own land type. Errors are keyed
// "plots.<index>.<field>"; duplicate Khata + Khesra rows are flagged.
export function validatePlots(l) {
  const e = {};
  const plots = l.plots || [];
  if (!plots.length) e.plots = "errPlotsRequired";
  const seen = new Map();
  plots.forEach((p, i) => {
    const key = (f) => `plots.${i}.${f}`;
    if (blank(p.khataNo)) e[key("khataNo")] = "errRequired";
    else if (!ALNUM_RE.test(String(p.khataNo).trim())) e[key("khataNo")] = "errAlphaNum";
    if (blank(p.khesraNo)) e[key("khesraNo")] = "errRequired";
    else if (!ALNUM_RE.test(String(p.khesraNo).trim())) e[key("khesraNo")] = "errAlphaNum";
    if (!blank(p.jamabandiNo) && !ALNUM_RE.test(String(p.jamabandiNo).trim())) e[key("jamabandiNo")] = "errAlphaNum";
    if (blank(p.landType)) e[key("landType")] = "errRequired";
    if (blank(p.area)) e[key("area")] = "errRequired";
    else if (!(Number(p.area) > 0)) e[key("area")] = "errArea";
    if (blank(p.areaUnit)) e[key("areaUnit")] = "errRequired";
    if (!blank(p.khataNo) && !blank(p.khesraNo)) {
      const dup = `${String(p.khataNo).trim().toLowerCase()}|${String(p.khesraNo).trim().toLowerCase()}`;
      if (seen.has(dup)) e[key("khesraNo")] = "errDuplicatePlot";
      else seen.set(dup, i);
    }
  });
  return e;
}

export function validateLocation(l) {
  const e = {};
  const hasLat = !blank(l.latitude);
  const hasLng = !blank(l.longitude);
  if (hasLat !== hasLng) {
    e[hasLat ? "longitude" : "latitude"] = "errLatLngPair";
  }
  if (hasLat && !(Number(l.latitude) >= -90 && Number(l.latitude) <= 90)) e.latitude = "errLat";
  if (hasLng && !(Number(l.longitude) >= -180 && Number(l.longitude) <= 180)) e.longitude = "errLng";
  if (!blank(l.mapLink)) {
    try {
      const u = new URL(String(l.mapLink).trim());
      if (!/^https?:$/.test(u.protocol)) e.mapLink = "errUrl";
    } catch {
      e.mapLink = "errUrl";
    }
  }
  return e;
}

export const isOutsideBihar = (lat, lng) => {
  if (blank(lat) || blank(lng)) return false;
  const a = Number(lat);
  const b = Number(lng);
  return (
    a < BIHAR_BOUNDS.minLat || a > BIHAR_BOUNDS.maxLat || b < BIHAR_BOUNDS.minLng || b > BIHAR_BOUNDS.maxLng
  );
};
