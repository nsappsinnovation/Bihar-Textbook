import { SECTOR_OTHERS } from "../data/sectors";
import { CAPACITY_UNIT_OTHER } from "../data/capacityUnits";
import { MAX_CORNERS, MIN_CORNERS } from "./geo";

export const MOBILE_RE = /^[6-9]\d{9}$/;
// Udyam Registration Number, e.g. UDYAM-BR-26-0012345.
export const UDYAM_RE = /^UDYAM-[A-Z]{2}-\d{2}-\d{7}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const MAX_PRODUCTS = 50;
export const MAX_PHOTOS = 5;
export const MAX_PHOTO_BYTES = 10 * 1024 * 1024;
export const MAX_EMPLOYEES = 1000000;
export const MAX_PROJECT_COST_LAKH = 10000000;

const blank = (v) => v === undefined || v === null || String(v).trim() === "";

export const isValidMobile = (v) => MOBILE_RE.test(String(v || "").trim());
export const isValidOtp = (v) => /^\d{6}$/.test(String(v || "").trim());

// Each validator returns { field: translationKey } for failing fields.
export function validateContact(p) {
  const e = {};
  if (blank(p.name)) e.name = "errRequired";
  else if (String(p.name).trim().length < 3) e.name = "errMinName";
  if (!isValidMobile(p.mobile)) e.mobile = "errMobile";
  if (!blank(p.email) && !EMAIL_RE.test(String(p.email).trim())) e.email = "errEmail";
  if (blank(p.address)) e.address = "errRequired";
  else if (String(p.address).trim().length < 10) e.address = "errMinAddress";
  return e;
}

// Unit name, location, District → Block, city/town and sector.
export function validateUnit(u) {
  const e = {};
  if (blank(u.unitName)) e.unitName = "errRequired";
  else if (String(u.unitName).trim().length < 2) e.unitName = "errMinName";
  if (blank(u.unitLocation)) e.unitLocation = "errRequired";
  else if (String(u.unitLocation).trim().length < 5) e.unitLocation = "errMinAddress";
  if (blank(u.district)) e.district = "errRequired";
  if (u.blockIsOther) {
    if (String(u.block || "").trim().length < 2) e.blockOther = "errRequired";
  } else if (blank(u.block)) e.block = "errRequired";
  if (String(u.city || "").trim().length < 2) e.city = "errRequired";
  if (blank(u.sector)) e.sector = "errRequired";
  else if (u.sector === SECTOR_OTHERS && String(u.sectorOther || "").trim().length < 2) e.sectorOther = "errRequired";
  return e;
}

// One or more products. Errors are keyed "products.<index>.<field>"; duplicate names are flagged.
export function validateProducts(products = []) {
  const e = {};
  if (!products.length) e.products = "errProductsRequired";
  const seen = new Set();
  products.forEach((p, i) => {
    const key = (f) => `products.${i}.${f}`;
    const name = String(p.productName || "").trim();
    if (!name) e[key("productName")] = "errRequired";
    else if (name.length < 2) e[key("productName")] = "errMinName";
    else if (seen.has(name.toLowerCase())) e[key("productName")] = "errDuplicateProduct";
    else seen.add(name.toLowerCase());
    if (blank(p.productionCapacity)) e[key("productionCapacity")] = "errRequired";
    else if (!(Number(p.productionCapacity) > 0)) e[key("productionCapacity")] = "errPositive";
    if (blank(p.capacityUnit)) e[key("capacityUnit")] = "errRequired";
    else if (p.capacityUnit === CAPACITY_UNIT_OTHER && String(p.capacityUnitOther || "").trim().length < 1) {
      e[key("capacityUnitOther")] = "errRequired";
    }
  });
  return e;
}

// Project cost (₹ lakh), direct / indirect employment and Udyam Registration No.
export function validateEmployment(m) {
  const e = {};
  if (blank(m.projectCost)) e.projectCost = "errRequired";
  else if (!(Number(m.projectCost) > 0) || Number(m.projectCost) > MAX_PROJECT_COST_LAKH) e.projectCost = "errPositive";
  ["directEmployees", "directEmployeesBihar", "indirectEmployees"].forEach((f) => {
    if (blank(m[f])) e[f] = "errRequired";
    else if (!/^\d+$/.test(String(m[f])) || Number(m[f]) > MAX_EMPLOYEES) e[f] = "errWholeNumber";
  });
  if (!e.directEmployees && !e.directEmployeesBihar && Number(m.directEmployeesBihar) > Number(m.directEmployees)) {
    e.directEmployeesBihar = "errBiharExceedsTotal";
  }
  if (blank(m.udyamRegistrationNo)) e.udyamRegistrationNo = "errRequired";
  else if (!UDYAM_RE.test(String(m.udyamRegistrationNo).trim())) e.udyamRegistrationNo = "errUdyam";
  return e;
}

// Optional GIS boundary: fully empty rows are ignored; otherwise each corner needs a valid
// latitude and longitude, and a boundary needs at least MIN_CORNERS corners.
// Errors are keyed "boundary.<index>.<lat|lng>" and "boundary".
export function validateBoundary(corners = []) {
  const e = {};
  let filled = 0;
  corners.forEach((c, i) => {
    const hasLat = !blank(c.lat);
    const hasLng = !blank(c.lng);
    if (!hasLat && !hasLng) return;
    filled += 1;
    if (!hasLat) e[`boundary.${i}.lat`] = "errLatLngPair";
    else if (!(Number(c.lat) >= -90 && Number(c.lat) <= 90)) e[`boundary.${i}.lat`] = "errLat";
    if (!hasLng) e[`boundary.${i}.lng`] = "errLatLngPair";
    else if (!(Number(c.lng) >= -180 && Number(c.lng) <= 180)) e[`boundary.${i}.lng`] = "errLng";
  });
  if (filled > 0 && filled < MIN_CORNERS) e.boundary = "errMinCorners";
  if (filled > MAX_CORNERS) e.boundary = "errMaxCorners";
  return e;
}
