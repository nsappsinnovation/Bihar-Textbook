/**
 * BRLPP Cloud Functions
 *  - resetPassword: creates or resets the citizen's synthetic Firebase Auth
 *    email/password account after browser-side OTP.
 *  - listAdmins / createAdmin / updateAdmin: State admin management of admin
 *    accounts (Firebase Auth users with { role, district } custom claims).
 */
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { setGlobalOptions, logger } = require("firebase-functions/v2");
const admin = require("firebase-admin");
const DISTRICTS = require("./districts.json");

admin.initializeApp();
setGlobalOptions({ region: "asia-south1", maxInstances: 20 });

const db = admin.firestore();
const ADMIN_EMAIL_DOMAIN = "admin.brlpp.local";
const MOBILE_RE = /^[6-9]\d{9}$/;
const LOGIN_ID_RE = /^[a-z0-9][a-z0-9_.-]{2,31}$/;


const CITIZEN_EMAIL_DOMAIN = "citizen.brlpp.local";
const CITIZEN_OTP_ENABLED = process.env.CITIZEN_OTP_ENABLED === "true";
const RESET_MAX_PER_MOBILE_PER_DAY = 3;
const RESET_MAX_PER_IP_PER_HOUR = 10;

const normalizeMobile = (value) => {
  const mobile = String(value || "").replace(/\D/g, "").slice(-10);
  if (!MOBILE_RE.test(mobile)) throw new HttpsError("invalid-argument", "Invalid mobile number", { reason: "invalid-mobile" });
  return mobile;
};

// Sliding-window counter stored server-side (collection is closed to clients by rules).
async function throttle(tx, ref, windowMs, max) {
  const now = Date.now();
  const snap = await tx.get(ref);
  const hits = (snap.exists ? snap.get("hits") || [] : []).filter((t) => now - t < windowMs);
  if (hits.length >= max) throw new HttpsError("resource-exhausted", "Too many attempts", { reason: "too-many" });
  return () => tx.set(ref, { hits: [...hits, now] });
}

/**
 * Account creation / forgot password. OTP is sent and verified in the browser (Startup Bihar OTP
 * API), so this endpoint cannot prove the OTP step happened; it is rate limited
 * per mobile and per IP, revokes all sessions and is audit-logged.
 */
exports.resetPassword = onCall(async (request) => {
  if (!CITIZEN_OTP_ENABLED) {
    throw new HttpsError("failed-precondition", "Password recovery is temporarily unavailable", { reason: "otp-disabled" });
  }
  const mobile = normalizeMobile(request.data?.mobile);
  const password = String(request.data?.password || "");
  if (password.length < 8 || password.length > 64) {
    throw new HttpsError("invalid-argument", "Weak password", { reason: "weak-password" });
  }
  const ip = String(request.rawRequest?.ip || "unknown").replace(/[^0-9a-fA-F:.]/g, "_");

  await db.runTransaction(async (tx) => {
    const commitMobile = await throttle(tx, db.doc(`resetThrottle/m_${mobile}`), 24 * 60 * 60 * 1000, RESET_MAX_PER_MOBILE_PER_DAY);
    const commitIp = await throttle(tx, db.doc(`resetThrottle/ip_${ip}`), 60 * 60 * 1000, RESET_MAX_PER_IP_PER_HOUR);
    commitMobile();
    commitIp();
  });

  const email = `${mobile}@${CITIZEN_EMAIL_DOMAIN}`;
  let user;
  try {
    user = await admin.auth().getUserByEmail(email);
    if (user.disabled) throw new HttpsError("permission-denied", "Account disabled", { reason: "disabled" });
    await admin.auth().updateUser(user.uid, { password });
    await admin.auth().revokeRefreshTokens(user.uid);
  } catch (err) {
    if (err.code !== "auth/user-not-found") throw err;
    user = await admin.auth().createUser({ uid: `mob_${mobile}`, email, password, emailVerified: true });
  }
  logger.info("Applicant password reset", { mobile: `******${mobile.slice(-4)}`, ip, uid: user.uid });
  return { success: true };
});

