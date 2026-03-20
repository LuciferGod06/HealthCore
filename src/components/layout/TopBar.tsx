"use client";

import { Button } from "@/components/ui/Button";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export function TopBar({ title }: { title: string }) {
  const { user, logout } = useAuth();
  const email = user?.email ?? "";

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);

  async function onConfirmLogout() {
    setConfirming(true);
    try {
      await logout();
      setConfirmOpen(false);
    } finally {
      setConfirming(false);
    }
  }

  return (
    <header className="flex items-center justify-between border-b border-(--border) bg-(--surface)/90 px-8 py-4 shadow-sm shadow-slate-900/5 backdrop-blur-md">
      <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
      <div className="flex items-center gap-4">
        <span className="hidden text-sm text-(--muted) sm:inline truncate max-w-[200px]">
          {email}
        </span>
        <ConfirmModal
          open={confirmOpen}
          title="Sign out?"
          description="You will need to sign in again to access your dashboard."
          confirmText={confirming ? "Signing out..." : "Sign out"}
          cancelText="Cancel"
          confirmVariant="danger"
          confirmDisabled={confirming}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={onConfirmLogout}
        />
        <Button
          variant="ghost"
          className="py-2! px-3!"
          onClick={() => setConfirmOpen(true)}
        >
          Sign out
        </Button>
      </div>
    </header>
  );
}
