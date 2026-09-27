import { useState } from "react";
import { FiCrosshair, FiExternalLink, FiLink } from "react-icons/fi";
import Button from "../ui/Button";
import Alert from "../ui/Alert";
import { Input } from "../ui/Field";
import { useT } from "../../i18n/LanguageContext";
import { mapsUrl } from "../../lib/format";
import { isOutsideBihar } from "../../lib/validation";

const AUTO_LINK_PREFIX = "https://www.google.com/maps?q=";

export default function LocationFields({ value, onChange, errors = {} }) {
  const { t } = useT();
  const [gps, setGps] = useState({ state: "idle" });

  // Keep the map link in sync with coordinates unless the user typed their own link.
  const withAutoLink = (patch) => {
    const next = { ...value, ...patch };
    if (!value.mapLink || value.mapLink.startsWith(AUTO_LINK_PREFIX)) {
      next.mapLink = mapsUrl(next.latitude, next.longitude);
    }
    return next;
  };

  const capture = () => {
    if (!("geolocation" in navigator)) {
      setGps({ state: "error", message: "gpsUnsupported" });
      return;
    }
    setGps({ state: "loading" });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        onChange(withAutoLink({ latitude: latitude.toFixed(6), longitude: longitude.toFixed(6) }));
        setGps({ state: "success", accuracy: Math.round(accuracy) });
      },
      (err) => setGps({ state: "error", message: err.code === 1 ? "gpsDenied" : "gpsUnavailable" }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
    );
  };

  const preview = value.mapLink || mapsUrl(value.latitude, value.longitude);

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-dashed border-brand-200 bg-brand-50/50 p-4 sm:p-5">
        <p className="text-sm text-slate-600">{t("gpsHint")}</p>
        <Button
          variant="primary"
          size="lg"
          icon={FiCrosshair}
          loading={gps.state === "loading"}
          onClick={capture}
          className="mt-3 w-full sm:w-auto"
        >
          {gps.state === "loading" ? t("capturingGps") : t("captureGps")}
        </Button>
        {gps.state === "success" && (
          <Alert tone="success" className="mt-3">
            {t("gpsCaptured", { m: gps.accuracy })}
          </Alert>
        )}
        {gps.state === "error" && (
          <Alert tone="error" className="mt-3">
            {t(gps.message)}
          </Alert>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          name="latitude"
          label={t("latitude")}
          optional={t("ifAvailable")}
          inputMode="decimal"
          placeholder="25.594095"
          value={value.latitude}
          onChange={(e) => onChange(withAutoLink({ latitude: e.target.value.replace(/[^\d.-]/g, "") }))}
          error={errors.latitude}
        />
        <Input
          name="longitude"
          label={t("longitude")}
          optional={t("ifAvailable")}
          inputMode="decimal"
          placeholder="85.137566"
          value={value.longitude}
          onChange={(e) => onChange(withAutoLink({ longitude: e.target.value.replace(/[^\d.-]/g, "") }))}
          error={errors.longitude}
        />
      </div>
      {isOutsideBihar(value.latitude, value.longitude) && <Alert tone="warning">{t("outsideBihar")}</Alert>}

      <Input
        name="mapLink"
        label={t("mapLink")}
        optional
        icon={FiLink}
        type="url"
        inputMode="url"
        placeholder={t("mapLinkPlaceholder")}
        value={value.mapLink}
        onChange={(e) => onChange({ ...value, mapLink: e.target.value })}
        error={errors.mapLink}
      />
      {preview && !errors.mapLink && (
        <a
          href={preview}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
        >
          <FiExternalLink className="h-4 w-4" />
          {t("previewOnMap")}
        </a>
      )}
    </div>
  );
}
