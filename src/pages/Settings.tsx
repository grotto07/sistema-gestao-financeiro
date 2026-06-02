import { useEffect, useState } from "react";
import { RotateCcw, Save, ShieldCheck, Trash2 } from "lucide-react";
import { AuthUser, UserSettings } from "../types";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Badge } from "../components/ui/Badge";

export function Settings({
  settings,
  user,
  updateProfile,
  saveSettings,
  restoreSeed,
  clearAll,
}: {
  settings: UserSettings;
  user: AuthUser;
  updateProfile: (input: { name: string; email: string; password?: string }) => { ok: boolean; message: string };
  saveSettings: (settings: UserSettings) => void;
  restoreSeed: () => void;
  clearAll: () => void;
}) {
  const [form, setForm] = useState(settings);
  const [profile, setProfile] = useState({ name: user.name, email: user.email, password: "" });
  const [message, setMessage] = useState("");
  useEffect(() => setForm(settings), [settings]);
  useEffect(() => setProfile({ name: user.name, email: user.email, password: "" }), [user.id, user.name, user.email]);
  const submitSettings = (event: React.FormEvent) => { event.preventDefault(); saveSettings(form); };
  const submitProfile = (event: React.FormEvent) => {
    event.preventDefault();
    const result = updateProfile(profile);
    setMessage(result.message);
    if (result.ok) {
      saveSettings({ ...form, userName: profile.name });
      setProfile((current) => ({ ...current, password: "" }));
    }
  };

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-white">Perfil e configuracoes</h2>
        <p className="text-sm font-semibold text-slate-400">Dados do usuario, preferencias e administracao do workspace.</p>
      </div>

      <section className="grid gap-6 xl:grid-cols-[.9fr_1.1fr]">
        <form className="finance-panel grid gap-4 rounded-xl p-5 md:grid-cols-2" onSubmit={submitProfile}>
          <div className="md:col-span-2 flex items-center justify-between gap-3">
            <div>
              <h3 className="font-display text-xl font-bold text-white">Dados do perfil</h3>
              <p className="text-sm font-semibold text-slate-400">Essas informacoes aparecem no header e na sessao atual.</p>
            </div>
            <Badge tone={user.role === "admin" ? "purple" : "blue"}>{user.role === "admin" ? "Admin" : "Usuario"}</Badge>
          </div>
          <Input label="Nome" value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} required />
          <Input label="Usuario ou e-mail" value={profile.email} onChange={(event) => setProfile({ ...profile, email: event.target.value })} required />
          <Input label="Nova senha" type="password" value={profile.password} onChange={(event) => setProfile({ ...profile, password: event.target.value })} placeholder="Deixe em branco para manter" />
          <div className="flex items-end">
            <div className="rounded-lg border border-slate-800 bg-slate-950/55 px-3 py-2 text-sm font-bold text-slate-300">
              <ShieldCheck className="mr-2 inline text-emerald-300" size={17} />
              Tenant: {user.id}
            </div>
          </div>
          {message && <p className={`md:col-span-2 rounded-lg border px-3 py-2 text-sm font-bold ${message.includes("sucesso") ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200" : "border-rose-400/30 bg-rose-400/10 text-rose-200"}`}>{message}</p>}
          <div className="md:col-span-2 flex justify-end"><Button type="submit"><Save size={18} /> Salvar perfil</Button></div>
        </form>

        <form className="finance-panel grid gap-4 rounded-xl p-5 md:grid-cols-2" onSubmit={submitSettings}>
          <div className="md:col-span-2">
            <h3 className="font-display text-xl font-bold text-white">Preferencias do sistema</h3>
            <p className="text-sm font-semibold text-slate-400">Salvas no workspace privado deste usuario.</p>
          </div>
          <Input label="Nome exibido no painel" value={form.userName} onChange={(event) => setForm({ ...form, userName: event.target.value })} />
          <Select label="Moeda padrao" value={form.currency} onChange={() => setForm({ ...form, currency: "BRL" })}><option value="BRL">Real brasileiro</option></Select>
          <Select label="Tema" value={form.theme} onChange={(event) => setForm({ ...form, theme: event.target.value as UserSettings["theme"] })}><option value="light">Claro</option><option value="dark">Escuro</option></Select>
          <Select label="Preferencia de visualizacao" value={form.compactView ? "compact" : "comfortable"} onChange={(event) => setForm({ ...form, compactView: event.target.value === "compact" })}><option value="comfortable">Confortavel</option><option value="compact">Compacta</option></Select>
          <div className="md:col-span-2 flex flex-wrap justify-between gap-3 border-t border-slate-800 pt-4">
            <div className="flex flex-wrap gap-3"><Button variant="secondary" type="button" onClick={restoreSeed}><RotateCcw size={18} /> Restaurar dados de exemplo</Button><Button variant="danger" type="button" onClick={clearAll}><Trash2 size={18} /> Limpar todos os dados</Button></div>
            <Button type="submit"><Save size={18} /> Salvar configuracoes</Button>
          </div>
        </form>
      </section>
    </div>
  );
}
