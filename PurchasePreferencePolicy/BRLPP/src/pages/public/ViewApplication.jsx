import { useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import PublicLayout from "../../components/layout/PublicLayout";
import Card, { PageHeader } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import EmptyState from "../../components/ui/EmptyState";
import { PageLoader } from "../../components/ui/Spinner";
import ApplicationDetails from "../../components/application/ApplicationDetails";
import AcknowledgementActions from "../../components/application/AcknowledgementActions";
import { useT } from "../../i18n/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import { useApplication } from "../../lib/useApplication";

export default function ViewApplication() {
  const { id } = useParams();
  const { t } = useT();
  const { mobile } = useAuth();
  const { loading, app, error } = useApplication(id, mobile);

  return (
    <PublicLayout width="max-w-5xl">
      <Button to="/my-applications" variant="ghost" size="sm" icon={FiArrowLeft} className="no-print mb-4">
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
          <PageHeader eyebrow={t("applicationDetails")} title={app.applicationId} subtitle={t("portalTitle")} />
          <AcknowledgementActions app={app} printAck={false} />
          <ApplicationDetails app={app} />
          <Alert tone="warning" title={t("disclaimer")}>
            {t("disclaimerText")}
          </Alert>
        </div>
      )}
    </PublicLayout>
  );
}
