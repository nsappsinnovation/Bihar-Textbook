import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { getMyEnterprise } from "../lib/enterprisesApi";
import * as citizenAuth from "../lib/citizenAuth";

const AuthContext = createContext(null);
const ADMIN_ROLES = ["state", "district"];
const CITIZEN_EMAIL_RE = /^([6-9]\d{9})@citizen\.bppp\.local$/;

// Resolves the signed-in Firebase user into either an applicant or an admin identity.
// Only this portal's accounts count: BRLPP users (other email domain / "role" claim) are ignored.
const identityFrom = async (user) => {
  if (!user) return { uid: null, mobile: null, admin: null };
  const { claims } = await user.getIdTokenResult();
  if (ADMIN_ROLES.includes(claims.ppRole)) {
    return {
      uid: user.uid,
      mobile: null,
      admin: {
        uid: user.uid,
        loginId: (user.email || "").split("@")[0],
        name: user.displayName || (user.email || "").split("@")[0],
        role: claims.ppRole,
        district: claims.ppDistrict || "",
      },
    };
  }
  const citizen = (user.email || "").match(CITIZEN_EMAIL_RE);
  if (citizen) return { uid: user.uid, mobile: citizen[1], admin: null };
  return { uid: null, mobile: null, admin: null };
};

export function AuthProvider({ children }) {
  const [ready, setReady] = useState(false);
  const [uid, setUid] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [enterprise, setEnterprise] = useState(null);
  const [enterpriseLoading, setEnterpriseLoading] = useState(false);

  // The citizen's registered enterprise (null until they register).
  const refreshEnterprise = useCallback(async (id = auth.currentUser?.uid) => {
    if (!id) {
      setEnterprise(null);
      return null;
    }
    setEnterpriseLoading(true);
    try {
      const data = await getMyEnterprise(id);
      setEnterprise(data);
      return data;
    } catch (err) {
      console.error("Unable to load enterprise:", err);
      return null;
    } finally {
      setEnterpriseLoading(false);
    }
  }, []);

  useEffect(
    () =>
      onAuthStateChanged(auth, async (user) => {
        const identity = await identityFrom(user).catch(() => ({ uid: null, mobile: null, admin: null }));
        setUid(identity.mobile ? identity.uid : null);
        setMobile(identity.mobile);
        setAdmin(identity.admin);
        if (identity.mobile) await refreshEnterprise(identity.uid);
        else setEnterprise(null);
        setReady(true);
      }),
    [refreshEnterprise]
  );

  const value = useMemo(() => {
    const signedInCitizen = (m) => {
      setUid(auth.currentUser?.uid || null);
      setMobile(m);
      return refreshEnterprise(auth.currentUser?.uid);
    };
    return {
      ready,
      uid,
      mobile,
      admin,
      enterprise,
      enterpriseLoading,
      setEnterprise,
      refreshEnterprise,
      // Password login; returns the registered enterprise (or null for a new applicant).
      loginWithPassword: async (m, password) => {
        await citizenAuth.loginWithPassword(m, password);
        return signedInCitizen(m);
      },
      // OTP-less registration using the mobile as the account ID (same as BRLPP).
      registerWithPassword: async (m, password) => {
        await citizenAuth.registerWithPassword(m, password);
        return signedInCitizen(m);
      },
      // Browser-side OTP verification. Firebase sign-in follows setPassword.
      verifyOtp: async (m, otp) => citizenAuth.verifyOtp(m, otp),
      // Sets the password right after OTP; returns the registered enterprise (or null).
      setPassword: async (m, password) => {
        await citizenAuth.setPassword(m, password);
        return signedInCitizen(m);
      },
      setAdmin,
      logout: () => signOut(auth),
    };
  }, [ready, uid, mobile, admin, enterprise, enterpriseLoading, refreshEnterprise]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
