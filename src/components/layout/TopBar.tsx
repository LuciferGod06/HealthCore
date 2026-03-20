"use client";

import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

export function TopBar({ title }: { title: string }) {
  const { user, logout } = useAuth();
  const email = user?.email ?? "";

  return (
    <header className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface)]/90 px-8 py-4 shadow-sm shadow-slate-900/5 backdrop-blur-md">
      <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
      <div className="flex items-center gap-4">
        <span className="hidden text-sm text-[var(--muted)] sm:inline truncate max-w-[200px]">
          {email}
        </span>
        <Button variant="ghost" className="!py-2 !px-3" onClick={() => logout()}>
          Sign out
        </Button>
      </div>
    </header>
  );
}
