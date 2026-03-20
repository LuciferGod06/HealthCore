import { AuthGate } from "@/components/auth/AuthGate";
import { PatientsProvider } from "@/context/PatientsContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate>
      <PatientsProvider>{children}</PatientsProvider>
    </AuthGate>
  );
}
