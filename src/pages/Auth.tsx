import { useEffect, useState } from "react";
import { CircleDollarSign, LogIn, UserPlus } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export function AuthPage({
  mode,
  onBack,
  onModeChange,
  onLogin,
  onRegister,
}: {
  mode: "login" | "register";
  onBack: () => void;
  onModeChange: (mode: "login" | "register") => void;
  onLogin: (email: string, password: string) => { ok: boolean; message: string };
  onRegister: (input: { name: string; email: string; password: string }) => { ok: boolean; message: string };
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(mode === "login" ? "admin" : "");
  const [password, setPassword] = useState(mode === "login" ? "admin" : "");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setName("");
    setEmail(mode === "login" ? "admin" : "");
    setPassword(mode === "login" ? "admin" : "");
    setMessage("");
  }, [mode]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const result = mode === "login" ? onLogin(email, password) : onRegister({ name, email, password });
    setMessage(result.message);
  };

  return (
    <main className="dark grid min-h-screen place-items-center bg-slate-950 p-5 text-white">
      <section className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-finance">
        <button className="mb-6 cursor-pointer text-sm font-bold text-slate-400 transition-colors hover:text-white" onClick={onBack}>Voltar para a landing</button>
        <div className="mb-7 flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-xl border border-emerald-400/30 bg-emerald-400/10 text-emerald-300"><CircleDollarSign size={25} /></span>
          <div>
            <h1 className="font-display text-2xl font-bold">{mode === "login" ? "Entrar no FinanSmart" : "Criar conta"}</h1>
            <p className="text-sm font-semibold text-slate-400">{mode === "login" ? "Use admin / admin para acessar como administrador." : "Seu workspace sera separado dos outros usuarios."}</p>
          </div>
        </div>
        <form className="grid gap-4" onSubmit={submit}>
          {mode === "register" && <Input label="Nome" value={name} onChange={(event) => setName(event.target.value)} required />}
          <Input label="Usuario ou e-mail" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <Input label="Senha" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          {message && <p className={`rounded-lg border px-3 py-2 text-sm font-bold ${message.includes("sucesso") ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200" : "border-rose-400/30 bg-rose-400/10 text-rose-200"}`}>{message}</p>}
          <Button type="submit">{mode === "login" ? <LogIn size={18} /> : <UserPlus size={18} />} {mode === "login" ? "Entrar" : "Cadastrar"}</Button>
        </form>
        <div className="mt-5 border-t border-slate-800 pt-5 text-center text-sm font-semibold text-slate-400">
          {mode === "login" ? "Ainda nao tem conta?" : "Ja tem conta?"}{" "}
          <button className="cursor-pointer font-bold text-emerald-300 hover:text-emerald-200" onClick={() => onModeChange(mode === "login" ? "register" : "login")}>
            {mode === "login" ? "Criar cadastro" : "Entrar"}
          </button>
        </div>
      </section>
    </main>
  );
}
