"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoMark } from "@/components/brand/LogoMark";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/analytics", label: "Analytics" },
  { href: "/patients", label: "Patients" },
];

export function Sidebar() {
  const path = usePathname();
  return (
    <aside className="flex w-56 flex-col gap-6 border-r border-[var(--border)] bg-[var(--surface)]/95 px-4 py-6 shadow-sm shadow-slate-900/5 backdrop-blur-sm">
      <div className="flex items-center gap-3 px-1">
        <LogoMark />
        <div>
          <p className="text-sm font-semibold tracking-tight">HealthCare</p>
          <p className="text-xs text-[var(--muted)]">Clinical Suite</p>
        </div>
      </div>
      <nav className="flex flex-col gap-1">
        {links.map((l) => {
          const active = path === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-lg px-3 py-2 text-sm transition ${
                active
                  ? "bg-gradient-to-r from-teal-100 to-sky-50 text-[var(--accent)] font-medium shadow-sm"
                  : "text-[var(--muted)] hover:bg-[var(--surface2)] hover:text-[var(--text)]"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
