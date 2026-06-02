import { Search, UserCircle } from "lucide-react";
import { UserSettings } from "../../types";

export function Header({ settings }: { settings: UserSettings }) {
  return (
    <header className="flex flex-col gap-4 border-b border-white/60 bg-white/55 px-5 py-5 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/40 sm:flex-row sm:items-center sm:justify-between lg:px-8">
      <div className="pl-12 lg:pl-0">
        <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">Controle suas financas com clareza, organizacao e inteligencia.</p>
        <h1 className="font-display text-2xl font-bold text-slate-950 dark:text-white">Ola, {settings.userName}</h1>
      </div>
      <div className="flex items-center gap-3">
        <label className="relative hidden sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
          <input className="h-10 w-64 rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white" placeholder="Buscar no sistema" />
        </label>
        <div className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
          <UserCircle size={20} />
          Perfil
        </div>
      </div>
    </header>
  );
}
