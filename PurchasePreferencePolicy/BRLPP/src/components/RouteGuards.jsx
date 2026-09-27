import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PageLoader } from "./ui/Spinner";

export function RequireApplicant({ children }) {
  const { ready, mobile } = useAuth();
  const location = useLocation();
  if (!ready) return <PageLoader />;
  if (!mobile) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return children;
}

export function RequireAdmin({ children, stateOnly = false }) {
  const { ready, admin } = useAuth();
  if (!ready) return <PageLoader />;
  if (!admin) return <Navigate to="/admin/login" replace />;
  if (stateOnly && admin.role !== "state") return <Navigate to="/admin" replace />;
  return children;
}
