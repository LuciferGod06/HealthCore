import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "ghost" | "danger";
};

export function Button({
  children,
  variant = "primary",
  type = "button",
  className = "",
  ...rest
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-[var(--focus)]/35 disabled:opacity-50";
  const styles = {
    primary:
      "bg-gradient-to-r from-teal-600 to-sky-600 text-white shadow-md shadow-teal-900/15 hover:from-teal-700 hover:to-sky-700",
    ghost:
      "border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--surface2)] shadow-sm",
    danger: "bg-[var(--danger)] text-white hover:brightness-95 shadow-sm",
  };
  return (
    <button type={type} className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
