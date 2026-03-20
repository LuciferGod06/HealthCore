import { Card } from "@/components/ui/Card";
import { StatusPill } from "@/components/ui/StatusPill";
import type { Patient } from "@/types/patient";

export function PatientGrid({ items }: { items: Patient[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((p) => (
        <Card key={p.id} className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-medium">{p.name}</p>
              <p className="text-sm text-[var(--muted)]">
                {p.age} yrs · {p.room ?? "—"}
              </p>
            </div>
            <StatusPill status={p.status} />
          </div>
          <p className="text-sm text-[var(--text)]/90">{p.condition}</p>
          <p className="text-xs text-[var(--muted)]">Last visit {p.lastVisit}</p>
        </Card>
      ))}
    </div>
  );
}
