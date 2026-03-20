"use client";

import { useState } from "react";
import { usePatients } from "@/context/PatientsContext";
import { PatientGrid } from "./PatientGrid";
import { PatientList } from "./PatientList";
import { ViewToggle } from "./ViewToggle";

export function PatientsPanel() {
  const { list } = usePatients();
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[var(--muted)]">
          {list.length} patients · toggle layout for rounds or desk work
        </p>
        <ViewToggle value={view} onChange={setView} />
      </div>
      {view === "grid" ? <PatientGrid items={list} /> : <PatientList items={list} />}
    </div>
  );
}
