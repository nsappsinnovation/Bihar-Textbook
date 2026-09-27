import { useEffect, useState } from "react";
import { getApplication } from "./applicationsApi";

// Loads one application. When `ownerMobile` is given, applications belonging
// to other mobiles are treated as not found.
export function useApplication(applicationId, ownerMobile) {
  const [state, setState] = useState({ loading: true, app: null, error: false });

  useEffect(() => {
    let active = true;
    setState({ loading: true, app: null, error: false });
    getApplication(applicationId)
      .then((app) => {
        if (!active) return;
        const allowed = app && (!ownerMobile || app.mobile === ownerMobile);
        setState({ loading: false, app: allowed ? app : null, error: false });
      })
      .catch((err) => {
        // Security rules deny other users' applications: treat as not found.
        if (err?.code !== "permission-denied") console.error(err);
        if (active) setState({ loading: false, app: null, error: err?.code !== "permission-denied" });
      });
    return () => {
      active = false;
    };
  }, [applicationId, ownerMobile]);

  return state;
}
