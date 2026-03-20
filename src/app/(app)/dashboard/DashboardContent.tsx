"use client";

import { Card } from "@/components/ui/Card";
import { NotifyButton } from "@/components/notify/NotifyButton";
import { usePatients } from "@/context/PatientsContext";

export function DashboardContent() {
  const { list } = usePatients();
  const critical = list.filter((p) => p.status === "critical").length;
  const review = list.filter((p) => p.status === "review").length;
  const stable = list.filter((p) => p.status === "stable").length;

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <p className="text-sm text-[var(--muted)]">Active patients</p>
          <p className="mt-2 text-3xl font-semibold">{list.length}</p>
          <p className="mt-1 text-xs text-[var(--muted)]">Across connected units</p>
        </Card>
        <Card>
          <p className="text-sm text-[var(--muted)]">Needs review</p>
          <p className="mt-2 text-3xl font-semibold text-[var(--warning)]">{review}</p>
          <p className="mt-1 text-xs text-[var(--muted)]">Follow-up this week</p>
        </Card>
        <Card className="sm:col-span-2 lg:col-span-1">
          <p className="text-sm text-[var(--muted)]">Critical alerts</p>
          <p className="mt-2 text-3xl font-semibold text-[var(--danger)]">{critical}</p>
          <p className="mt-1 text-xs text-[var(--muted)]">
            {stable} stable · {review} in review
          </p>
        </Card>
      </div>
      <Card className="mt-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-sm font-medium text-[var(--muted)]">Today</h2>
          <NotifyButton />
        </div>
        <ul className="mt-4 space-y-3 text-sm">
          <li className="flex justify-between border-b border-[var(--border)] pb-3">
            <span>Morning handoff</span>
            <span className="text-[var(--muted)]">08:00</span>
          </li>
          <li className="flex justify-between border-b border-[var(--border)] pb-3">
            <span>Pharmacy sync</span>
            <span className="text-[var(--muted)]">11:30</span>
          </li>
          <li className="flex justify-between">
            <span>Quality audit window</span>
            <span className="text-[var(--muted)]">15:00</span>
          </li>
        </ul>
      </Card>
    </>
  );
}
