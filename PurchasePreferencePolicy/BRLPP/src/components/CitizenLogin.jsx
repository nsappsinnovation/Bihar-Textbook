import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiSmartphone, FiKey, FiLock, FiArrowRight, FiArrowLeft, FiEye, FiEyeOff } from "react-icons/fi";
import Button from "./ui/Button";
import Alert from "./ui/Alert";
import { Input } from "./ui/Field";
import { useT } from "../i18n/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { MIN_PASSWORD_LENGTH, OTP_RESEND_SECONDS, sendOtp } from "../lib/citizenAuth";
import { isValidMobile, isValidOtp } from "../lib/validation";

const ERROR_KEYS = {
  "otp/invalid": "errOtpInvalid",
  "otp/send-failed": "errOtpSend",
  "otp/network": "errOtpNetwork",
  "otp/too-soon": "errOtpTooSoon",
  "otp/too-many": "errOtpTooMany",
  "otp/invalid-mobile": "errMobile",
  "auth/invalid-login": "errCitizenLogin",
  "auth/account-exists": "errAccountExists",
  "auth/registration-disabled": "errRegistrationDisabled",
  "auth/network": "errAuthNetwork",
  "auth/too-many": "errAuthTooMany",
  "auth/unexpected": "errAuthUnexpected",
  "auth/otp-expired": "errOtpExpired",
  "auth/weak-password": "errPasswordWeak",
  "auth/disabled": "errAccountDisabled",
  "otp/unexpected": "errOtpUnexpected",
};
const errorKey = (err) => ERROR_KEYS[err?.code] || "errGeneric";
const OTP_ENABLED = import.meta.env.VITE_CITIZEN_OTP_ENABLED === "true";

