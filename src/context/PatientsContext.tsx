"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { patients as seed } from "@/data/patients";
import type { Patient } from "@/types/patient";

type PatientsState = {
  list: Patient[];
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
};

const PatientsContext = createContext<PatientsState | null>(null);

export function PatientsProvider({ children }: { children: ReactNode }) {
  const [list] = useState<Patient[]>(seed);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const value = useMemo(
    () => ({ list, selectedId, setSelectedId }),
    [list, selectedId]
  );

  return (
    <PatientsContext.Provider value={value}>
      {children}
    </PatientsContext.Provider>
  );
}

export function usePatients() {
  const ctx = useContext(PatientsContext);
  if (!ctx) throw new Error("usePatients needs PatientsProvider");
  return ctx;
}
