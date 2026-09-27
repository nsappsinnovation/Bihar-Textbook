import { useParams } from "react-router-dom";
import { FiArrowLeft, FiEdit2 } from "react-icons/fi";
import PublicLayout from "../../components/layout/PublicLayout";
import Card, { PageHeader } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import EmptyState from "../../components/ui/EmptyState";
import { PageLoader } from "../../components/ui/Spinner";
import EnterpriseDetails from "../../components/enterprise/EnterpriseDetails";
import SlipActions from "../../components/enterprise/SlipActions";
import { useT } from "../../i18n/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import { useEnterprise } from "../../lib/useEnterprise";

export default function ViewEnterprise() {
  const { id } = useParams();
  const { t } = useT();
  const { uid } = useAuth();
  const { loading, enterprise, error } = useEnterprise(id, uid);

  return (
    <PublicLayout width="max-w-5xl">
      <Button to="/dashboard" variant="ghost" size="sm" icon={FiArrowLeft} className="no-print mb-4">
        {t("backToDashboard")}
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
              <Button to="/register" variant="secondary" icon={FiEdit2}>
                {t("editDetails")}
              </Button>
            }
          />
          <SlipActions enterprise={enterprise} />
          <EnterpriseDetails enterprise={enterprise} />
          <Alert tone="warning" title={t("disclaimer")}>
            {t("disclaimerText")}
          </Alert>
        </div>
      )}
    </PublicLayout>
  );
}
