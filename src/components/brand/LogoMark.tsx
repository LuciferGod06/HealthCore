export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-sky-500 text-lg font-bold text-white shadow-md shadow-teal-900/20 ${className}`}
    >
      H
    </div>
  );
}
