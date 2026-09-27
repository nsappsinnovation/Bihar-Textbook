import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { getApplicant } from "../lib/applicationsApi";
import * as citizenAuth from "../lib/citizenAuth";

const AuthContext = createContext(null);
const ADMIN_ROLES = ["state", "district"];
const CITIZEN_EMAIL_RE = /^([6-9]\d{9})@citizen\.brlpp\.local$/;

// Resolves the signed-in Firebase user into either an applicant or an admin identity.
const identityFrom = async (user) => {
  if (!user) return { mobile: null, admin: null };
  const { claims } = await user.getIdTokenResult();
  if (claims.role === "applicant" && claims.mobile) return { mobile: claims.mobile, admin: null };
  if (ADMIN_ROLES.includes(claims.role)) {
    return {
      mobile: null,
      admin: {
        uid: user.uid,
        loginId: (user.email || "").split("@")[0],
        name: user.displayName || (user.email || "").split("@")[0],
        role: claims.role,
        district: claims.district || "",
      },
    };
  }
  const citizen = (user.email || "").match(CITIZEN_EMAIL_RE);
  if (citizen) return { mobile: citizen[1], admin: null };
  return { mobile: null, admin: null };
};

export function AuthProvider({ children }) {
  const [ready, setReady] = useState(false);
  const [mobile, setMobile] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  const refreshProfile = useCallback(async (m) => {
    if (!m) {
      setProfile(null);
      return null;
    }
    setProfileLoading(true);
    try {
      const data = await getApplicant(m);
      setProfile(data);
      return data;
    } catch (err) {
      console.error("Unable to load applicant profile:", err);
      return null;
    } finally {
      setProfileLoading(false);
    }
  }, []);

  useEffect(
    () =>
      onAuthStateChanged(auth, async (user) => {
        const identity = await identityFrom(user).catch(() => ({ mobile: null, admin: null }));
        setMobile(identity.mobile);
        setAdmin(identity.admin);
        if (identity.mobile) await refreshProfile(identity.mobile);
        else setProfile(null);
        setReady(true);
      }),
    [refreshProfile]
  );

  const value = useMemo(
    () => ({
      ready,
      mobile,
      admin,
      profile,
      profileLoading,
      setProfile,
      refreshProfile,
      // Password login; returns the saved profile (or null for a new applicant).
      loginWithPassword: async (m, password) => {
        await citizenAuth.loginWithPassword(m, password);
        setMobile(m);
        return refreshProfile(m);
      },
      // Temporary OTP-less registration using the mobile as the account ID.
      registerWithPassword: async (m, password) => {
        await citizenAuth.registerWithPassword(m, password);
        setMobile(m);
        return refreshProfile(m);
      },
      // Browser-side OTP verification. Firebase sign-in follows setPassword.
      verifyOtp: async (m, otp) => {
        return citizenAuth.verifyOtp(m, otp);
      },
      // Sets the password right after OTP; returns the saved profile (or null).
      setPassword: async (m, password) => {
        await citizenAuth.setPassword(m, password);
        return refreshProfile(m);
      },
      setAdmin,
      logout: () => signOut(auth),
    }),
    [ready, mobile, admin, profile, profileLoading, refreshProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
