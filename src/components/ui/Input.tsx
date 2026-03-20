import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & { label: string };

export function Input({ label, id, className = "", ...rest }: Props) {
  const inputId = id ?? label.replace(/\s/g, "-").toLowerCase();
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="text-[var(--muted)]">{label}</span>
      <input
        id={inputId}
        className={`rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-[var(--text)] placeholder:text-[var(--muted)] focus:border-[var(--focus)] focus:outline-none focus:ring-2 focus:ring-[var(--focus)]/25 ${className}`}
        {...rest}
      />
    </label>
  );
}
