import { useCallback, useEffect, useState } from "react";
import { FiUserPlus, FiKey, FiUser, FiLock, FiRefreshCw, FiUsers } from "react-icons/fi";
import AdminLayout from "../../components/layout/AdminLayout";
import Card, { PageHeader } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import Modal from "../../components/ui/Modal";
import EmptyState from "../../components/ui/EmptyState";
import { Input, Select } from "../../components/ui/Field";
import { PageLoader } from "../../components/ui/Spinner";
import { useT } from "../../i18n/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import { createAdmin, listAdmins, updateAdmin } from "../../lib/adminApi";
import { DISTRICTS, districtLabel } from "../../lib/locations";
import { formatDateTime } from "../../lib/format";

const LOGIN_ID_RE = /^[a-z0-9][a-z0-9_.-]{2,31}$/;
const EMPTY_FORM = { loginId: "", name: "", role: "district", district: "", password: "", confirm: "" };

// 12-char password without look-alike characters.
const generatePassword = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789@#$%";
  const bytes = crypto.getRandomValues(new Uint32Array(12));
  return Array.from(bytes, (b) => chars[b % chars.length]).join("");
};

const errorKeyFor = (err) =>
  ({
    exists: "errAdminExists",
    "invalid-login-id": "errLoginId",
    "weak-password": "errPasswordWeak",
    "invalid-district": "errRequired",
  })[err?.details?.reason] || "errGeneric";

function PasswordFields({ form, setForm, errors, t, label = "password" }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Input
        name="password"
        label={t(label)}
        icon={FiLock}
        type="text"
        autoComplete="new-password"
        value={form.password}
        onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
        error={errors.password}
        trailing={
          <button
            type="button"
            onClick={() => {
              const p = generatePassword();
              setForm((f) => ({ ...f, password: p, confirm: p }));
            }}
            className="rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-800 hover:bg-brand-100"
          >
            {t("generate")}
          </button>
        }
      />
      <Input
        name="confirm"
        label={t("confirmPassword")}
        icon={FiLock}
        type="text"
        autoComplete="new-password"
        value={form.confirm}
        onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))}
        error={errors.confirm}
      />
    </div>
  );
}