// ---------------- Admin management (State admin only) ----------------

const requireState = (request) => {
  if (request.auth?.token?.role !== "state") throw new HttpsError("permission-denied", "State admin only");
};

const toAdmin = (u) => ({
  uid: u.uid,
  loginId: (u.email || "").split("@")[0],
  name: u.displayName || "",
  role: u.customClaims?.role || "",
  district: u.customClaims?.district || "",
  disabled: u.disabled,
  createdAt: u.metadata.creationTime,
  lastSignIn: u.metadata.lastSignInTime || null,
});

exports.listAdmins = onCall(async (request) => {
  requireState(request);
  const admins = [];
  let pageToken;
  do {
    const page = await admin.auth().listUsers(1000, pageToken);
    page.users
      .filter((u) => (u.email || "").endsWith(`@${ADMIN_EMAIL_DOMAIN}`))
      .forEach((u) => admins.push(toAdmin(u)));
    pageToken = page.pageToken;
  } while (pageToken);
  return { admins: admins.sort((a, b) => a.role.localeCompare(b.role) || a.district.localeCompare(b.district)) };
});

exports.createAdmin = onCall(async (request) => {
  requireState(request);
  const { loginId, name, password, role, district } = request.data || {};
  const id = String(loginId || "").trim().toLowerCase();
  if (!LOGIN_ID_RE.test(id)) throw new HttpsError("invalid-argument", "Invalid admin ID", { reason: "invalid-login-id" });
  if (!name || String(name).trim().length < 3) throw new HttpsError("invalid-argument", "Name required", { reason: "invalid-name" });
  if (String(password || "").length < 8) throw new HttpsError("invalid-argument", "Weak password", { reason: "weak-password" });
  if (!["state", "district"].includes(role)) throw new HttpsError("invalid-argument", "Invalid role", { reason: "invalid-role" });
  if (role === "district" && !DISTRICTS.includes(district)) {
    throw new HttpsError("invalid-argument", "Invalid district", { reason: "invalid-district" });
  }

  try {
    const user = await admin.auth().createUser({
      email: `${id}@${ADMIN_EMAIL_DOMAIN}`,
      password: String(password),
      displayName: String(name).trim(),
    });
    const claims = role === "state" ? { role } : { role, district };
    await admin.auth().setCustomUserClaims(user.uid, claims);
    logger.info("Admin created", { by: request.auth.uid, loginId: id, role, district });
    return { admin: toAdmin({ ...user, customClaims: claims }) };
  } catch (err) {
    if (err.code === "auth/email-already-exists") {
      throw new HttpsError("already-exists", "Admin ID already exists", { reason: "exists" });
    }
    throw err;
  }
});

exports.updateAdmin = onCall(async (request) => {
  requireState(request);
  const { uid, disabled, password } = request.data || {};
  if (!uid) throw new HttpsError("invalid-argument", "uid required");
  if (uid === request.auth.uid && disabled) {
    throw new HttpsError("failed-precondition", "Cannot disable yourself", { reason: "self" });
  }
  const target = await admin.auth().getUser(uid);
  if (!(target.email || "").endsWith(`@${ADMIN_EMAIL_DOMAIN}`)) throw new HttpsError("not-found", "Not an admin");

  const patch = {};
  if (typeof disabled === "boolean") patch.disabled = disabled;
  if (password !== undefined) {
    if (String(password).length < 8) throw new HttpsError("invalid-argument", "Weak password", { reason: "weak-password" });
    patch.password = String(password);
  }
  const user = await admin.auth().updateUser(uid, patch);
  if (patch.disabled || patch.password) await admin.auth().revokeRefreshTokens(uid);
  logger.info("Admin updated", { by: request.auth.uid, uid, disabled: patch.disabled, passwordReset: !!patch.password });
  return { admin: toAdmin(user) };
});
