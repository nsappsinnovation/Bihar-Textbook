import { doc } from "firebase/firestore";
import { db } from "./firebase";

export const ID_PREFIX = "IDA-RLP";
export const counterRef = () => doc(db, "counters", "applications");

export const formatApplicationId = (year, seq) =>
  `${ID_PREFIX}-${year}-${String(seq).padStart(6, "0")}`;

// Reads the counter inside a Firestore transaction and reserves `count`
// sequential numbers. The sequence restarts every calendar year.
export async function reserveIds(transaction, count = 1, year = new Date().getFullYear()) {
  const ref = counterRef();
  const snap = await transaction.get(ref);
  const data = snap.exists() ? snap.data() : null;
  const start = data && data.year === year ? Number(data.seq) || 0 : 0;
  transaction.set(ref, { year, seq: start + count });
  return Array.from({ length: count }, (_, i) => formatApplicationId(year, start + i + 1));
}
