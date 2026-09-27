import { getDocs, query, where } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, callable, ppCol } from "./firebase";
import { sortNewestFirst } from "./enterprisesApi";

export const ROLE_STATE = "state";
export const ROLE_DISTRICT = "district";
// Separate from BRLPP ("admin.brlpp.local"); roles come from the ppRole / ppDistrict claims.
export const ADMIN_EMAIL_DOMAIN = "admin.bppp.local";

const loginEmail = (loginId) => `${String(loginId || "").trim().toLowerCase()}@${ADMIN_EMAIL_DOMAIN}`;

// Returns { admin } on success or { error: translationKey }.
export async function adminLogin(loginId, password) {
  try {
    const { user } = await signInWithEmailAndPassword(auth, loginEmail(loginId), password);
    const { claims } = await user.getIdTokenResult(true);
    if (![ROLE_STATE, ROLE_DISTRICT].includes(claims.ppRole)) {
      await signOut(auth);
      return { error: "errAdminPassword" };
    }
    return {
      admin: {
        uid: user.uid,
        loginId: user.email.split("@")[0],
        name: user.displayName || user.email.split("@")[0],
        role: claims.ppRole,
        district: claims.ppDistrict || "",
      },
    };
  } catch (err) {
    if (err.code === "auth/user-disabled") return { error: "errAdminDisabled" };
    if (err.code === "auth/too-many-requests") return { error: "errTooManyAttempts" };
    if (err.code === "auth/network-request-failed") return { error: "errNetwork" };
    if (["auth/invalid-credential", "auth/wrong-password", "auth/user-not-found", "auth/invalid-email"].includes(err.code)) {
      return { error: "errAdminPassword" };
    }
    console.error("Admin login failed:", err);
    return { error: "errGeneric" };
  }
}

// Scope is enforced by security rules; district admins must query by their district.
export async function fetchEnterprises(admin) {
  const col = ppCol("enterprises");
  const q = admin?.role === ROLE_STATE ? col : query(col, where("district", "==", admin?.district || "__none__"));
  const snap = await getDocs(q);
  return sortNewestFirst(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
}

// State-admin account management (Cloud Functions).
export const listAdmins = async () => (await callable("ppListAdmins")()).data.admins;
export const createAdmin = async (payload) => (await callable("ppCreateAdmin")(payload)).data.admin;
export const updateAdmin = async (payload) => (await callable("ppUpdateAdmin")(payload)).data.admin;
