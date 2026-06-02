import { BarChart3, CircleDollarSign, Flag, FolderKanban, LayoutDashboard, Menu, Settings, Tags, Wallet, X } from "lucide-react";
import { PageKey } from "../../types";
import { Button } from "../ui/Button";

const items: { key: PageKey; label: string; icon: typeof LayoutDashboard }[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "transactions", label: "Transacoes", icon: BarChart3 },
  { key: "categories", label: "Categorias", icon: Tags },
  { key: "reports", label: "Relatorios", icon: FolderKanban },
  { key: "goals", label: "Metas", icon: Flag },
  { key: "wallets", label: "Carteiras", icon: Wallet },
  { key: "settings", label: "Configuracoes", icon: Settings },
];

export function Sidebar({ active, open, onToggle, onNavigate }: { active: PageKey; open: boolean; onToggle: () => void; onNavigate: (page: PageKey) => void }) {
  return (
    <>
      <Button variant="secondary" className="fixed left-4 top-4 z-40 h-11 w-11 border-slate-700 bg-slate-950 p-0 text-white lg:hidden" onClick={onToggle} aria-label="Abrir menu">
        <Menu size={20} />
      </Button>
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-800 bg-slate-950/96 p-5 shadow-finance backdrop-blur-xl transition-transform duration-200 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
              <CircleDollarSign size={23} />
            </span>
            <div>
              <strong className="font-display text-xl font-bold tracking-wide text-white">FinanSmart</strong>
              <p className="mt-0.5 text-xs font-semibold text-slate-500">Finance OS</p>
            </div>
          </div>
          <Button variant="ghost" className="h-10 w-10 p-0 text-slate-300 lg:hidden" onClick={onToggle} aria-label="Fechar menu">
            <X size={18} />
          </Button>
        </div>
        <div className="mb-6 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Workspace</p>
          <p className="mt-2 text-sm font-bold text-slate-100">Pessoal + Empresa</p>
          <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,.9)]" />
            Dados sincronizaveis
          </div>
        </div>
        <nav className="grid gap-2">
          {items.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => onNavigate(key)}
              className={`group flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-3 text-left text-sm font-bold transition-colors ${active === key ? "bg-emerald-400 text-slate-950 shadow-[0_12px_36px_rgba(34,197,94,.18)]" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`}
            >
              <Icon size={19} />
              {label}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Saude financeira</p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full w-[72%] rounded-full bg-emerald-400" />
          </div>
          <p className="mt-2 text-xs font-semibold text-slate-400">72% de estabilidade este mes</p>
        </div>
      </aside>
      {open && <button aria-label="Fechar menu lateral" className="fixed inset-0 z-30 cursor-pointer bg-slate-950/30 lg:hidden" onClick={onToggle} />}
    </>
  );
}
