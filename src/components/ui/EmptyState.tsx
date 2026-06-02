import { Inbox } from "lucide-react";

export function EmptyState({ title = "Nenhum registro encontrado", description = "Ajuste os filtros ou cadastre um novo item." }) {
  return (
    <div className="grid place-items-center rounded-xl border border-dashed border-slate-300 bg-white/70 p-10 text-center dark:border-zinc-700 dark:bg-zinc-900/70">
      <Inbox className="mb-3 text-slate-400" size={36} />
      <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-600 dark:text-zinc-400">{description}</p>
    </div>
  );
}
