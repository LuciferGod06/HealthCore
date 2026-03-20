"use client";

import { useEffect, useRef } from "react";
import { useAuth, useIsSignedIn } from "@/context/AuthContext";
import { getFirebaseAnalytics } from "@/lib/firebase";

export function FirebaseAnalyticsInit() {
  const { loading } = useAuth();
  const signedIn = useIsSignedIn();
  const startedRef = useRef(false);

  useEffect(() => {
    try {
      if (startedRef.current) return;
      if (loading) return;
      if (!signedIn) return;

      const flag =
        typeof window !== "undefined"
          ? sessionStorage.getItem("hc_analytics_start")
          : null;
      if (!flag) return;
      sessionStorage.removeItem("hc_analytics_start");

      startedRef.current = true;

      const el = document.getElementById(
        "hc-firebase-analytics-init"
      ) as HTMLElement | null;
      if (el) el.dataset.state = "running";

      const a = getFirebaseAnalytics();
      if (el) el.dataset.state = a ? "done" : "skipped";
    } catch {
      const el = document.getElementById(
        "hc-firebase-analytics-init"
      ) as HTMLElement | null;
      if (el) el.dataset.state = "error";
    }
  }, [loading, signedIn]);

  return (
    <span
      id="hc-firebase-analytics-init"
      data-state="idle"
      style={{ display: "none" }}
    />
  );
}

