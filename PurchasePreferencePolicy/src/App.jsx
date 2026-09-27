import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import { RequireAdmin, RequireApplicant } from "./components/RouteGuards";
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import RegisterWizard from "./pages/public/RegisterWizard";
import Success from "./pages/public/Success";
import Dashboard from "./pages/public/Dashboard";
import ViewEnterprise from "./pages/public/ViewEnterprise";
import { PageLoader } from "./components/ui/Spinner";

// Admin pages are split out so applicants on mobile data download less.
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const EnterpriseDirectory = lazy(() => import("./pages/admin/EnterpriseDirectory"));
const AdminEnterpriseView = lazy(() => import("./pages/admin/AdminEnterpriseView"));
const ManageAdmins = lazy(() => import("./pages/admin/ManageAdmins"));

const applicant = (el) => <RequireApplicant>{el}</RequireApplicant>;
const adminOnly = (el) => <RequireAdmin>{el}</RequireAdmin>;

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={applicant(<RegisterWizard />)} />
            <Route path="/success/:id" element={applicant(<Success />)} />
            <Route path="/dashboard" element={applicant(<Dashboard />)} />
            <Route path="/enterprise/:id" element={applicant(<ViewEnterprise />)} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={adminOnly(<AdminDashboard />)} />
            <Route path="/admin/directory" element={adminOnly(<EnterpriseDirectory />)} />
            <Route path="/admin/enterprises/:id" element={adminOnly(<AdminEnterpriseView />)} />
            <Route path="/admin/users" element={<RequireAdmin stateOnly><ManageAdmins /></RequireAdmin>} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}
