"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/context/AuthContext";

function EyeIcon({ on }: { on: boolean }) {
  return on ? (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2 12s3.6-7 10-7c2.2 0 4 .7 5.4 1.7" />
      <path d="M22 12s-3.6 7-10 7c-2.2 0-4-.7-5.4-1.7" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
      <path d="M1 1l22 22" />
    </svg>
  );
}

const codeMessages = {
  "auth/invalid-credential": "Email or password is incorrect. Please try again.",
  "auth/invalid-login-credentials": "Email or password is incorrect. Please try again.",
  "auth/wrong-password": "Email or password is incorrect. Please try again.",
  "auth/user-not-found": "No account found for this email. Please sign up first.",
  "auth/invalid-email": "Enter a valid email address.",
  "auth/email-already-in-use": "This email is already registered. Please sign in.",
  "auth/weak-password": "Your password is too weak. Use at least 6 characters.",
}

export function LoginForm() {
  const router = useRouter();
  const { login, signup, firebaseReady, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");
  const toastTimerRef = useRef<number | null>(null);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const googleTimerRef = useRef<number | null>(null);
  const googleReqIdRef = useRef(0);
  const googleDoneRef = useRef(true);

  function showToast(text: string) {
    setToast(text);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(""), 4500);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const mail = email.trim();
      if (mode === "signup" && password !== confirm) {
        throw new Error("Passwords do not match.");
      }
      await (mode === "login"
        ? login(mail, password)
        : signup(mail, password));

      if (mode === "signup") {
        setMode("login");
        setConfirm("");
        setPassword("");
        if (typeof window !== "undefined") {
          sessionStorage.setItem("hc_signup_toast", "1");
        }
        showToast(
          "Registration complete. Please sign in with the same credentials."
        );
        return;
      }

      if (typeof window !== "undefined") {
        sessionStorage.setItem("hc_analytics_start", "1");
      }
      router.replace("/dashboard");
    } catch (err: unknown) {
      const anyErr = err as { message?: string; code?: string } | null;
      const code = anyErr?.code ?? "";
      const base = mode === "login" ? "Sign in failed." : "Sign up failed.";
      let friendly = anyErr?.message ?? base;

      if (code === "auth/configuration-not-found") {
        setError(
          "Firebase Auth is not fully configured. Enable Email/Password in Firebase Console (Authentication → Sign-in method), then try again."
        );
        return;
      }
      if (code in codeMessages) {
        friendly = codeMessages[code as keyof typeof codeMessages];
      }

      setError(friendly);
    } finally {
      setBusy(false);
    }
  }

  async function onGoogle() {
    setError("");
    setBusy(true);
    googleReqIdRef.current += 1;
    const reqId = googleReqIdRef.current;
    googleDoneRef.current = false;
    try {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("hc_analytics_start", "1");
      }
      if (typeof window !== "undefined" && googleTimerRef.current) {
        window.clearTimeout(googleTimerRef.current);
      }
      if (typeof window !== "undefined") {
        googleTimerRef.current = window.setTimeout(() => {
          if (googleReqIdRef.current !== reqId) return;
          if (googleDoneRef.current) return;
          setError(
            "Google sign-in is taking longer than usual. You can click again; if it finishes, you will be redirected."
          );
          setBusy(false);
        }, 180000);
      }
      await loginWithGoogle();
      if (typeof window !== "undefined") {
        if (googleTimerRef.current) window.clearTimeout(googleTimerRef.current);
      }
      router.replace("/dashboard");
    } catch (err: unknown) {
      const anyErr = err as { code?: string; message?: string } | null;
      const code = anyErr?.code ?? "";
      if (code === "auth/popup-blocked") {
        setError("Popup blocked. Please allow popups and try again.");
        return;
      }
      if (code === "auth/cancelled-popup-request") {
        setError("Google sign-in cancelled.");
        return;
      }
      if (code === "auth/popup-closed-by-user" || code === "auth/popup-closed") {
        setError("Google sign-in cancelled.");
        return;
      }
      setError(anyErr?.message ?? "Google sign-in failed.");
    } finally {
      if (typeof window !== "undefined" && googleTimerRef.current) {
        window.clearTimeout(googleTimerRef.current);
      }
      googleTimerRef.current = null;
      googleDoneRef.current = true;
      setBusy(false);
    }
  }

  return (
    <>
      {toast ? (
        <div className="fixed right-6 top-6 z-50 w-[min(420px,calc(100vw-2rem))] rounded-xl border border-[var(--border)] bg-[var(--surface2)] px-4 py-3 text-sm shadow-sm">
          {toast}
        </div>
      ) : null}
      <Card className="w-full max-w-md">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {firebaseReady
              ? mode === "login"
                ? "Use your clinic credentials."
                : "Start in seconds, care teams will be ready."
              : "Firebase Auth is not configured. Set the Firebase env keys and enable Email/Password in Firebase Console."}
          </p>
        </div>
        <Input
          label="Work email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-[var(--muted)]">Password</span>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className={`w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 pr-12 text-[var(--text)] placeholder:text-[var(--muted)] focus:border-[var(--focus)] focus:outline-none focus:ring-2 focus:ring-[var(--focus)]/25`}
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-[var(--muted)] hover:text-[var(--text)]"
            >
              <EyeIcon on={showPass} />
            </button>
          </div>
        </label>
        {mode === "signup" && (
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="text-(--muted)">Confirm password</span>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                minLength={6}
                className={`w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 pr-12 text-[var(--text)] placeholder:text-[var(--muted)] focus:border-[var(--focus)] focus:outline-none focus:ring-2 focus:ring-[var(--focus)]/25`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-[var(--muted)] hover:text-[var(--text)]"
              >
                <EyeIcon on={showConfirm} />
              </button>
            </div>
          </label>
        )}
        {error && (
          <p className="rounded-lg bg-[var(--danger-soft)] px-3 py-2 text-sm text-[var(--danger)] ring-1 ring-rose-200">
            {error}
          </p>
        )}
        <Button type="submit" className="w-full" disabled={busy}>
          {busy ? (mode === "login" ? "Signing in…" : "Creating…") : mode === "login" ? "Sign in" : "Sign up"}
        </Button>
        {mode === "login" && (
          <Button
            type="button"
            variant="ghost"
            className="w-full !border-[var(--border)] !bg-[var(--surface)] shadow-sm"
            onClick={onGoogle}
            disabled={busy || !firebaseReady}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 48 48"
              fill="none"
              aria-hidden
            >
              <path
                d="M44.5 20.2H42V20H24v8h10.1c-1.6 4.7-6.1 8-11.1 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.9 1.1 8.1 3.2l5.7-5.7C32.9 6.8 28.6 5 24 5 12.95 5 4 13.95 4 25s8.95 20 20 20c11.05 0 20-8.95 20-20 0-1.4-.15-2.7-.5-3.8z"
                fill="currentColor"
                opacity="0.9"
              />
            </svg>
            Continue with Google
          </Button>
        )}
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={() => {
              setMode((m) => (m === "login" ? "signup" : "login"));
              setError("");
              setConfirm("");
              setShowPass(false);
              setShowConfirm(false);
            }}
            className="text-sm text-[var(--accent)] hover:underline"
          >
            {mode === "login" ? "New here? Sign up" : "Have an account? Sign in"}
          </button>
        </div>
      </form>
      </Card>
    </>
  );
}