export default function ManageAdmins() {
  const { t, lang } = useT();
  const { admin: me } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [notice, setNotice] = useState("");
  const [modal, setModal] = useState(null); // { type: "create" } | { type: "password", target }
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [busyUid, setBusyUid] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    try {
      setAdmins(await listAdmins());
    } catch (err) {
      console.error(err);
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openModal = (next) => {
    setModal(next);
    setForm(EMPTY_FORM);
    setErrors({});
    setFormError("");
  };

  const validatePassword = (e) => {
    if (form.password.length < 8) e.password = "errPasswordWeak";
    else if (form.password !== form.confirm) e.confirm = "errPasswordMatch";
    return e;
  };

  const handleCreate = async () => {
    const e = {};
    if (!LOGIN_ID_RE.test(form.loginId.trim().toLowerCase())) e.loginId = "errLoginId";
    if (form.name.trim().length < 3) e.name = "errMinName";
    if (form.role === "district" && !form.district) e.district = "errRequired";
    validatePassword(e);
    setErrors(e);
    if (Object.keys(e).length) return;

    setSaving(true);
    setFormError("");
    try {
      const created = await createAdmin({
        loginId: form.loginId.trim().toLowerCase(),
        name: form.name.trim(),
        role: form.role,
        district: form.role === "district" ? form.district : "",
        password: form.password,
      });
      setAdmins((list) => [...list, created]);
      setNotice(t("adminCreated", { id: created.loginId }));
      setModal(null);
    } catch (err) {
      console.error(err);
      setFormError(errorKeyFor(err));
    } finally {
      setSaving(false);
    }
  };

  const handlePassword = async () => {
    const e = validatePassword({});
    setErrors(e);
    if (Object.keys(e).length) return;
    setSaving(true);
    setFormError("");
    try {
      await updateAdmin({ uid: modal.target.uid, password: form.password });
      setNotice(t("passwordUpdated", { id: modal.target.loginId }));
      setModal(null);
    } catch (err) {
      console.error(err);
      setFormError(errorKeyFor(err));
    } finally {
      setSaving(false);
    }
  };

  const toggleDisabled = async (target) => {
    setBusyUid(target.uid);
    try {
      const updated = await updateAdmin({ uid: target.uid, disabled: !target.disabled });
      setAdmins((list) => list.map((a) => (a.uid === updated.uid ? updated : a)));
    } catch (err) {
      console.error(err);
      setNotice("");
      setLoadError(true);
    } finally {
      setBusyUid("");
    }
  };

  return (
    <AdminLayout>
      <PageHeader
        eyebrow={t("stateAdmin")}
        title={t("manageAdmins")}
        subtitle={t("manageAdminsSub")}
        actions={
          <>
            <Button variant="secondary" icon={FiRefreshCw} onClick={load} disabled={loading}>
              {t("refresh")}
            </Button>
            <Button icon={FiUserPlus} onClick={() => openModal({ type: "create" })}>
              {t("addAdmin")}
            </Button>
          </>
        }
      />

      {notice && (
        <Alert tone="success" className="mt-6">
          {notice}
        </Alert>
      )}
      {loadError && (
        <Alert tone="error" className="mt-6">
          {t("errLoad")}
        </Alert>
      )}

      <Card className="mt-6 overflow-hidden">
        {loading ? (
          <PageLoader label={t("loading")} />
        ) : admins.length === 0 ? (
          <EmptyState icon={FiUsers} title={t("noData")} />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {[t("adminId"), t("adminName"), t("role"), t("district"), t("status"), t("lastSignIn"), t("action")].map((h, i) => (
                    <th key={h} className={`whitespace-nowrap px-4 py-3.5 ${i === 6 ? "text-right" : ""}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {admins.map((a) => {
                  const isMe = a.uid === me?.uid;
                  return (
                    <tr key={a.uid} className="transition hover:bg-slate-50/70">
                      <td className="whitespace-nowrap px-4 py-3.5 font-mono text-[13px] font-semibold text-slate-800">
                        {a.loginId}
                        {isMe && <span className="ml-2 rounded-full bg-brand-50 px-2 py-0.5 font-sans text-[11px] text-brand-800">{t("you")}</span>}
                      </td>
                      <td className="px-4 py-3.5 text-slate-700">{a.name}</td>
                      <td className="whitespace-nowrap px-4 py-3.5 text-slate-600">{a.role === "state" ? t("stateAdmin") : t("districtAdmin")}</td>
                      <td className="px-4 py-3.5 text-slate-600">{a.role === "state" ? t("allDistricts") : districtLabel(a.district, lang)}</td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${
                            a.disabled ? "bg-slate-100 text-slate-500 ring-slate-200" : "bg-gold-50 text-gold-800 ring-gold-200"
                          }`}
                        >
                          {a.disabled ? t("disabled") : t("active")}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3.5 text-slate-500">{a.lastSignIn ? formatDateTime(a.lastSignIn) : t("never")}</td>
                      <td className="whitespace-nowrap px-4 py-3.5 text-right">
                        <div className="inline-flex gap-2">
                          <Button variant="secondary" size="sm" icon={FiKey} onClick={() => openModal({ type: "password", target: a })}>
                            {t("resetPassword")}
                          </Button>
                          {!isMe && (
                            <Button variant="secondary" size="sm" loading={busyUid === a.uid} onClick={() => toggleDisabled(a)}>
                              {a.disabled ? t("enable") : t("disable")}
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal
        open={modal?.type === "create"}
        onClose={() => setModal(null)}
        title={t("addAdmin")}
        size="max-w-2xl"
        footer={
          <>
            <Button variant="secondary" onClick={() => setModal(null)}>
              {t("cancel")}
            </Button>
            <Button icon={FiUserPlus} loading={saving} onClick={handleCreate}>
              {t("create")}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              name="loginId"
              label={t("adminId")}
              icon={FiUser}
              autoComplete="off"
              hint={t("loginIdHint")}
              value={form.loginId}
              onChange={(e) => setForm((f) => ({ ...f, loginId: e.target.value.toLowerCase().replace(/\s/g, "") }))}
              error={errors.loginId}
              required
            />
            <Input
              name="name"
              label={t("adminName")}
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              error={errors.name}
              required
            />
            <Select
              name="role"
              label={t("role")}
              options={[
                { value: "district", label: t("districtAdmin") },
                { value: "state", label: t("stateAdmin") },
              ]}
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
              required
            />
            {form.role === "district" && (
              <Select
                name="district"
                label={t("district")}
                placeholder={`${t("select")} ${t("district")}`}
                options={DISTRICTS.map((d) => ({ value: d.en, label: lang === "hi" ? `${d.hi} (${d.en})` : d.en }))}
                value={form.district}
                onChange={(e) => setForm((f) => ({ ...f, district: e.target.value }))}
                error={errors.district}
                required
              />
            )}
          </div>
          <PasswordFields form={form} setForm={setForm} errors={errors} t={t} />
          {formError && <Alert tone="error">{t(formError)}</Alert>}
        </div>
      </Modal>

      <Modal
        open={modal?.type === "password"}
        onClose={() => setModal(null)}
        title={t("resetPassword")}
        subtitle={modal?.target?.loginId}
        size="max-w-xl"
        footer={
          <>
            <Button variant="secondary" onClick={() => setModal(null)}>
              {t("cancel")}
            </Button>
            <Button icon={FiKey} loading={saving} onClick={handlePassword}>
              {t("save")}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <PasswordFields form={form} setForm={setForm} errors={errors} t={t} label="newPassword" />
          {formError && <Alert tone="error">{t(formError)}</Alert>}
        </div>
      </Modal>
    </AdminLayout>
  );
}
