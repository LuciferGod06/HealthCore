"use client";

type View = "grid" | "list";

export function ViewToggle({
  value,
  onChange,
}: {
  value: View;
  onChange: (v: View) => void;
}) {
  return (
    <div className="inline-flex rounded-xl border border-[var(--border)] bg-[var(--surface2)] p-1 text-sm shadow-inner">
      <button
        type="button"
        onClick={() => onChange("grid")}
        className={`rounded-lg px-4 py-2 transition ${
          value === "grid"
            ? "bg-gradient-to-r from-teal-600 to-sky-600 text-white shadow-sm"
            : "text-[var(--muted)] hover:text-[var(--text)]"
        }`}
      >
        Grid
      </button>
      <button
        type="button"
        onClick={() => onChange("list")}
        className={`rounded-lg px-4 py-2 transition ${
          value === "list"
            ? "bg-gradient-to-r from-teal-600 to-sky-600 text-white shadow-sm"
            : "text-[var(--muted)] hover:text-[var(--text)]"
        }`}
      >
        List
      </button>
    </div>
  );
}
