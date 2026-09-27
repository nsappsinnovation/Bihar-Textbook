import { useParams } from "react-router-dom";
import { FiCheck, FiPlus, FiGrid } from "react-icons/fi";
import PublicLayout from "../../components/layout/PublicLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import { PageLoader } from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";
import { DetailGrid } from "../../components/application/ApplicationDetails";
import AcknowledgementActions from "../../components/application/AcknowledgementActions";
import { useT } from "../../i18n/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import { useApplication } from "../../lib/useApplication";
import { anchalLabel, districtLabel, maujaLabel } from "../../lib/locations";
import { formatDateTime } from "../../lib/format";
import { formatTotalArea } from "../../lib/plots";

export default function Success() {
  const { id } = useParams();
  const { t, lang } = useT();
  const { mobile } = useAuth();
  const { loading, app, error } = useApplication(id, mobile);

  if (loading) {
    return (
      <PublicLayout width="max-w-3xl">
        <PageLoader label={t("loading")} />
      </PublicLayout>
    );
  }

  if (!app) {
    return (
      <PublicLayout width="max-w-3xl">
        <Card>
          <EmptyState title={t(error ? "errLoad" : "notFound")}>
            <Button to="/my-applications" variant="secondary">
              {t("myApplications")}
            </Button>
          </EmptyState>
        </Card>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout width="max-w-3xl">
      <div className="no-print space-y-6">
        <div className="flex flex-col items-center text-center animate-fade-up">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-100 ring-8 ring-gold-100">
            <FiCheck className="h-10 w-10 text-brand-700" strokeWidth={3} />
          </div>
          <h1 className="mt-5 font-display text-3xl leading-tight text-brand-900 sm:text-4xl">{t("successTitle")}</h1>
          <p className="mt-2 text-sm text-slate-500">{t("successSub")}</p>
        </div>

        <Card className="overflow-hidden">
          <div className="relative overflow-hidden bg-gradient-to-br from-brand-700 to-brand-900 px-6 py-5 text-center text-white">
            <div aria-hidden className="bg-contours-gold pointer-events-none absolute inset-0 opacity-50" />
            <p className={`relative text-xs font-bold text-gold-200 ${lang === "en" ? "uppercase tracking-wider" : ""}`}>{t("applicationId")}</p>
            <p className="relative mt-1 break-all font-mono text-2xl font-extrabold tracking-wide sm:text-3xl">{app.applicationId}</p>
          </div>
          <div className="p-5 sm:p-7">
            <DetailGrid
              items={[
                { label: t("applicantName"), value: app.applicant?.name },
                { label: t("mobileNumber"), value: `+91 ${app.mobile}` },
                { label: t("district"), value: districtLabel(app.district, lang) },
                { label: t("anchal"), value: anchalLabel(app.district, app.anchal, lang) },
                { label: t("mauja"), value: maujaLabel(app.district, app.anchal, app.mauja, lang) },
                { label: t("khataNo"), value: app.khataNo },
                { label: t("khesraNo"), value: app.khesraNo },
                { label: t("area"), value: formatTotalArea(app, lang, t) },
                { label: t("submissionDate"), value: formatDateTime(app.submittedAt) },
              ]}
            />
          </div>
        </Card>

        <AcknowledgementActions app={app} viewTo={`/application/${app.applicationId}`} />

        <Alert tone="warning" title={t("disclaimer")}>
          {t("disclaimerText")}
        </Alert>

        <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-between">
          <Button to="/my-applications" variant="ghost" icon={FiGrid}>
            {t("myApplications")}
          </Button>
          <Button to="/apply" variant="success" icon={FiPlus}>
            {t("addAnotherLand")}
          </Button>
        </div>
      </div>
    </PublicLayout>
  );
}
