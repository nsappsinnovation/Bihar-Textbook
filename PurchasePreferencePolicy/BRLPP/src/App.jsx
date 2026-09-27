import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import { RequireAdmin, RequireApplicant } from "./components/RouteGuards";
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import ApplyWizard from "./pages/public/ApplyWizard";
import Success from "./pages/public/Success";
import MyApplications from "./pages/public/MyApplications";
import ViewApplication from "./pages/public/ViewApplication";
import { PageLoader } from "./components/ui/Spinner";

// Admin pages are split out so citizens on mobile data download less.
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminApplications = lazy(() => import("./pages/admin/AdminApplications"));
const AdminApplicationView = lazy(() => import("./pages/admin/AdminApplicationView"));
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
            <Route path="/apply" element={applicant(<ApplyWizard />)} />
            <Route path="/success/:id" element={applicant(<Success />)} />
            <Route path="/my-applications" element={applicant(<MyApplications />)} />
            <Route path="/application/:id" element={applicant(<ViewApplication />)} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={adminOnly(<AdminDashboard />)} />
            <Route path="/admin/applications" element={adminOnly(<AdminApplications />)} />
            <Route path="/admin/applications/:id" element={adminOnly(<AdminApplicationView />)} />
            <Route path="/admin/users" element={<RequireAdmin stateOnly><ManageAdmins /></RequireAdmin>} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}