function PasswordInput({ show, onToggle, ...props }) {
  return (
    <Input
      icon={FiLock}
      type={show ? "text" : "password"}
      trailing={
        <button type="button" onClick={onToggle} className="rounded-lg p-2 text-slate-400 hover:text-slate-600" aria-label="Show password">
          {show ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
        </button>
      }
      {...props}
    />
  );
}

/**
 * Citizen login card. OTP-less registration is the default. The existing OTP
 * steps remain behind VITE_CITIZEN_OTP_ENABLED for a later service rollout.
 */
export default function CitizenLogin({ intent, mobileRef, onFlowChange }) {
  const { t } = useT();
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState("password");
  const [mode, setMode] = useState("register"); // register | reset
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const otpRef = useRef(null);

  useEffect(() => {
    if (timer <= 0) return undefined;
    const id = setTimeout(() => setTimer((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [timer]);

  const goTo = (next) => {
    setStep(next);
    setError("");
    setFieldErrors({});
  };

  const finish = (profile) => {
    onFlowChange?.(false);
    // Only resume generic pages; never a previous user's application/success URL.
    const from = location.state?.from;
    if (from === "/my-applications" || from === "/apply") navigate(from, { replace: true });
    else if (intent === "apply" || !profile) navigate("/apply");
    else navigate("/my-applications");
  };

  const run = async (fn) => {
    setError("");
    setLoading(true);
    try {
      await fn();
    } catch (err) {
      console.error(err);
      setError(errorKey(err));
    } finally {
      setLoading(false);
    }
  };

  const requireMobile = () => {
    if (isValidMobile(mobile)) return true;
    setFieldErrors({ mobile: "errMobile" });
    return false;
  };

  const handlePasswordLogin = (e) => {
    e.preventDefault();
    if (!requireMobile()) return;
    if (!password) return setFieldErrors({ password: "errRequired" });
    setFieldErrors({});
    run(async () => finish(await auth.loginWithPassword(mobile, password)));
  };

  const startOtp = (nextMode) => {
    setMode(nextMode);
    setOtp("");
    goTo("otp-mobile");
  };

  const handleSendOtp = (e) => {
    e?.preventDefault();
    if (!requireMobile()) return;
    setFieldErrors({});
    run(async () => {
      await sendOtp(mobile);
      setStep("otp-code");
      setOtp("");
      setTimer(OTP_RESEND_SECONDS);
      setTimeout(() => otpRef.current?.focus(), 50);
    });
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (!isValidOtp(otp)) return setFieldErrors({ otp: "errOtp" });
    setFieldErrors({});
    onFlowChange?.(true);
    run(async () => {
      try {
        await auth.verifyOtp(mobile, otp);
        setPassword("");
        setConfirm("");
        goTo("set-password");
      } catch (err) {
        onFlowChange?.(false);
        throw err;
      }
    });
  };

  const handleSetPassword = (e) => {
    e.preventDefault();
    if (!requireMobile()) return;
    const errs = {};
    if (password.length < MIN_PASSWORD_LENGTH) errs.password = "errPasswordWeak";
    else if (password !== confirm) errs.confirm = "errPasswordMatch";
    setFieldErrors(errs);
    if (Object.keys(errs).length) return;
    run(async () => {
      const profile = OTP_ENABLED
        ? await auth.setPassword(mobile, password)
        : await auth.registerWithPassword(mobile, password);
      finish(profile);
    });
  };

  const mobileInput = (
    <Input
      ref={mobileRef}
      name="mobile"
      label={t("mobileNumber")}
      icon={FiSmartphone}
      type="tel"
      inputMode="numeric"
      autoComplete="username"
      maxLength={10}
      placeholder={t("mobilePlaceholder")}
      value={mobile}
      onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
      error={fieldErrors.mobile}
    />
  );
  const errorAlert = error && <Alert tone="error">{t(error)}</Alert>;

  if (step === "password") {
    return (
      <div className="space-y-6">
        <form onSubmit={handlePasswordLogin} className="space-y-4" noValidate>
          {mobileInput}
          <div>
            <PasswordInput
              name="password"
              label={t("password")}
              autoComplete="current-password"
              placeholder={t("passwordPlaceholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={fieldErrors.password}
              show={showPassword}
              onToggle={() => setShowPassword((s) => !s)}
            />
            {OTP_ENABLED && <div className="mt-2 text-right">
              <button type="button" onClick={() => startOtp("reset")} className="text-xs font-semibold text-brand-700 hover:text-brand-800">
                {t("forgotPassword")}
              </button>
            </div>}
          </div>
          {errorAlert}
          <Button type="submit" size="lg" loading={loading} iconRight={FiArrowRight} className="w-full">
            {t("login")}
          </Button>
        </form>
        <p className="text-center text-sm text-slate-500">
          {t("newHere")}{" "}
          <button
            type="button"
            onClick={() => {
              setMode("register");
              setPassword("");
              setConfirm("");
              goTo(OTP_ENABLED ? "otp-mobile" : "set-password");
            }}
            className="font-semibold text-brand-700 hover:text-brand-800"
          >
            {t("registerLink")}
          </button>
        </p>
      </div>
    );
  }

  const backToLogin = (
    <button
      type="button"
      onClick={() => {
        setPassword("");
        goTo("password");
      }}
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-700"
    >
      <FiArrowLeft className="h-4 w-4" />
      {t("backToLogin")}
    </button>
  );

  if (step === "otp-mobile") {
    return (
      <form onSubmit={handleSendOtp} className="space-y-5" noValidate>
        <Alert tone="info">{t(mode === "reset" ? "resetViaOtp" : "registerViaOtp")}</Alert>
        {mobileInput}
        {errorAlert}
        <Button type="submit" size="lg" loading={loading} iconRight={FiArrowRight} className="w-full">
          {loading ? t("sendingOtp") : t("sendOtp")}
        </Button>
        {backToLogin}
      </form>
    );
  }

  if (step === "otp-code") {
    return (
      <form onSubmit={handleVerify} className="space-y-5" noValidate>
        <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3 text-sm ring-1 ring-slate-100">
          <span className="font-medium text-slate-700">{t("otpSentTo", { mobile })}</span>
          <button type="button" onClick={() => goTo("otp-mobile")} className="shrink-0 text-xs font-semibold text-brand-700 hover:text-brand-800">
            {t("changeNumber")}
          </button>
        </div>
        <Input
          ref={otpRef}
          name="otp"
          label={t("enterOtp")}
          icon={FiKey}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          placeholder={t("otpPlaceholder")}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
          error={fieldErrors.otp}
          className="[&_input]:font-semibold [&_input]:tracking-[0.4em]"
          required
        />
        {errorAlert}
        <Button type="submit" size="lg" loading={loading} iconRight={FiArrowRight} className="w-full">
          {loading ? t("verifying") : t("verifyOtp")}
        </Button>
        <div className="flex items-center justify-between text-sm">
          {backToLogin}
          {timer > 0 ? (
            <span className="text-slate-400">{t("resendIn", { s: timer })}</span>
          ) : (
            <button type="button" onClick={handleSendOtp} className="font-semibold text-brand-700 hover:text-brand-800">
              {t("resendOtp")}
            </button>
          )}
        </div>
      </form>
    );
  }

  // set-password
  return (
    <form onSubmit={handleSetPassword} className="space-y-5" noValidate>
      <Alert tone={OTP_ENABLED ? "success" : "info"}>
        {t(OTP_ENABLED ? (mode === "reset" ? "setNewPasswordInfo" : "createPasswordInfo") : "createAccountInfo", { mobile })}
      </Alert>
      {!OTP_ENABLED && mobileInput}
      <PasswordInput
        name="newPassword"
        label={t(mode === "reset" ? "newPassword" : "createPassword")}
        autoComplete="new-password"
        hint={t("passwordHint", { n: MIN_PASSWORD_LENGTH })}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={fieldErrors.password}
        show={showPassword}
        onToggle={() => setShowPassword((s) => !s)}
        required
      />
      <PasswordInput
        name="confirmPassword"
        label={t("confirmPassword")}
        autoComplete="new-password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        error={fieldErrors.confirm}
        show={showPassword}
        onToggle={() => setShowPassword((s) => !s)}
        required
      />
      {errorAlert}
      {error === "errOtpExpired" && (
        <button type="button" onClick={() => startOtp(mode)} className="text-sm font-semibold text-brand-700 hover:text-brand-800">
          {t("resendOtp")}
        </button>
      )}
      <Button type="submit" size="lg" loading={loading} iconRight={FiArrowRight} className="w-full">
        {t(OTP_ENABLED ? "savePasswordContinue" : "createAccountContinue")}
      </Button>
    </form>
  );
}
