import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiUser, FiMap, FiMapPin, FiEye, FiArrowLeft, FiArrowRight, FiSend, FiCompass, FiLayers, FiMail, FiSmartphone, FiCheckCircle, FiImage, FiCreditCard } from "react-icons/fi";
import PublicLayout from "../../components/layout/PublicLayout";
import Card, { SectionHeading, Eyebrow } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import { Input, Select, Textarea } from "../../components/ui/Field";
import { PageLoader } from "../../components/ui/Spinner";
import ChauhaddiFields from "../../components/application/ChauhaddiFields";
import LocationFields from "../../components/application/LocationFields";
import PhotoUploader from "../../components/application/PhotoUploader";
import ApplicationDetails from "../../components/application/ApplicationDetails";
import PlotRows from "../../components/application/PlotRows";
import FormSideNav from "../../components/application/FormSideNav";
import { useT } from "../../i18n/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import { DISTRICTS, MAUJA_OTHER, useLocationData } from "../../lib/locations";
import { validateLandSite, validateLocation, validatePersonal, validatePlots } from "../../lib/validation";
import { saveApplicant, submitApplication } from "../../lib/applicationsApi";
import { newPlot } from "../../lib/plots";
import { digitsOnly, groupAadhaar } from "../../lib/format";

const EMPTY_CHAUHADDI = { north: "", south: "", east: "", west: "" };
const emptyLand = () => ({
  district: "",
  anchal: "",
  mauja: "",
  maujaIsOther: false,
  thanaNo: "",
  plots: [newPlot()],
  chauhaddi: { ...EMPTY_CHAUHADDI },
});
const EMPTY_LOCATION = { latitude: "", longitude: "", mapLink: "" };

// Section order. Required sections gate submission; optional ones never block it.
const SECTIONS = [
  { id: "applicant", titleKey: "secApplicant", icon: FiUser, required: true },
  { id: "site", titleKey: "secSite", icon: FiMapPin, required: true },
  { id: "plots", titleKey: "secPlots", icon: FiLayers, required: true },
  { id: "boundary", titleKey: "secBoundary", icon: FiCompass },
  { id: "gps", titleKey: "secGps", icon: FiMap },
  { id: "review", titleKey: "secReview", icon: FiEye },
];
const REQUIRED_IDS = SECTIONS.filter((s) => s.required).map((s) => s.id);

const draftKey = (mobile) => `brlpp.draft.${mobile}`;
const readDraft = (mobile) => {
  try {
    return JSON.parse(localStorage.getItem(draftKey(mobile)) || "null");
  } catch {
    return null;
  }
};
const writeDraft = (mobile, draft) => {
  try {
    localStorage.setItem(draftKey(mobile), JSON.stringify(draft));
  } catch {
    /* ignore */
  }
};
const clearDraft = (mobile) => {
  try {
    localStorage.removeItem(draftKey(mobile));
  } catch {
    /* ignore */
  }
};

// Drafts saved before multi-plot support held a single Khata/Khesra at the top level.
const landFromDraft = (draftLand = {}) => {
  // Land type used to be one value per application; it now lives on each plot.
  const { khataNo, khesraNo, jamabandiNo, area, areaUnit, landType = "", ...rest } = draftLand;
  const plots = Array.isArray(rest.plots) && rest.plots.length
    ? rest.plots.map((p) => ({ ...newPlot(), landType, ...p }))
    : [{ ...newPlot(areaUnit || "acre", landType), khataNo: khataNo || "", khesraNo: khesraNo || "", jamabandiNo: jamabandiNo || "", area: area || "" }];
  return { ...emptyLand(), ...rest, plots, chauhaddi: { ...EMPTY_CHAUHADDI, ...rest.chauhaddi } };
};

const filled = (v) => String(v ?? "").trim() !== "";

