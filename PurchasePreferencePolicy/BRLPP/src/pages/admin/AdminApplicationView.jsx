import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FiArrowLeft, FiExternalLink, FiPrinter, FiFileText } from "react-icons/fi";
import AdminLayout from "../../components/layout/AdminLayout";
import Card, { PageHeader } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";
import { PageLoader } from "../../components/ui/Spinner";
import ApplicationDetails from "../../components/application/ApplicationDetails";
import { useT } from "../../i18n/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import { useApplication } from "../../lib/useApplication";
import { ROLE_STATE } from "../../lib/adminApi";
import { locationUrl } from "../../lib/format";
import { nodeToPdf } from "../../lib/exporters";

export default function AdminApplicationView() {
  const { id } = useParams();
  const { t } = useT();
  const { admin } = useAuth();
  const { loading, app: loaded, error } = useApplication(id);
  const detailsRef = useRef(null);
  const [exporting, setExporting] = useState(false);

  // District admins may only open applications from their own district.
  const app = loaded && (admin?.role === ROLE_STATE || loaded.district === admin?.district) ? loaded : null;
  const mapUrl = locationUrl(app);

  const exportPdf = async () => {
    setExporting(true);
    try {
      await nodeToPdf(detailsRef.current, `${app.applicationId}.pdf`);
    } catch (err) {
      console.error(err);
    } finally {
      setExporting(false);
    }
  };

  return (
    <AdminLayout>
      <Button to="/admin/applications" variant="ghost" size="sm" icon={FiArrowLeft} className="no-print mb-4">
        {t("backToList")}
      </Button>
      {loading ? (
        <PageLoader label={t("loading")} />
      ) : !app ? (
        <Card>
          <EmptyState title={t(error ? "errLoad" : "notFound")} />
        </Card>
      ) : (
        <div className="space-y-6">
          <PageHeader
            eyebrow={t("applicationDetails")}
            title={app.applicant?.name}
            subtitle={app.applicationId}
            actions={
              <>
                {mapUrl && (
                  <Button href={mapUrl} variant="secondary" icon={FiExternalLink}>
                    {t("openOnMap")}
                  </Button>
                )}
                <Button variant="secondary" icon={FiPrinter} onClick={() => window.print()}>
                  {t("print")}
                </Button>
                <Button icon={FiFileText} loading={exporting} onClick={exportPdf}>
                  {exporting ? t("exporting") : t("exportPdf")}
                </Button>
              </>
            }
          />
          <div ref={detailsRef} className="bg-slate-50">
            <div className="mb-5 hidden items-center gap-3 print:flex">
              <img src="/bihar-seal.png" alt="" className="h-12 w-12 object-contain" />
              <div>
                <p className="font-bold">{t("idaName")}</p>
                <p className="text-sm text-slate-600">{t("portalTitle")}</p>
              </div>
            </div>
            <ApplicationDetails app={app} showAadhaar />
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
