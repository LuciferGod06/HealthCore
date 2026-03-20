"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth, useIsSignedIn } from "@/context/AuthContext";

export default function HomePage() {
  const router = useRouter();
  const { loading } = useAuth();
  const signedIn = useIsSignedIn();

  useEffect(() => {
    if (loading) return;
    router.replace(signedIn ? "/dashboard" : "/login");
  }, [loading, signedIn, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg)]">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-teal-500 border-t-transparent" />
    </div>
  );
}
