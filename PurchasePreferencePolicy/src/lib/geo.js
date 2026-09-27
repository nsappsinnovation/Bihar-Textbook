// Helpers for the unit's GIS boundary: an ordered list of corner points { lat, lng }.

export const MAX_CORNERS = 20;
export const MIN_CORNERS = 3;
const BIHAR_BOUNDS = { minLat: 24.2, maxLat: 27.6, minLng: 83.2, maxLng: 88.4 };
const SQM_PER_ACRE = 4046.8564224;

const num = (v) => (v === "" || v === null || v === undefined ? NaN : Number(v));
export const isPoint = (p) => Number.isFinite(num(p?.lat)) && Number.isFinite(num(p?.lng));

export const isOutsideBihar = (p) =>
  isPoint(p) &&
  (num(p.lat) < BIHAR_BOUNDS.minLat || num(p.lat) > BIHAR_BOUNDS.maxLat || num(p.lng) < BIHAR_BOUNDS.minLng || num(p.lng) > BIHAR_BOUNDS.maxLng);

export const centroid = (points) => {
  const pts = points.filter(isPoint);
  if (!pts.length) return null;
  return {
    lat: pts.reduce((s, p) => s + num(p.lat), 0) / pts.length,
    lng: pts.reduce((s, p) => s + num(p.lng), 0) / pts.length,
  };
};

// Local metres (equirectangular around the centroid) – accurate enough for a unit's plot.
const toMetres = (points) => {
  const c = centroid(points);
  const k = Math.cos((c.lat * Math.PI) / 180);
  return points.filter(isPoint).map((p) => ({ x: (num(p.lng) - c.lng) * 111320 * k, y: (num(p.lat) - c.lat) * 110574 }));
};

// Shoelace area of the polygon in square metres (0 for fewer than 3 corners).
export function areaSqm(points) {
  const pts = points.filter(isPoint);
  if (pts.length < MIN_CORNERS) return 0;
  const m = toMetres(pts);
  let twice = 0;
  m.forEach((a, i) => {
    const b = m[(i + 1) % m.length];
    twice += a.x * b.y - b.x * a.y;
  });
  return Math.abs(twice) / 2;
}

export const sqmToAcres = (sqm) => sqm / SQM_PER_ACRE;

export const mapsUrl = (p) => (p ? `https://www.google.com/maps?q=${num(p.lat).toFixed(6)},${num(p.lng).toFixed(6)}` : "");

// Normalised outline for drawing: points scaled into a size × size box (y flipped for SVG).
export function outlinePath(points, size = 100, pad = 8) {
  const m = toMetres(points.filter(isPoint));
  if (m.length < 2) return null;
  const xs = m.map((p) => p.x);
  const ys = m.map((p) => p.y);
  const span = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)) || 1;
  const scale = (size - pad * 2) / span;
  const offX = (size - (Math.max(...xs) - Math.min(...xs)) * scale) / 2;
  const offY = (size - (Math.max(...ys) - Math.min(...ys)) * scale) / 2;
  return m.map((p) => ({ x: offX + (p.x - Math.min(...xs)) * scale, y: size - (offY + (p.y - Math.min(...ys)) * scale) }));
}

// GeoJSON Polygon (lng, lat order, closed ring) for GIS tools.
export function toGeoJson(points, properties = {}) {
  const ring = points.filter(isPoint).map((p) => [num(p.lng), num(p.lat)]);
  if (ring.length >= MIN_CORNERS) ring.push(ring[0]);
  return { type: "Feature", properties, geometry: { type: "Polygon", coordinates: [ring] } };
}
