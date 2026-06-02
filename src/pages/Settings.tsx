import { useEffect, useState } from "react";
import { RotateCcw, Save, Trash2 } from "lucide-react";
import { UserSettings } from "../types";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";

export function Settings({ settings, saveSettings, restoreSeed, clearAll }: { settings: UserSettings; saveSettings: (settings: UserSettings) => void; restoreSeed: () => void; clearAll: () => void }) {
  const [form, setForm] = useState(settings);
  useEffect(() => setForm(settings), [settings]);
  const submit = (event: React.FormEvent) => { event.preventDefault(); saveSettings(form); };
  return (
    <div className="grid gap-6">
      <div><h2 className="font-display text-2xl font-bold text-slate-950 dark:text-white">Configuracoes</h2><p className="text-sm font-semibold text-slate-500 dark:text-zinc-400">Preferencias salvas no LocalStorage.</p></div>
      <form className="grid gap-4 rounded-xl border border-white/70 bg-white/82 p-5 shadow-soft dark:border-zinc-800 dark:bg-zinc-900/80 md:grid-cols-2" onSubmit={submit}>
        <Input label="Nome do usuario" value={form.userName} onChange={(event) => setForm({ ...form, userName: event.target.value })} />
        <Select label="Moeda padrao" value={form.currency} onChange={() => setForm({ ...form, currency: "BRL" })}><option value="BRL">Real brasileiro</option></Select>
        <Select label="Tema" value={form.theme} onChange={(event) => setForm({ ...form, theme: event.target.value as UserSettings["theme"] })}><option value="light">Claro</option><option value="dark">Escuro</option></Select>
        <Select label="Preferencia de visualizacao" value={form.compactView ? "compact" : "comfortable"} onChange={(event) => setForm({ ...form, compactView: event.target.value === "compact" })}><option value="comfortable">Confortavel</option><option value="compact">Compacta</option></Select>
        <div className="md:col-span-2 flex flex-wrap justify-between gap-3 border-t border-slate-200 pt-4 dark:border-zinc-800">
          <div className="flex flex-wrap gap-3"><Button variant="secondary" type="button" onClick={restoreSeed}><RotateCcw size={18} /> Restaurar dados de exemplo</Button><Button variant="danger" type="button" onClick={clearAll}><Trash2 size={18} /> Limpar todos os dados</Button></div>
          <Button type="submit"><Save size={18} /> Salvar configuracoes</Button>
        </div>
      </form>
    </div>
  );
}
