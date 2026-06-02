import { CalendarDays, Search, ShieldCheck, UserCircle } from "lucide-react";
import { UserSettings } from "../../types";

export function Header({ settings }: { settings: UserSettings }) {
  return (
    <header className="flex flex-col gap-4 border-b border-slate-800 bg-slate-950/55 px-5 py-5 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between lg:px-8">
      <div className="pl-12 lg:pl-0">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">Controle suas financas com clareza</p>
        <h1 className="mt-1 font-display text-2xl font-bold text-white">Painel financeiro, {settings.userName}</h1>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="hidden h-10 items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/70 px-3 text-xs font-bold text-slate-300 md:flex">
          <CalendarDays size={16} className="text-emerald-300" />
          Junho 2026
        </div>
        <div className="hidden h-10 items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/70 px-3 text-xs font-bold text-slate-300 md:flex">
          <ShieldCheck size={16} className="text-blue-300" />
          Supabase pronto
        </div>
        <label className="relative hidden lg:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
          <input className="h-10 w-64 rounded-lg border border-slate-800 bg-slate-900/70 pl-9 pr-3 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10" placeholder="Buscar transacoes, metas..." />
        </label>
        <div className="flex h-10 items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/70 px-3 text-sm font-bold text-slate-200">
          <UserCircle size={20} />
          Perfil
        </div>
      </div>
    </header>
  );
}
