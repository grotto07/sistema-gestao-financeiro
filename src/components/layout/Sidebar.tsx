import { BarChart3, Flag, FolderKanban, LayoutDashboard, Menu, Settings, Tags, Wallet, X } from "lucide-react";
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
      <Button variant="secondary" className="fixed left-4 top-4 z-40 h-11 w-11 p-0 lg:hidden" onClick={onToggle} aria-label="Abrir menu">
        <Menu size={20} />
      </Button>
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-white/60 bg-white/85 p-5 shadow-soft backdrop-blur-xl transition-transform duration-200 dark:border-zinc-800 dark:bg-zinc-950/86 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <strong className="font-display text-2xl text-slate-950 dark:text-white">FinanSmart</strong>
            <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-zinc-400">Controle financeiro inteligente</p>
          </div>
          <Button variant="ghost" className="h-10 w-10 p-0 lg:hidden" onClick={onToggle} aria-label="Fechar menu">
            <X size={18} />
          </Button>
        </div>
        <nav className="grid gap-2">
          {items.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => onNavigate(key)}
              className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-3 text-left text-sm font-bold transition-colors ${active === key ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"}`}
            >
              <Icon size={19} />
              {label}
            </button>
          ))}
        </nav>
      </aside>
      {open && <button aria-label="Fechar menu lateral" className="fixed inset-0 z-30 cursor-pointer bg-slate-950/30 lg:hidden" onClick={onToggle} />}
    </>
  );
}
