import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiUser, FiBriefcase, FiPackage, FiUsers, FiEye, FiArrowLeft, FiArrowRight, FiSend, FiSave, FiMail, FiSmartphone, FiCheckCircle, FiHash, FiImage, FiMap } from "react-icons/fi";
import PublicLayout from "../../components/layout/PublicLayout";
import Card, { SectionHeading, Eyebrow } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import { Input, Select, Textarea } from "../../components/ui/Field";
import { PageLoader } from "../../components/ui/Spinner";
import EnterpriseDetails from "../../components/enterprise/EnterpriseDetails";
import ProductRows from "../../components/enterprise/ProductRows";
import FormSideNav from "../../components/enterprise/FormSideNav";
import PhotoUploader from "../../components/enterprise/PhotoUploader";
import BoundaryCorners from "../../components/enterprise/BoundaryCorners";
import { useT } from "../../i18n/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import { BLOCK_OTHER, DISTRICTS, useLocationData } from "../../lib/locations";
import { validateBoundary, validateContact, validateEmployment, validateProducts, validateUnit } from "../../lib/validation";
import { createEnterprise, formFromEnterprise, newCorner, newProduct, updateEnterprise } from "../../lib/enterprisesApi";
import { biharShare, normalizeUdyam } from "../../lib/format";
import { isPoint } from "../../lib/geo";
import { SECTORS, SECTOR_OTHERS } from "../../data/sectors";
import { CAPACITY_UNIT_OTHER } from "../../data/capacityUnits";

const EMPTY_UNIT = { unitName: "", unitLocation: "", district: "", city: "", block: "", blockIsOther: false, sector: "", sectorOther: "" };
const EMPTY_EMPLOYMENT = { projectCost: "", directEmployees: "", directEmployeesBihar: "", indirectEmployees: "", udyamRegistrationNo: "" };
// Four empty corner rows to start with; more can be added.
const emptyBoundary = () => Array.from({ length: 4 }, () => newCorner());

// Section order. Data sections are required except photos & GIS; review is where the applicant submits.
const SECTIONS = [
  { id: "contact", titleKey: "secContact", icon: FiUser, required: true },
  { id: "unit", titleKey: "secUnit", icon: FiBriefcase, required: true },
  { id: "products", titleKey: "secProducts", icon: FiPackage, required: true },
  { id: "employment", titleKey: "secEmployment", icon: FiUsers, required: true },
  { id: "photos", titleKey: "secPhotos", icon: FiImage },
  { id: "review", titleKey: "secReview", icon: FiEye },
];
const REQUIRED_IDS = SECTIONS.filter((s) => s.required).map((s) => s.id);

const draftKey = (mobile) => `bppp.draft.${mobile}`;
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

const SAVE_ERRORS = { "pp/udyam-taken": "errUdyamTaken", "pp/already-registered": "errAlreadyRegistered" };

