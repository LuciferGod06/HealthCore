import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAnalytics, type Analytics } from "firebase/analytics";
import { getAuth, type Auth } from "firebase/auth";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? "",
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let analytics: Analytics | null = null;

export function getFirebaseApp(): FirebaseApp | null {
  if (!config.apiKey || !config.authDomain || !config.projectId) return null;
  if (!getApps().length) {
    app = initializeApp(config);
  } else {
    app = getApps()[0]!;
  }
  return app;
}

export function getFirebaseAuth(): Auth | null {
  const a = getFirebaseApp();
  if (!a) return null;
  if (!auth) auth = getAuth(a);
  return auth;
}



export function getFirebaseAnalytics(): Analytics | null {
  console.log("getFirebaseAnalytics");
  const a = getFirebaseApp();
  if (!a) return null;
  if (typeof window === "undefined") return null;
  if (!config.appId) return null;
  try {
    console.log("getFirebaseAnalytics", a);
    if (!analytics) analytics = getAnalytics(a);
    return analytics;
  } catch {
    return null;
  }
}
