import { ppDoc } from "./firebase";

// Enterprise registration IDs: BPPP-<year>-<6-digit sequence>, e.g. BPPP-2026-000124.
export const ID_PREFIX = "BPPP";
export const counterRef = () => ppDoc("counters", "enterprises");

export const formatRegistrationId = (year, seq) =>
  `${ID_PREFIX}-${year}-${String(seq).padStart(6, "0")}`;

// Reads the counter inside a Firestore transaction and reserves `count`
// sequential numbers. The sequence restarts every calendar year.
export async function reserveIds(transaction, count = 1, year = new Date().getFullYear()) {
  const ref = counterRef();
  const snap = await transaction.get(ref);
  const data = snap.exists() ? snap.data() : null;
  const start = data && data.year === year ? Number(data.seq) || 0 : 0;
  transaction.set(ref, { year, seq: start + count });
  return Array.from({ length: count }, (_, i) => formatRegistrationId(year, start + i + 1));
}
