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

export const mapsUrl = (lat, lng) =>
  lat !== "" && lng !== "" && lat != null && lng != null
    ? `https://www.google.com/maps?q=${lat},${lng}`
    : "";

export const locationUrl = (app) =>
  app?.mapLink || mapsUrl(app?.latitude, app?.longitude);

// Aadhaar is sensitive: shown grouped while typing, masked everywhere the full
// number is not needed (only the admin's application view and Excel show it in full).
export const digitsOnly = (v) => String(v ?? "").replace(/\D/g, "");
export const groupAadhaar = (v) => digitsOnly(v).slice(0, 12).replace(/(\d{4})(?=\d)/g, "$1 ").trim();
export const maskAadhaar = (v) => {
  const d = digitsOnly(v);
  return d.length === 12 ? `XXXX XXXX ${d.slice(-4)}` : d ? groupAadhaar(d) : "";
};
