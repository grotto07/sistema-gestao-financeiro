import { BarChart3, CheckCircle2, CircleDollarSign, LockKeyhole, PieChart, ShieldCheck, Wallet } from "lucide-react";
import { Button } from "../components/ui/Button";

export function Landing({ onLogin, onRegister }: { onLogin: () => void; onRegister: () => void }) {
  const features = [
    { icon: BarChart3, title: "Dashboard financeiro", text: "Indicadores, evolucao de saldo, receitas e despesas em uma leitura executiva." },
    { icon: ShieldCheck, title: "Multi-tenancy local", text: "Cada usuario acessa apenas seu proprio conjunto de dados no navegador." },
    { icon: PieChart, title: "Relatorios e graficos", text: "Categorias, comparativos mensais e exportacao de relatorio financeiro." },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-slate-950 text-emerald-300">
            <CircleDollarSign size={24} />
          </span>
          <div>
            <strong className="font-display text-xl">FinanSmart</strong>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Finance OS</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" className="border-slate-300 bg-white text-slate-950 hover:bg-slate-100" onClick={onLogin}>Entrar</Button>
          <Button onClick={onRegister}>Criar conta</Button>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:py-20">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-700">Controle financeiro pessoal e empresarial</p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-bold leading-tight text-slate-950 lg:text-7xl">Decisoes financeiras com clareza, rotina e seguranca.</h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-600">Organize receitas, despesas, carteiras, metas e relatorios em um painel pronto para uso real por pessoas e pequenos negocios.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={onRegister}>Comecar agora</Button>
            <Button variant="secondary" className="border-slate-300 bg-white text-slate-950 hover:bg-slate-100" onClick={onLogin}>Acessar painel</Button>
          </div>
          <div className="mt-8 grid gap-3 text-sm font-semibold text-slate-600 sm:grid-cols-3">
            {["LocalStorage por usuario", "Perfil editavel", "Admin demo incluso"].map((item) => (
              <span key={item} className="flex items-center gap-2"><CheckCircle2 className="text-emerald-600" size={18} /> {item}</span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-finance">
          <div className="rounded-xl bg-slate-950 p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">Resumo mensal</p>
                <strong className="mt-2 block text-4xl">R$ 4.250,00</strong>
              </div>
              <Wallet className="text-emerald-300" size={34} />
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4"><p className="text-sm text-emerald-200">Receitas</p><strong className="text-2xl">R$ 6.800</strong></div>
              <div className="rounded-xl border border-rose-400/20 bg-rose-400/10 p-4"><p className="text-sm text-rose-200">Despesas</p><strong className="text-2xl">R$ 2.550</strong></div>
            </div>
            <div className="mt-5 rounded-xl border border-slate-800 bg-slate-900 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-300"><LockKeyhole size={17} className="text-emerald-300" /> Dados separados por usuario</div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full w-[72%] rounded-full bg-emerald-400" /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-14 md:grid-cols-3">
        {features.map(({ icon: Icon, title, text }) => (
          <article key={title} className="rounded-xl border border-slate-200 bg-white p-5">
            <Icon className="text-emerald-700" size={26} />
            <h2 className="mt-4 font-display text-xl font-bold">{title}</h2>
            <p className="mt-2 text-sm font-medium leading-6 text-slate-600">{text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
