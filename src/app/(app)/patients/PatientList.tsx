import { StatusPill } from "@/components/ui/StatusPill";
import type { Patient } from "@/types/patient";

export function PatientList({ items }: { items: Patient[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
      <table className="w-full text-left text-sm">
        <thead className="bg-[var(--surface2)] text-xs uppercase tracking-wide text-[var(--muted)]">
          <tr>
            <th className="px-4 py-3 font-medium">Patient</th>
            <th className="hidden px-4 py-3 font-medium md:table-cell">Condition</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="hidden px-4 py-3 font-medium lg:table-cell">Room</th>
            <th className="px-4 py-3 font-medium">Last visit</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)] bg-[var(--surface)]">
          {items.map((p) => (
            <tr key={p.id} className="hover:bg-[var(--surface2)]/60">
              <td className="px-4 py-3">
                <p className="font-medium">{p.name}</p>
                <p className="text-xs text-[var(--muted)] md:hidden">{p.condition}</p>
              </td>
              <td className="hidden px-4 py-3 text-[var(--muted)] md:table-cell">{p.condition}</td>
              <td className="px-4 py-3">
                <StatusPill status={p.status} />
              </td>
              <td className="hidden px-4 py-3 lg:table-cell">{p.room ?? "—"}</td>
              <td className="px-4 py-3 text-[var(--muted)]">{p.lastVisit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
