import { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  children: ReactNode;
};

const variants = {
  primary: "bg-blue-600 text-white shadow-soft hover:bg-blue-700 focus:ring-blue-500",
  secondary: "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800",
  danger: "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500",
  ghost: "text-slate-700 hover:bg-slate-100 dark:text-zinc-200 dark:hover:bg-zinc-800",
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
