import { ReactNode } from "react";

export function Badge({ children, tone = "slate" }: { children: ReactNode; tone?: "green" | "red" | "blue" | "yellow" | "slate" | "purple" }) {
  const tones = {
    green: "bg-emerald-400/10 text-emerald-300 border-emerald-400/25",
    red: "bg-rose-400/10 text-rose-300 border-rose-400/25",
    blue: "bg-sky-400/10 text-sky-300 border-sky-400/25",
    yellow: "bg-amber-400/10 text-amber-300 border-amber-400/25",
    slate: "bg-slate-800 text-slate-300 border-slate-700",
    purple: "bg-violet-400/10 text-violet-300 border-violet-400/25",
  };
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-bold ${tones[tone]}`}>{children}</span>;
}
