import { Shell } from "@/components/layout/Shell";
import { PatientsPanel } from "./PatientsPanel";

export default function PatientsPage() {
  return (
    <Shell title="Patient details">
      <PatientsPanel />
    </Shell>
  );
}
