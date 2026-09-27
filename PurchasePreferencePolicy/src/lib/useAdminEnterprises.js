import { useCallback, useEffect, useState } from "react";
import { fetchEnterprises } from "./adminApi";
import { useAuth } from "../context/AuthContext";

// Short-lived cache so switching between Dashboard and Directory doesn't refetch.
const CACHE_TTL_MS = 60 * 1000;
let cache = { key: null, at: 0, rows: null };

export function useAdminEnterprises() {
  const { admin } = useAuth();
  const key = admin ? `${admin.loginId}|${admin.role}|${admin.district}` : null;
  const fresh = cache.key === key && cache.rows && Date.now() - cache.at < CACHE_TTL_MS;
  const [rows, setRows] = useState(fresh ? cache.rows : []);
  const [loading, setLoading] = useState(!fresh);
  const [error, setError] = useState(false);

  const load = useCallback(
    async (force = false) => {
      if (!admin) return;
      if (!force && cache.key === key && cache.rows && Date.now() - cache.at < CACHE_TTL_MS) {
        setRows(cache.rows);
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(false);
      try {
        const data = await fetchEnterprises(admin);
        cache = { key, at: Date.now(), rows: data };
        setRows(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    },
    [admin, key]
  );

  useEffect(() => {
    load();
  }, [load]);

  return { rows, loading, error, reload: () => load(true) };
}

export const clearAdminCache = () => {
  cache = { key: null, at: 0, rows: null };
};
