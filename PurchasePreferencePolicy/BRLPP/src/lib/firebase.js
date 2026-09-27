import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions, httpsCallable, httpsCallableFromURL } from "firebase/functions";
import { connectStorageEmulator, getStorage } from "firebase/storage";

// Firebase web configuration for the BRLPP portal (public by design; access is
// enforced by Firebase Auth + security rules).
const firebaseConfig = {
  apiKey: "AIzaSyDFQldKhslzdRYyoCniWSDsjAI--EQNGtc",
  authDomain: "carbonfootprint-69ba7.firebaseapp.com",
  projectId: "carbonfootprint-69ba7",
  storageBucket: "carbonfootprint-69ba7.appspot.com",
  messagingSenderId: "48930140916",
  appId: "1:48930140916:web:34bb8161628294e09564a1",
};

export const FUNCTIONS_REGION = "asia-south1";

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app, FUNCTIONS_REGION);

// Local development against the Firebase Emulator Suite: set VITE_USE_EMULATORS=true.
if (import.meta.env.VITE_USE_EMULATORS === "true") {
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
  connectStorageEmulator(storage, "127.0.0.1", 9199);
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}

// On the hosted portal, call functions through same-origin Hosting rewrites
// (/api/<name>, see firebase.json) instead of *.cloudfunctions.net, which some
// ad-blockers, proxies and office firewalls block.
const useSameOrigin =
  import.meta.env.VITE_USE_EMULATORS !== "true" && !["localhost", "127.0.0.1"].includes(window.location.hostname);

export const callable = (name) =>
  useSameOrigin ? httpsCallableFromURL(functions, `${window.location.origin}/api/${name}`) : httpsCallable(functions, name);
