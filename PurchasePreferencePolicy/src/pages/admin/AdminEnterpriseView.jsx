import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FiArrowLeft, FiPrinter, FiFileText } from "react-icons/fi";
import AdminLayout from "../../components/layout/AdminLayout";
import Card, { PageHeader } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";
import { PageLoader } from "../../components/ui/Spinner";
import EnterpriseDetails from "../../components/enterprise/EnterpriseDetails";
import { useT } from "../../i18n/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import { useEnterprise } from "../../lib/useEnterprise";
import { ROLE_STATE } from "../../lib/adminApi";
import { nodeToPdf } from "../../lib/exporters";

export default function AdminEnterpriseView() {
  const { id } = useParams();
  const { t } = useT();
  const { admin } = useAuth();
  const { loading, enterprise: loaded, error } = useEnterprise(id);
  const detailsRef = useRef(null);
  const [exporting, setExporting] = useState(false);

  // District admins may only open enterprises from their own district.
  const enterprise = loaded && (admin?.role === ROLE_STATE || loaded.district === admin?.district) ? loaded : null;

  const exportPdf = async () => {
    setExporting(true);
    try {
      await nodeToPdf(detailsRef.current, `${enterprise.registrationId}.pdf`);
    } catch (err) {
      console.error(err);
    } finally {
      setExporting(false);
    }
  };

  return (
    <AdminLayout>
      <Button to="/admin/directory" variant="ghost" size="sm" icon={FiArrowLeft} className="no-print mb-4">
        {t("backToDirectory")}
      </Button>
      {loading ? (
        <PageLoader label={t("loading")} />
      ) : !enterprise ? (
        <Card>
          <EmptyState title={t(error ? "errLoad" : "notFound")} />
        </Card>
      ) : (
        <div className="space-y-6">
          <PageHeader
            eyebrow={t("registrationDetails")}
            title={enterprise.unitName}
            subtitle={enterprise.registrationId}
            actions={
              <>
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
              <img src="/dept-industries.png" alt="" className="h-12 w-12 object-contain" />
              <div>
                <p className="font-bold">{t("deptName")}</p>
                <p className="text-sm text-slate-600">{t("portalTitle")}</p>
              </div>
            </div>
            <EnterpriseDetails enterprise={enterprise} geoJsonName={enterprise.registrationId} />
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
