"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { LogoMark } from "@/components/brand/LogoMark";
import { useAuth, useIsSignedIn } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { loading } = useAuth();
  const signedIn = useIsSignedIn();
  const [toast, setToast] = useState("");
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const flag =
      typeof window !== "undefined"
        ? sessionStorage.getItem("hc_signup_toast")
        : null;
    if (flag) {
      sessionStorage.removeItem("hc_signup_toast");
      setToast("Registration complete. Please sign in with the same credentials.");
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
      toastTimerRef.current = window.setTimeout(() => setToast(""), 4500);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (toast) return;
    const flag = sessionStorage.getItem("hc_signup_toast");
    if (!flag) return;
    sessionStorage.removeItem("hc_signup_toast");
    setToast("Registration complete. Please sign in with the same credentials.");
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(""), 4500);
  }, [loading, signedIn, toast]);

  useEffect(() => {
    if (loading || !signedIn) return;
    const skip =
      typeof window !== "undefined"
        ? sessionStorage.getItem("hc_skip_dashboard_redirect")
        : null;
    if (skip) return;
    router.replace("/dashboard");
  }, [loading, signedIn, router]);

  if (loading || signedIn) {
    return (
      <>
        {toast ? (
          <div className="fixed right-6 top-6 z-50 w-[min(420px,calc(100vw-2rem))] rounded-xl border border-[var(--border)] bg-[var(--surface2)] px-4 py-3 text-sm shadow-sm">
            {toast}
          </div>
        ) : null}
        <div className="flex min-h-screen items-center justify-center bg-[var(--bg)]">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-teal-500 border-t-transparent" />
        </div>
      </>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      {toast ? (
        <div className="fixed right-6 top-6 z-50 w-[min(420px,calc(100vw-2rem))] rounded-xl border border-[var(--border)] bg-[var(--surface2)] px-4 py-3 text-sm shadow-sm">
          {toast}
        </div>
      ) : null}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,_rgb(204_251_241_/_0.85),_transparent)]" />
      <div className="login-page-dot-patch" aria-hidden />
      <div className="pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-teal-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-10 h-64 w-64 rounded-full bg-sky-200/35 blur-3xl" />
      <div className="relative z-10 flex w-full max-w-lg flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <LogoMark className="h-12 w-12 text-xl" />
          <div>
            <p className="text-2xl font-semibold tracking-tight">HealthCore B2B</p>
            <p className="text-sm text-[var(--muted)]">Secure access for care teams</p>
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
