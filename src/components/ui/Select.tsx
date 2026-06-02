import { SelectHTMLAttributes } from "react";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
};

export function Select({ label, className = "", children, ...props }: Props) {
  return (
    <label className="grid gap-1.5 text-sm font-semibold text-slate-700 dark:text-zinc-200">
      {label}
      <select
        className={`min-h-10 cursor-pointer rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:ring-blue-950 ${className}`}
        {...props}
      >
        {children}
      </select>
    </label>
  );
}