const scrollToFirstError = (errors) => {
  const first = Object.keys(errors)[0];
  if (!first) return;
  setTimeout(() => {
    const el = document.querySelector(`[data-field="${first}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    el?.querySelector("input,select,textarea")?.focus({ preventScroll: true });
  }, 80);
};

export default function ApplyWizard() {
  const { t, lang } = useT();
  const { mobile, profile, profileLoading, setProfile } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editProfile = searchParams.get("edit") === "profile";

  const [ready, setReady] = useState(false);
  const [section, setSection] = useState("applicant");
  const [personal, setPersonal] = useState({ name: "", fatherHusbandName: "", aadhaar: "", mobile, email: "", address: "" });
  const [land, setLand] = useState(emptyLand);
  const [location, setLocation] = useState(EMPTY_LOCATION);
  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState({});
  const [showAllErrors, setShowAllErrors] = useState(false);
  const [declared, setDeclared] = useState(false);
  const [noTitleSuit, setNoTitleSuit] = useState(false);
  const [busy, setBusy] = useState("");
  const [formError, setFormError] = useState("");
  const [draftRestored, setDraftRestored] = useState(false);
  const topRef = useRef(null);
  const photosRef = useRef(photos);
  photosRef.current = photos;

  // Initialise once the saved profile has loaded: returning applicants start at the land.
  useEffect(() => {
    if (profileLoading || ready) return;
    const base = profile
      ? { name: profile.name, fatherHusbandName: profile.fatherHusbandName, aadhaar: profile.aadhaar || "", mobile, email: profile.email || "", address: profile.address }
      : { name: "", fatherHusbandName: "", aadhaar: "", mobile, email: "", address: "" };
    const draft = readDraft(mobile);
    const hasDraft = draft && (draft.land?.district || draft.land?.plots?.some((p) => p.khataNo) || draft.land?.khataNo || draft.personal?.name);
    if (hasDraft) {
      setPersonal({ ...base, ...(draft.personal || {}), mobile });
      setLand(landFromDraft(draft.land));
      setLocation({ ...EMPTY_LOCATION, ...draft.location });
      const saved = SECTIONS.some((s) => s.id === draft.section) ? draft.section : "site";
      setSection(editProfile ? "applicant" : saved === "review" ? "gps" : saved);
      setDraftRestored(true);
    } else {
      setPersonal(base);
      setSection(profile && !editProfile ? "site" : "applicant");
    }
    setReady(true);
  }, [profileLoading, profile, mobile, ready, editProfile]);

  useEffect(() => {
    if (ready) writeDraft(mobile, { section, personal, land, location });
  }, [ready, mobile, section, personal, land, location]);

  useEffect(() => () => photosRef.current.forEach((p) => URL.revokeObjectURL(p.url)), []);

  // Drop the "fix the highlighted fields" banner once every highlighted field is fixed.
  useEffect(() => {
    if (!Object.keys(errors).length && (formError === "errFixFields" || formError === "errSectionsIncomplete")) setFormError("");
  }, [errors, formError]);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [section]);

  // ---------- Location master data (District → Circle → Mauja) ----------
  const locations = useLocationData();
  const districtOptions = useMemo(
    () => DISTRICTS.map((d) => ({ value: d.en, label: lang === "hi" ? `${d.hi} (${d.en})` : d.en })),
    [lang]
  );
  const anchalOptions = locations.getAnchals(land.district).map((a) => ({ value: a, label: a }));
  const maujaOptions = [
    ...locations.getMaujas(land.district, land.anchal).map((m) => ({ value: m, label: m })),
    ...(land.anchal ? [{ value: MAUJA_OTHER, label: t("maujaOtherOption") }] : []),
  ];

  // A restored draft may reference a circle/mauja that is not in the master list any more.
  useEffect(() => {
    if (!locations.ready || !land.anchal) return;
    const circleOk = locations.getAnchals(land.district).includes(land.anchal);
    const maujaOk = land.maujaIsOther || !land.mauja || locations.isKnownMauja(land.district, land.anchal, land.mauja);
    if (!circleOk) setLand((l) => ({ ...l, anchal: "", mauja: "", maujaIsOther: false }));
    else if (!maujaOk) setLand((l) => ({ ...l, mauja: "" }));
  }, [locations, land.district, land.anchal, land.mauja, land.maujaIsOther]);

  // ---------- Live validation & section status ----------
  const sectionErrors = useMemo(
    () => ({
      applicant: validatePersonal(personal),
      site: validateLandSite(land),
      plots: validatePlots(land),
      boundary: {},
      gps: validateLocation(location),
    }),
    [personal, land, location]
  );

  const sections = useMemo(() => {
    const status = (id) => {
      const errs = sectionErrors[id] || {};
      const hasErrs = Object.keys(errs).length > 0;
      switch (id) {
        case "applicant": {
          const done = ["name", "fatherHusbandName", "aadhaar", "address"].filter((f) => filled(personal[f])).length;
          if (!hasErrs) return ["complete", t("statusComplete")];
          if (showAllErrors) return ["error", t("statusAttention")];
          return done ? ["partial", t("statusPartial", { done, total: 4 })] : ["empty", t("statusNotStarted")];
        }
        case "site": {
          const done = [land.district, land.anchal, land.mauja].filter(filled).length;
          if (!hasErrs) return ["complete", t("statusComplete")];
          if (showAllErrors) return ["error", t("statusAttention")];
          return done ? ["partial", t("statusPartial", { done, total: 3 })] : ["empty", t("statusNotStarted")];
        }
        case "plots": {
          if (!hasErrs) return ["complete", t("statusPlots", { n: land.plots.length })];
          if (showAllErrors) return ["error", t("statusAttention")];
          const started = land.plots.some((p) => filled(p.khataNo) || filled(p.khesraNo) || filled(p.area) || filled(p.landType));
          return started ? ["partial", t("statusPlots", { n: land.plots.filter((p) => filled(p.khesraNo)).length })] : ["empty", t("statusNotStarted")];
        }
        case "boundary": {
          const done = Object.values(land.chauhaddi).filter(filled).length;
          if (done === 4) return ["complete", t("statusComplete")];
          return ["optional", done ? t("statusOptionalFilled", { done, total: 4 }) : t("statusOptional")];
        }
        case "gps": {
          if (hasErrs) return ["error", t("statusAttention")];
          const done = [filled(location.latitude) && filled(location.longitude), photos.length > 0].filter(Boolean).length;
          if (done === 2) return ["complete", t("statusComplete")];
          return ["optional", done ? t("statusOptionalFilled", { done, total: 2 }) : t("statusOptional")];
        }
        default: {
          const allDone = REQUIRED_IDS.every((r) => !Object.keys(sectionErrors[r]).length) && !Object.keys(sectionErrors.gps).length;
          return allDone ? ["ready", t("statusReady")] : ["pending", t("statusPending")];
        }
      }
    };
    return SECTIONS.map((s) => {
      const [st, text] = status(s.id);
      return { ...s, title: t(s.titleKey), status: st, statusText: text };
    });
  }, [sectionErrors, personal, land, location, photos.length, showAllErrors, t]);

  const requiredDone = REQUIRED_IDS.filter((id) => !Object.keys(sectionErrors[id]).length).length;
  const index = SECTIONS.findIndex((s) => s.id === section);

  // ---------- Field updates ----------
  const clearError = (...fields) =>
    setErrors((e) => (fields.some((f) => e[f]) ? Object.fromEntries(Object.entries(e).filter(([k]) => !fields.includes(k))) : e));

  const setLandField = (field, value) => {
    setLand((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "district") Object.assign(next, { anchal: "", mauja: "", maujaIsOther: false });
      if (field === "anchal") Object.assign(next, { mauja: "", maujaIsOther: false });
      return next;
    });
    clearError(field);
  };

  const selectMauja = (value) => {
    const other = value === MAUJA_OTHER;
    setLand((prev) => ({ ...prev, maujaIsOther: other, mauja: other ? "" : value }));
    clearError("mauja", "maujaOther");
  };

  const setPersonalField = (field, value) => {
    setPersonal((p) => ({ ...p, [field]: value }));
    clearError(field);
  };

  // ---------- Navigation ----------
  const profileDirty = () =>
    !profile || ["name", "fatherHusbandName", "aadhaar", "email", "address"].some((f) => (profile[f] || "") !== (personal[f] || ""));

  // Saves the applicant profile when leaving that section with valid, changed details.
  const saveProfileIfNeeded = async () => {
    if (Object.keys(sectionErrors.applicant).length || !profileDirty()) return true;
    setBusy("saving");
    try {
      const saved = await saveApplicant(personal);
      setProfile((prev) => ({ ...(prev || {}), ...saved }));
      return true;
    } catch (err) {
      console.error(err);
      setFormError("errGeneric");
      return false;
    } finally {
      setBusy("");
    }
  };

  const openSection = async (id) => {
    if (id === section) return;
    if (section === "applicant" && !(await saveProfileIfNeeded())) return;
    setFormError("");
    setErrors(showAllErrors ? sectionErrors[id] || {} : {});
    setSection(id);
  };

  // "Save & Continue": the current section must be valid before moving on.
  const continueNext = async () => {
    setFormError("");
    const errs = sectionErrors[section] || {};
    if (Object.keys(errs).length) {
      setErrors(errs);
      setFormError("errFixFields");
      scrollToFirstError(errs);
      return;
    }
    await openSection(SECTIONS[index + 1].id);
  };

  const handleSubmit = async () => {
    setFormError("");
    setShowAllErrors(true);
    const firstBad = [...REQUIRED_IDS, "gps"].find((id) => Object.keys(sectionErrors[id]).length);
    if (firstBad) {
      setSection(firstBad);
      setErrors(sectionErrors[firstBad]);
      setFormError("errSectionsIncomplete");
      scrollToFirstError(sectionErrors[firstBad]);
      return;
    }
    if (!declared || !noTitleSuit) {
      setFormError("errDeclaration");
      return;
    }
    setBusy(photos.length ? "uploading" : "submitting");
    try {
      const saved = await saveApplicant(personal);
      setProfile((prev) => ({ ...(prev || {}), ...saved }));
      const applicationId = await submitApplication({
        applicant: personal,
        land,
        location,
        photoFiles: photos.map((p) => p.file),
      });
      clearDraft(mobile);
      navigate(`/success/${applicationId}`, { replace: true });
    } catch (err) {
      console.error(err);
      setFormError("errGeneric");
      setBusy("");
    }
  };

  const discardDraft = () => {
    clearDraft(mobile);
    setLand(emptyLand());
    setLocation(EMPTY_LOCATION);
    setDraftRestored(false);
    setShowAllErrors(false);
    setErrors({});
    setSection(profile ? "site" : "applicant");
  };

  if (!ready) {
    return (
      <PublicLayout>
        <PageLoader label={t("loading")} />
      </PublicLayout>
    );
  }

  const current = sections[index];
  const previewApp = {
    mobile,
    applicant: personal,
    ...land,
    ...location,
    photos: photos.map((p) => ({ url: p.url })),
  };

  return (
    <PublicLayout>
      <div ref={topRef} className="scroll-mt-28" />
      <div className="animate-fade-up">
        <Eyebrow>{t("portalTitle")}</Eyebrow>
        <h1 className="mt-1.5 font-display text-3xl leading-tight text-brand-900 sm:text-4xl">{t("newLandSubmission")}</h1>
      </div>

      {draftRestored && (
        <Alert
          tone="info"
          className="mt-4"
          action={
            <button onClick={discardDraft} className="shrink-0 text-xs font-semibold text-brand-800 underline">
              {t("discardDraft")}
            </button>
          }
        >
          {t("draftRestored")}
        </Alert>
      )}

      <div className="mt-6 lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start lg:gap-8">
        <FormSideNav sections={sections} current={section} onSelect={openSection} done={requiredDone} total={REQUIRED_IDS.length} />

        <div className="mt-4 space-y-6 lg:mt-0">
          {section !== "applicant" && section !== "review" && profile && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-gold-50 px-4 py-3 text-sm text-gold-800 ring-1 ring-gold-200">
              <span className="flex items-center gap-2 font-medium">
                <FiCheckCircle className="h-4 w-4 shrink-0" />
                <span>
                  <strong className="font-semibold">{personal.name}</strong> · {t("personalSaved")}
                </span>
              </span>
              <button onClick={() => openSection("applicant")} className="text-xs font-semibold text-gold-800 underline">
                {t("edit")}
              </button>
            </div>
          )}

          {section === "applicant" && (
            <Card className="p-5 sm:p-7">
              <SectionHeading icon={FiUser} title={current.title} subtitle={t("secApplicantHint")} className="mb-6" />
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Input
                  name="name"
                  label={t("applicantName")}
                  required
                  autoComplete="name"
                  maxLength={100}
                  value={personal.name}
                  onChange={(e) => setPersonalField("name", e.target.value)}
                  error={errors.name}
                />
                <Input
                  name="fatherHusbandName"
                  label={t("fatherHusbandName")}
                  required
                  maxLength={100}
                  value={personal.fatherHusbandName}
                  onChange={(e) => setPersonalField("fatherHusbandName", e.target.value)}
                  error={errors.fatherHusbandName}
                />
                <Input
                  name="aadhaar"
                  label={t("aadhaar")}
                  required
                  icon={FiCreditCard}
                  inputMode="numeric"
                  autoComplete="off"
                  maxLength={14}
                  placeholder="XXXX XXXX XXXX"
                  hint={t("aadhaarHint")}
                  value={groupAadhaar(personal.aadhaar)}
                  onChange={(e) => setPersonalField("aadhaar", digitsOnly(e.target.value).slice(0, 12))}
                  error={errors.aadhaar}
                />
                <Input
                  name="mobile"
                  label={t("mobileNumber")}
                  icon={FiSmartphone}
                  value={`+91 ${mobile}`}
                  disabled
                  trailing={
                    <span className="inline-flex items-center gap-1 rounded-full bg-gold-50 px-2.5 py-1 text-xs font-semibold text-gold-800 ring-1 ring-gold-200">
                      <FiCheckCircle className="h-3.5 w-3.5" />
                      {t("verified")}
                    </span>
                  }
                />
                <Input
                  name="email"
                  label={t("email")}
                  optional
                  icon={FiMail}
                  type="email"
                  autoComplete="email"
                  maxLength={120}
                  value={personal.email}
                  onChange={(e) => setPersonalField("email", e.target.value)}
                  error={errors.email}
                />
                <Textarea
                  name="address"
                  label={t("address")}
                  required
                  className="sm:col-span-2"
                  maxLength={300}
                  placeholder={t("addressPlaceholder")}
                  value={personal.address}
                  onChange={(e) => setPersonalField("address", e.target.value)}
                  error={errors.address}
                />
              </div>
            </Card>
          )}

          {section === "site" && (
            <Card className="p-5 sm:p-7">
              <SectionHeading icon={FiMapPin} title={current.title} subtitle={t("secSiteHint")} className="mb-6" />
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Select
                  name="district"
                  label={t("district")}
                  required
                  placeholder={`${t("select")} ${t("district")}`}
                  options={districtOptions}
                  value={land.district}
                  onChange={(e) => setLandField("district", e.target.value)}
                  error={errors.district}
                />
                <Select
                  name="anchal"
                  label={t("anchal")}
                  required
                  disabled={!land.district || !locations.ready}
                  placeholder={
                    !land.district ? t("selectDistrictFirst") : locations.ready ? `${t("select")} ${t("anchalShort")}` : t("loading")
                  }
                  options={anchalOptions}
                  value={land.anchal}
                  onChange={(e) => setLandField("anchal", e.target.value)}
                  error={errors.anchal}
                />
                <Select
                  name="mauja"
                  label={t("mauja")}
                  required
                  disabled={!land.anchal}
                  placeholder={land.anchal ? `${t("select")} ${t("mauja")}` : t("selectAnchalFirst")}
                  options={maujaOptions}
                  value={land.maujaIsOther ? MAUJA_OTHER : land.mauja}
                  onChange={(e) => selectMauja(e.target.value)}
                  error={errors.mauja}
                />
                <Input
                  name="thanaNo"
                  label={t("thanaNo")}
                  optional
                  maxLength={40}
                  value={land.thanaNo}
                  onChange={(e) => setLandField("thanaNo", e.target.value)}
                />
                {land.maujaIsOther && (
                  <Input
                    name="maujaOther"
                    label={t("maujaOtherName")}
                    required
                    className="sm:col-span-2"
                    maxLength={80}
                    autoFocus
                    hint={t("maujaOtherHint")}
                    value={land.mauja}
                    onChange={(e) => {
                      setLand((l) => ({ ...l, mauja: e.target.value }));
                      clearError("maujaOther");
                    }}
                    error={errors.maujaOther}
                  />
                )}
              </div>
            </Card>
          )}

          {section === "plots" && (
            <Card className="p-5 sm:p-7">
              <SectionHeading icon={FiLayers} title={current.title} subtitle={t("secPlotsHint")} className="mb-6" />
              {land.mauja && (
                <p className="mb-5 inline-flex flex-wrap items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 ring-1 ring-slate-100">
                  <FiMapPin className="h-3.5 w-3.5 text-brand-600" />
                  {land.mauja} · {land.anchal} · {land.district}
                </p>
              )}
              <PlotRows
                plots={land.plots}
                errors={errors}
                onChange={(plots) => {
                  setLand((l) => ({ ...l, plots }));
                  setErrors((e) => Object.fromEntries(Object.entries(e).filter(([k]) => !k.startsWith("plots"))));
                }}
              />
            </Card>
          )}

          {section === "boundary" && (
            <Card className="p-5 sm:p-7">
              <SectionHeading icon={FiCompass} title={current.title} subtitle={t("secBoundaryHint")} className="mb-6" />
              <ChauhaddiFields value={land.chauhaddi} onChange={(chauhaddi) => setLand((l) => ({ ...l, chauhaddi }))} />
            </Card>
          )}

          {section === "gps" && (
            <>
              <Card className="p-5 sm:p-7">
                <SectionHeading icon={FiMap} title={t("gpsSection")} subtitle={t("secGpsHint")} className="mb-6" />
                <LocationFields
                  value={location}
                  errors={errors}
                  onChange={(v) => {
                    setLocation(v);
                    setErrors({});
                  }}
                />
              </Card>
              <Card className="p-5 sm:p-7">
                <SectionHeading icon={FiImage} title={t("photosSection")} subtitle={t("optional")} className="mb-6" />
                <PhotoUploader value={photos} onChange={setPhotos} />
              </Card>
            </>
          )}

          {section === "review" && (
            <>
              <SectionHeading icon={FiEye} title={t("previewTitle")} subtitle={t("previewSub")} />
              <ApplicationDetails app={previewApp} onEdit={openSection} showMeta={false} />
              <Card className="p-5 sm:p-6">
                <div className="space-y-4" data-field="declarations">
                  {[
                    ["declaration", declared, setDeclared],
                    ["declarationNoTitleSuit", noTitleSuit, setNoTitleSuit],
                  ].map(([key, checked, set]) => (
                    <label key={key} className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => {
                          set(e.target.checked);
                          if (e.target.checked && formError === "errDeclaration") setFormError("");
                        }}
                        className="mt-1 h-5 w-5 shrink-0 rounded border-slate-300 accent-brand-700"
                      />
                      <span className="text-sm leading-relaxed text-slate-700">{t(key)}</span>
                    </label>
                  ))}
                </div>
                <Alert tone="warning" className="mt-4">
                  {t("disclaimerText")}
                </Alert>
              </Card>
            </>
          )}

          {formError && <Alert tone="error">{t(formError)}</Alert>}

          <div className="sticky bottom-0 z-20 -mx-4 flex items-center justify-between gap-3 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0">
            {index > 0 ? (
              <Button variant="secondary" size="lg" icon={FiArrowLeft} onClick={() => openSection(SECTIONS[index - 1].id)} disabled={!!busy}>
                {t("back")}
              </Button>
            ) : (
              <Button variant="secondary" size="lg" icon={FiArrowLeft} to={profile ? "/my-applications" : "/"}>
                {t("cancel")}
              </Button>
            )}
            {section === "review" ? (
              <Button variant="success" size="lg" icon={FiSend} onClick={handleSubmit} loading={!!busy}>
                {busy === "uploading" ? t("uploadingPhotos") : busy ? t("submitting") : t("submit")}
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                {!current.required && (
                  <Button variant="ghost" size="lg" className="hidden sm:inline-flex" onClick={() => openSection(SECTIONS[index + 1].id)}>
                    {t("skipForNow")}
                  </Button>
                )}
                <Button size="lg" iconRight={FiArrowRight} onClick={continueNext} loading={busy === "saving"}>
                  {SECTIONS[index + 1].id === "review" ? t("continueToReview") : t("saveContinue")}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
