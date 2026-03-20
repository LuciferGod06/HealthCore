import type { Patient } from "@/types/patient";

const map = {
  stable:
    "bg-[var(--success-soft)] text-[var(--success)] ring-1 ring-emerald-200",
  review:
    "bg-[var(--warning-soft)] text-[var(--warning)] ring-1 ring-amber-200",
  critical: "bg-[var(--danger-soft)] text-[var(--danger)] ring-1 ring-rose-200",
};

export function StatusPill({ status }: { status: Patient["status"] }) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${map[status]}`}>
      {status}
    </span>
  );
}
