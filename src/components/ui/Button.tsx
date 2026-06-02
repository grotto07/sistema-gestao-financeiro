import { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  children: ReactNode;
};

const variants = {
  primary: "bg-emerald-400 text-slate-950 shadow-soft hover:bg-emerald-300 focus:ring-emerald-400",
  secondary: "border border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-800",
  danger: "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500",
  ghost: "text-slate-300 hover:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-800",
};

export function Button({ variant = "primary", className = "", children, ...props }: Props) {
  return (
    <button
      className={`inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