export default function RegisterWizard() {
  const { t, lang } = useT();
  const { uid, mobile, enterprise, enterpriseLoading, refreshEnterprise } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // One enterprise per account: once registered, this form updates it.
  const editing = !!enterprise;

  const [ready, setReady] = useState(false);
  const [section, setSection] = useState("contact");
  const [contact, setContact] = useState({ name: "", mobile, email: "", address: "" });
  const [unit, setUnit] = useState(EMPTY_UNIT);
  const [products, setProducts] = useState(() => [newProduct()]);
  const [employment, setEmployment] = useState(EMPTY_EMPLOYMENT);
  // Optional unit photos: saved ones { url, path, name } and new picks { file, url, name }.
  const [photos, setPhotos] = useState([]);
  const [boundary, setBoundary] = useState(emptyBoundary);
  const [errors, setErrors] = useState({});
  const [showAllErrors, setShowAllErrors] = useState(false);
  const [declared, setDeclared] = useState(false);
  const [busy, setBusy] = useState("");
  const [formError, setFormError] = useState("");
  const [draftRestored, setDraftRestored] = useState(false);
  const topRef = useRef(null);
  const photosRef = useRef(photos);
  photosRef.current = photos;

  // Initialise once the enterprise (if any) has loaded: edit mode starts from the saved record.
  useEffect(() => {
    if (enterpriseLoading || ready) return;
    const requested = SECTIONS.some((s) => s.id === searchParams.get("section")) ? searchParams.get("section") : null;
    if (enterprise) {
      const form = formFromEnterprise(enterprise);
      setContact({ ...form.contact, mobile });
      setUnit(form.unit);
      setProducts(form.products.length ? form.products : [newProduct()]);
      setEmployment(form.employment);
      setPhotos(form.photos);
      setBoundary(form.boundary.length ? form.boundary : emptyBoundary());
      setSection(requested || "contact");
    } else {
      const draft = readDraft(mobile);
      if (draft && (draft.contact?.name || draft.unit?.unitName || draft.products?.some((p) => p.productName))) {
        setContact({ name: "", email: "", address: "", ...draft.contact, mobile });
        setUnit({ ...EMPTY_UNIT, ...draft.unit });
        setProducts(Array.isArray(draft.products) && draft.products.length ? draft.products.map((p) => ({ ...newProduct(), ...p })) : [newProduct()]);
        setEmployment({ ...EMPTY_EMPLOYMENT, ...draft.employment });
        if (Array.isArray(draft.boundary) && draft.boundary.length) setBoundary(draft.boundary.map((c) => ({ ...newCorner(), ...c })));
        const saved = SECTIONS.some((s) => s.id === draft.section) ? draft.section : "contact";
        setSection(saved === "review" ? "employment" : saved);
        setDraftRestored(true);
      }
    }
    setReady(true);
  }, [enterpriseLoading, enterprise, mobile, ready, searchParams]);

  useEffect(() => {
    if (ready && !editing) writeDraft(mobile, { section, contact, unit, products, employment, boundary });
  }, [ready, editing, mobile, section, contact, unit, products, employment, boundary]);

  // Drop the "fix the highlighted fields" banner once every highlighted field is fixed.
  useEffect(() => {
    if (!Object.keys(errors).length && (formError === "errFixFields" || formError === "errSectionsIncomplete")) setFormError("");
  }, [errors, formError]);

  // Release preview URLs of photos that were picked but never uploaded.
  useEffect(() => () => photosRef.current.forEach((p) => p.file && URL.revokeObjectURL(p.url)), []);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [section]);

  // ---------- Location master data (District → Block) ----------
  const locations = useLocationData();
  const districtOptions = useMemo(
    () => DISTRICTS.map((d) => ({ value: d.en, label: lang === "hi" ? `${d.hi} (${d.en})` : d.en })),
    [lang]
  );
  const blockOptions = [
    ...locations.getBlocks(unit.district).map((b) => ({ value: b, label: b })),
    ...(unit.district ? [{ value: BLOCK_OTHER, label: t("otherNotInList") }] : []),
  ];
  const sectorOptions = SECTORS.map((s) => ({ value: s.value, label: s[lang] }));

  // A restored draft may reference a block that is not in the master list any more.
  useEffect(() => {
    if (!locations.ready || !unit.block || unit.blockIsOther) return;
    if (!locations.isKnownBlock(unit.district, unit.block)) setUnit((u) => ({ ...u, block: "" }));
  }, [locations, unit.district, unit.block, unit.blockIsOther]);

  // ---------- Live validation & section status ----------
  const sectionErrors = useMemo(
    () => ({
      contact: validateContact(contact),
      unit: validateUnit(unit),
      products: validateProducts(products),
      employment: validateEmployment(employment),
      photos: validateBoundary(boundary),
    }),
    [contact, unit, products, employment, boundary]
  );

  const corners = boundary.filter(isPoint).length;

  const sections = useMemo(() => {
    const status = (id) => {
      const errs = sectionErrors[id] || {};
      const hasErrs = Object.keys(errs).length > 0;
      const partial = (done, total) => {
        if (!hasErrs) return ["complete", t("statusComplete")];
        if (showAllErrors) return ["error", t("statusAttention")];
        return done ? ["partial", t("statusPartial", { done, total })] : ["empty", t("statusNotStarted")];
      };
      switch (id) {
        case "contact":
          return partial([contact.name, contact.address].filter(filled).length, 2);
        case "unit":
          return partial([unit.unitName, unit.unitLocation, unit.district, unit.block, unit.city, unit.sector].filter(filled).length, 6);
        case "products": {
          if (!hasErrs) return ["complete", t("statusProducts", { n: products.length })];
          if (showAllErrors) return ["error", t("statusAttention")];
          const started = products.filter((p) => filled(p.productName)).length;
          return started ? ["partial", t("statusProducts", { n: started })] : ["empty", t("statusNotStarted")];
        }
        case "employment":
          return partial(Object.values(employment).filter(filled).length, 5);
        case "photos": {
          if (hasErrs && showAllErrors) return ["error", t("statusAttention")];
          const parts = [corners && t("cornersCount", { n: corners }), photos.length && t("photosCount", { n: photos.length })].filter(Boolean);
          return parts.length ? ["complete", parts.join(" · ")] : ["optional", t("statusOptional")];
        }
        default: {
          const allDone = REQUIRED_IDS.every((r) => !Object.keys(sectionErrors[r]).length);
          return allDone ? ["ready", t(editing ? "statusReadyUpdate" : "statusReady")] : ["pending", t("statusPending")];
        }
      }
    };
    return SECTIONS.map((s) => {
      const [st, text] = status(s.id);
      return { ...s, title: t(s.titleKey), status: st, statusText: text };
    });
  }, [sectionErrors, contact, unit, products, employment, photos.length, corners, showAllErrors, editing, t]);

  const requiredDone = REQUIRED_IDS.filter((id) => !Object.keys(sectionErrors[id]).length).length;
  const index = SECTIONS.findIndex((s) => s.id === section);

  // ---------- Field updates ----------
  const clearError = (...fields) =>
    setErrors((e) => (fields.some((f) => e[f]) ? Object.fromEntries(Object.entries(e).filter(([k]) => !fields.includes(k))) : e));

  const setContactField = (field, value) => {
    setContact((c) => ({ ...c, [field]: value }));
    clearError(field);
  };

  const setUnitField = (field, value) => {
    setUnit((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "district") Object.assign(next, { block: "", blockIsOther: false });
      if (field === "sector" && value !== SECTOR_OTHERS) next.sectorOther = "";
      return next;
    });
    clearError(field, ...(field === "district" ? ["block", "blockOther"] : []));
  };

  const selectBlock = (value) => {
    const other = value === BLOCK_OTHER;
    setUnit((prev) => ({ ...prev, blockIsOther: other, block: other ? "" : value }));
    clearError("block", "blockOther");
  };

  const setEmploymentField = (field, value) => {
    setEmployment((m) => ({ ...m, [field]: value }));
    clearError(field);
  };

  // ---------- Navigation ----------
  const openSection = (id) => {
    if (id === section) return;
    setFormError("");
    setErrors(showAllErrors ? sectionErrors[id] || {} : {});
    setSection(id);
  };

  // "Save & Continue": the current section must be valid before moving on.
  const continueNext = () => {
    setFormError("");
    const errs = sectionErrors[section] || {};
    if (Object.keys(errs).length) {
      setErrors(errs);
      setFormError("errFixFields");
      scrollToFirstError(errs);
      return;
    }
    openSection(SECTIONS[index + 1].id);
  };

  const handleSubmit = async () => {
    setFormError("");
    setShowAllErrors(true);
    // Photos & GIS is optional, but a partly entered boundary must be completed or cleared.
    const firstBad = [...REQUIRED_IDS, "photos"].find((id) => Object.keys(sectionErrors[id]).length);
    if (firstBad) {
      setSection(firstBad);
      setErrors(sectionErrors[firstBad]);
      setFormError("errSectionsIncomplete");
      scrollToFirstError(sectionErrors[firstBad]);
      return;
    }
    if (!declared) {
      setFormError("errDeclaration");
      return;
    }
    const photoFiles = photos.filter((p) => p.file).map((p) => p.file);
    setBusy(photoFiles.length ? "uploading" : "submitting");
    const form = { contact, unit, products, employment, boundary };
    try {
      if (editing) {
        const kept = photos.filter((p) => !p.file).map(({ url, path, name }) => ({ url, path, name }));
        await updateEnterprise(enterprise.registrationId, { ...form, photos: kept }, { uid, photoFiles });
        await refreshEnterprise();
        navigate("/dashboard", { replace: true, state: { notice: "detailsUpdated" } });
      } else {
        const registrationId = await createEnterprise({ uid, mobile, ...form, photoFiles });
        clearDraft(mobile);
        await refreshEnterprise();
        navigate(`/success/${registrationId}`, { replace: true });
      }
    } catch (err) {
      console.error(err);
      setBusy("");
      if (err?.code === "pp/udyam-taken") {
        setSection("employment");
        setErrors({ udyamRegistrationNo: "errUdyamTaken" });
        scrollToFirstError({ udyamRegistrationNo: true });
      } else if (err?.code === "pp/already-registered") {
        await refreshEnterprise();
      }
      setFormError(SAVE_ERRORS[err?.code] || "errGeneric");
    }
  };

  const discardDraft = () => {
    clearDraft(mobile);
    setContact({ name: "", mobile, email: "", address: "" });
    setUnit(EMPTY_UNIT);
    setProducts([newProduct()]);
    setEmployment(EMPTY_EMPLOYMENT);
    setPhotos([]);
    setBoundary(emptyBoundary());
    setDraftRestored(false);
    setShowAllErrors(false);
    setErrors({});
    setSection("contact");
  };

  if (!ready) {
    return (
      <PublicLayout>
        <PageLoader label={t("loading")} />
      </PublicLayout>
    );
  }

  const current = sections[index];
  const preview = {
    mobile,
    ...contact,
    ...unit,
    blockOther: unit.blockIsOther,
    products: products.map((p) => ({
      ...p,
      productionCapacity: filled(p.productionCapacity) ? Number(p.productionCapacity) : "",
      capacityUnit: p.capacityUnit === CAPACITY_UNIT_OTHER ? p.capacityUnitOther : p.capacityUnit,
    })),
    projectCost: filled(employment.projectCost) ? Number(employment.projectCost) : "",
    directEmployees: filled(employment.directEmployees) ? Number(employment.directEmployees) : "",
    directEmployeesBihar: filled(employment.directEmployeesBihar) ? Number(employment.directEmployeesBihar) : "",
    indirectEmployees: filled(employment.indirectEmployees) ? Number(employment.indirectEmployees) : "",
    udyamRegistrationNo: normalizeUdyam(employment.udyamRegistrationNo),
    photos,
    boundary: boundary.filter(isPoint),
  };
  const liveShare = biharShare(preview);

  return (
    <PublicLayout>
      <div ref={topRef} className="scroll-mt-28" />
      <div className="animate-fade-up">
        <Eyebrow>{editing ? enterprise.registrationId : t("portalTitle")}</Eyebrow>
        <h1 className="mt-1.5 font-display text-3xl leading-tight text-brand-900 sm:text-4xl">
          {t(editing ? "updateEnterpriseTitle" : "newRegistration")}
        </h1>
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
          {section === "contact" && (
            <Card className="p-5 sm:p-7">
              <SectionHeading icon={FiUser} title={current.title} subtitle={t("secContactHint")} className="mb-6" />
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Input
                  name="name"
                  label={t("applicantName")}
                  required
                  autoComplete="name"
                  maxLength={100}
                  value={contact.name}
                  onChange={(e) => setContactField("name", e.target.value)}
                  error={errors.name}
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
                  className="sm:col-span-2"
                  value={contact.email}
                  onChange={(e) => setContactField("email", e.target.value)}
                  error={errors.email}
                />
                <Textarea
                  name="address"
                  label={t("address")}
                  required
                  className="sm:col-span-2"
                  maxLength={300}
                  placeholder={t("addressPlaceholder")}
                  value={contact.address}
                  onChange={(e) => setContactField("address", e.target.value)}
                  error={errors.address}
                />
              </div>
            </Card>
          )}

          {section === "unit" && (
            <Card className="p-5 sm:p-7">
              <SectionHeading icon={FiBriefcase} title={current.title} subtitle={t("secUnitHint")} className="mb-6" />
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Input
                  name="unitName"
                  label={t("unitName")}
                  required
                  className="sm:col-span-2"
                  maxLength={150}
                  value={unit.unitName}
                  onChange={(e) => setUnitField("unitName", e.target.value)}
                  error={errors.unitName}
                />
                <Select
                  name="district"
                  label={t("district")}
                  required
                  placeholder={`${t("select")} ${t("district")}`}
                  options={districtOptions}
                  value={unit.district}
                  onChange={(e) => setUnitField("district", e.target.value)}
                  error={errors.district}
                />
                <Select
                  name="block"
                  label={t("block")}
                  required
                  disabled={!unit.district || !locations.ready}
                  placeholder={!unit.district ? t("selectDistrictFirst") : locations.ready ? `${t("select")} ${t("block")}` : t("loading")}
                  options={blockOptions}
                  value={unit.blockIsOther ? BLOCK_OTHER : unit.block}
                  onChange={(e) => selectBlock(e.target.value)}
                  error={errors.block}
                />
                {unit.blockIsOther && (
                  <Input
                    name="blockOther"
                    label={t("blockName")}
                    required
                    className="sm:col-span-2"
                    maxLength={80}
                    autoFocus
                    value={unit.block}
                    onChange={(e) => {
                      setUnit((u) => ({ ...u, block: e.target.value }));
                      clearError("blockOther");
                    }}
                    error={errors.blockOther}
                  />
                )}
                <Input
                  name="city"
                  label={t("city")}
                  required
                  maxLength={80}
                  value={unit.city}
                  onChange={(e) => setUnitField("city", e.target.value)}
                  error={errors.city}
                />
                <Select
                  name="sector"
                  label={t("sector")}
                  required
                  placeholder={`${t("select")} ${t("sector")}`}
                  options={sectorOptions}
                  value={unit.sector}
                  onChange={(e) => setUnitField("sector", e.target.value)}
                  error={errors.sector}
                />
                {unit.sector === SECTOR_OTHERS && (
                  <Input
                    name="sectorOther"
                    label={t("sectorOther")}
                    required
                    className="sm:col-span-2"
                    maxLength={80}
                    autoFocus
                    value={unit.sectorOther}
                    onChange={(e) => setUnitField("sectorOther", e.target.value)}
                    error={errors.sectorOther}
                  />
                )}
                <Textarea
                  name="unitLocation"
                  label={t("unitLocation")}
                  required
                  className="sm:col-span-2"
                  maxLength={300}
                  placeholder={t("unitLocationPlaceholder")}
                  value={unit.unitLocation}
                  onChange={(e) => setUnitField("unitLocation", e.target.value)}
                  error={errors.unitLocation}
                />
              </div>
            </Card>
          )}

          {section === "products" && (
            <Card className="p-5 sm:p-7">
              <SectionHeading icon={FiPackage} title={current.title} subtitle={t("secProductsHint")} className="mb-6" />
              <ProductRows
                products={products}
                errors={errors}
                onChange={(rows) => {
                  setProducts(rows);
                  setErrors((e) => Object.fromEntries(Object.entries(e).filter(([k]) => !k.startsWith("products"))));
                }}
              />
            </Card>
          )}

          {section === "employment" && (
            <Card className="p-5 sm:p-7">
              <SectionHeading icon={FiUsers} title={current.title} subtitle={t("secEmploymentHint")} className="mb-6" />
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Input
                  name="projectCost"
                  label={t("projectCost")}
                  required
                  inputMode="decimal"
                  placeholder="0.00"
                  hint={t("projectCostHint")}
                  value={employment.projectCost}
                  onChange={(e) => setEmploymentField("projectCost", e.target.value.replace(/[^\d.]/g, ""))}
                  error={errors.projectCost}
                />
                <Input
                  name="udyamRegistrationNo"
                  label={t("udyamNo")}
                  required
                  icon={FiHash}
                  autoCapitalize="characters"
                  maxLength={22}
                  placeholder="UDYAM-BR-00-0000000"
                  hint={t("udyamHint")}
                  value={employment.udyamRegistrationNo}
                  onChange={(e) => setEmploymentField("udyamRegistrationNo", normalizeUdyam(e.target.value))}
                  error={errors.udyamRegistrationNo}
                />
                <Input
                  name="directEmployees"
                  label={t("directEmployees")}
                  required
                  inputMode="numeric"
                  placeholder="0"
                  value={employment.directEmployees}
                  onChange={(e) => setEmploymentField("directEmployees", e.target.value.replace(/\D/g, "").slice(0, 7))}
                  error={errors.directEmployees}
                />
                <Input
                  name="directEmployeesBihar"
                  label={t("directEmployeesBihar")}
                  required
                  inputMode="numeric"
                  placeholder="0"
                  hint={liveShare !== null && !errors.directEmployeesBihar ? t("biharShareHint", { pct: liveShare }) : t("directEmployeesBiharHint")}
                  value={employment.directEmployeesBihar}
                  onChange={(e) => setEmploymentField("directEmployeesBihar", e.target.value.replace(/\D/g, "").slice(0, 7))}
                  error={errors.directEmployeesBihar}
                />
                <Input
                  name="indirectEmployees"
                  label={t("indirectEmployees")}
                  required
                  inputMode="numeric"
                  placeholder="0"
                  value={employment.indirectEmployees}
                  onChange={(e) => setEmploymentField("indirectEmployees", e.target.value.replace(/\D/g, "").slice(0, 7))}
                  error={errors.indirectEmployees}
                />
              </div>
            </Card>
          )}

          {section === "photos" && (
            <>
              <Card className="p-5 sm:p-7">
                <SectionHeading icon={FiMap} title={t("gisBoundary")} subtitle={t("gisBoundaryHint")} className="mb-6" />
                <BoundaryCorners
                  corners={boundary}
                  errors={errors}
                  onChange={(rows) => {
                    setBoundary(rows);
                    setErrors((e) => Object.fromEntries(Object.entries(e).filter(([k]) => !k.startsWith("boundary"))));
                  }}
                />
              </Card>
              <Card className="p-5 sm:p-7">
                <SectionHeading icon={FiImage} title={t("unitPhotos")} subtitle={t("secPhotosHint")} className="mb-6" />
                <PhotoUploader value={photos} onChange={setPhotos} />
              </Card>
            </>
          )}

          {section === "review" && (
            <>
              <SectionHeading icon={FiEye} title={t("previewTitle")} subtitle={t("previewSub")} />
              <EnterpriseDetails enterprise={preview} onEdit={openSection} showMeta={false} />
              <Card className="p-5 sm:p-6">
                <label className="flex cursor-pointer items-start gap-3" data-field="declaration">
                  <input
                    type="checkbox"
                    checked={declared}
                    onChange={(e) => {
                      setDeclared(e.target.checked);
                      if (e.target.checked && formError === "errDeclaration") setFormError("");
                    }}
                    className="mt-1 h-5 w-5 shrink-0 rounded border-slate-300 accent-brand-700"
                  />
                  <span className="text-sm leading-relaxed text-slate-700">{t("declaration")}</span>
                </label>
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
              <Button variant="secondary" size="lg" icon={FiArrowLeft} to={editing ? "/dashboard" : "/"}>
                {t("cancel")}
              </Button>
            )}
            {section === "review" ? (
              <Button variant="success" size="lg" icon={editing ? FiSave : FiSend} onClick={handleSubmit} loading={!!busy}>
                {busy === "uploading" ? t("uploadingPhotos") : busy ? t(editing ? "saving" : "submitting") : t(editing ? "saveChanges" : "submit")}
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                {!current.required && !photos.length && !corners && (
                  <Button variant="ghost" size="lg" className="hidden sm:inline-flex" onClick={() => openSection(SECTIONS[index + 1].id)}>
                    {t("skipForNow")}
                  </Button>
                )}
                <Button size="lg" iconRight={FiArrowRight} onClick={continueNext}>
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
