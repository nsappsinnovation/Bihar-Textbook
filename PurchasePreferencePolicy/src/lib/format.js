import { unitLabel } from "./locations";

const pad = (n) => String(n).padStart(2, "0");

export const toDate = (value) => {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value.toDate === "function") return value.toDate();
  if (typeof value === "number" || typeof value === "string") return new Date(value);
  if (typeof value.seconds === "number") return new Date(value.seconds * 1000);
  return null;
};

export const isoDate = (value = new Date()) => {
  const d = toDate(value);
  if (!d || Number.isNaN(d.getTime())) return "";
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

export const formatDate = (value) => {
  const d = toDate(value);
  if (!d || Number.isNaN(d.getTime())) return "—";
  return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}`;
};

export const formatDateTime = (value) => {
  const d = toDate(value);
  if (!d || Number.isNaN(d.getTime())) return "—";
  return `${formatDate(d)} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export const formatNumber = (n, digits = 2) =>
  Number(n || 0).toLocaleString("en-IN", { maximumFractionDigits: digits });

export const digitsOnly = (v) => String(v ?? "").replace(/\D/g, "");

// Project cost is captured in ₹ lakh.
export const formatLakh = (n, t) =>
  n === "" || n === null || n === undefined ? "" : `₹ ${formatNumber(n, 2)} ${t("lakhShort")}`;

// "1,20,000 Metric Tonne (MT)" for a product row.
export const formatCapacity = (product, lang) =>
  product?.productionCapacity === "" || product?.productionCapacity == null
    ? ""
    : `${formatNumber(product.productionCapacity, 2)} ${unitLabel(product.capacityUnit, lang)}`.trim();

// Udyam numbers are typed in any case/spacing; store them as UDYAM-XX-00-0000000.
export const normalizeUdyam = (v) => String(v ?? "").toUpperCase().replace(/\s+/g, "");

// Share of direct employees who are from Bihar, as a whole percentage (null when unknown).
export const biharShare = (e) => {
  const total = Number(e?.directEmployees);
  const bihar = e?.directEmployeesBihar;
  if (bihar === "" || bihar === null || bihar === undefined || !(total > 0)) return null;
  return Math.round((Number(bihar) / total) * 100);
};
