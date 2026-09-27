// Citizen authentication.
//  - Everyday login: mobile + password (Firebase Auth email/password).
//  - Registration: mobile is mapped to a synthetic Firebase email account.
//  - Optional future mode: browser-side Startup Bihar OTP before password setup.
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, callable } from "./firebase";
import * as otpApi from "./otpApi";

export const OTP_RESEND_SECONDS = 30;
export const MIN_PASSWORD_LENGTH = 8;
const CITIZEN_EMAIL_DOMAIN = "citizen.brlpp.local";

const authError = (code, cause) => Object.assign(new Error(code), { code, cause });

// Maps Cloud Function / Firebase Auth errors to UI error codes used by the login screen.
const mapError = (err) => {
  if (err?.code?.startsWith("otp/")) return err;
  const reason = err?.details?.reason;
  const known = {
    "invalid-otp": "otp/invalid",
    "too-soon": "otp/too-soon",
    "too-many": "otp/too-many",
    "send-failed": "otp/send-failed",
    "invalid-mobile": "otp/invalid-mobile",
    "otp-expired": "auth/otp-expired",
    "weak-password": "auth/weak-password",
    disabled: "auth/disabled",
  };
  if (known[reason]) return authError(known[reason], err);
  if (["auth/invalid-credential", "auth/wrong-password", "auth/user-not-found", "auth/invalid-email"].includes(err?.code)) {
    return authError("auth/invalid-login", err);
  }
  if (err?.code === "auth/email-already-in-use") return authError("auth/account-exists", err);
  if (err?.code === "auth/weak-password") return authError("auth/weak-password", err);
  if (["auth/operation-not-allowed", "auth/configuration-not-found", "auth/admin-restricted-operation"].includes(err?.code)) {
    return authError("auth/registration-disabled", err);
  }
  if (err?.code === "auth/too-many-requests") return authError("auth/too-many", err);
  if (err?.code === "auth/user-disabled") return authError("auth/disabled", err);
  // Only genuine connectivity failures are reported as "network"; everything else is
  // logged with its real code so it can be diagnosed from the browser console.
  const offline = typeof navigator !== "undefined" && navigator.onLine === false;
  if (offline || reason === "network" || err?.code === "auth/network-request-failed" || err?.code === "functions/unavailable") {
    return authError("auth/network", err);
  }
  console.error("Citizen auth failed:", err?.code, err?.message, err);
  return authError("auth/unexpected", err);
};

const call = async (name, data) => {
  try {
    return (await callable(name)(data)).data;
  } catch (err) {
    throw mapError(err);
  }
};

export async function loginWithPassword(mobile, password) {
  try {
    await signInWithEmailAndPassword(auth, `${mobile}@${CITIZEN_EMAIL_DOMAIN}`, password);
  } catch (err) {
    throw mapError(err);
  }
}

export async function registerWithPassword(mobile, password) {
  try {
    await createUserWithEmailAndPassword(auth, `${mobile}@${CITIZEN_EMAIL_DOMAIN}`, password);
  } catch (err) {
    throw mapError(err);
  }
}

export async function sendOtp(mobile) {
  try {
    return await otpApi.sendOtp(mobile);
  } catch (err) {
    throw mapError(err);
  }
}

// OTP verification is intentionally browser-side. Firebase sign-in happens
// after the citizen has created/reset their password.
export async function verifyOtp(mobile, otp) {
  try {
    return await otpApi.verifyOtp(mobile, otp);
  } catch (err) {
    throw mapError(err);
  }
}

// Creates or resets the synthetic Firebase email/password account, then signs
// in. The reset endpoint also revokes older sessions.
export async function setPassword(mobile, password) {
  await call("resetPassword", { mobile, password });
  await loginWithPassword(mobile, password);
}
