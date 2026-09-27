import { useCallback, useEffect, useState } from "react";
import { getEnterprise } from "./enterprisesApi";

// Loads one enterprise with its products. When `ownerUid` is given, enterprises
// belonging to other accounts are treated as not found.
export function useEnterprise(enterpriseId, ownerUid) {
  const [state, setState] = useState({ loading: true, enterprise: null, error: false });
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let active = true;
    setState({ loading: true, enterprise: null, error: false });
    getEnterprise(enterpriseId)
      .then((enterprise) => {
        if (!active) return;
        const allowed = enterprise && (!ownerUid || enterprise.ownerUid === ownerUid);
        setState({ loading: false, enterprise: allowed ? enterprise : null, error: false });
      })
      .catch((err) => {
        // Security rules deny other users' enterprises: treat as not found.
        if (err?.code !== "permission-denied") console.error(err);
        if (active) setState({ loading: false, enterprise: null, error: err?.code !== "permission-denied" });
      });
    return () => {
      active = false;
    };
  }, [enterpriseId, ownerUid, version]);

  const reload = useCallback(() => setVersion((v) => v + 1), []);
  return { ...state, reload };
}
