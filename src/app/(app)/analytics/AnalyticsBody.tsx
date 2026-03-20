"use client";

import { Card } from "@/components/ui/Card";
import { usePatients } from "@/context/PatientsContext";

function Bar({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = max ? Math.round((value / max) * 100) : 0;
  return (
    <div>
      <div className="flex justify-between text-xs text-[var(--muted)]">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="mt-1 h-2 overflow-hidden rounded-full bg-[var(--surface2)]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-teal-500 to-sky-500 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function AnalyticsBody() {
  const { list } = usePatients();
  const byStatus = {
    stable: list.filter((p) => p.status === "stable").length,
    review: list.filter((p) => p.status === "review").length,
    critical: list.filter((p) => p.status === "critical").length,
  };
  const max = Math.max(...Object.values(byStatus), 1);
  const avgAge = list.length
    ? Math.round(list.reduce((a, p) => a + p.age, 0) / list.length)
    : 0;
  const uniqueConditions = new Set(list.map((p) => p.condition)).size;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <h2 className="font-medium">Caseload by status</h2>
        <div className="mt-6 space-y-4">
          <Bar label="Stable" value={byStatus.stable} max={max} />
          <Bar label="Review" value={byStatus.review} max={max} />
          <Bar label="Critical" value={byStatus.critical} max={max} />
        </div>
      </Card>
      <Card>
        <h2 className="font-medium">Operational snapshot</h2>
        <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div className="rounded-xl bg-[var(--surface2)] p-4">
            <dt className="text-[var(--muted)]">Avg. age</dt>
            <dd className="mt-1 text-2xl font-semibold">{avgAge}</dd>
          </div>
          <div className="rounded-xl bg-[var(--surface2)] p-4">
            <dt className="text-[var(--muted)]">Unique conditions</dt>
            <dd className="mt-1 text-2xl font-semibold">{uniqueConditions}</dd>
          </div>
        </dl>
      </Card>
    </div>
  );
}
