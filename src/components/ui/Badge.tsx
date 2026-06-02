import { ReactNode } from "react";

export function Badge({ children, tone = "slate" }: { children: ReactNode; tone?: "green" | "red" | "blue" | "yellow" | "slate" | "purple" }) {
  const tones = {
    green: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800",
    red: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-800",
    blue: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-800",
    yellow: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800",
    slate: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700",
    purple: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950 dark:text-violet-200 dark:border-violet-800",
  };
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-bold ${tones[tone]}`}>{children}</span>;
}
