import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  CircleDollarSign,
  Layers3,
  LockKeyhole,
  PieChart,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Button } from "../components/ui/Button";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

export function Landing({ onLogin, onRegister }: { onLogin: () => void; onRegister: () => void }) {
  const features = [
    { icon: BarChart3, title: "Dashboard financeiro", text: "Indicadores, evolucao de saldo, receitas e despesas em uma leitura executiva." },
    { icon: ShieldCheck, title: "Workspaces isolados", text: "Cada usuario trabalha em um ambiente proprio, sem misturar dados de outro perfil." },
    { icon: PieChart, title: "Relatorios visuais", text: "Categorias, comparativos mensais, metas e exportacao para tomada de decisao." },
  ];

  const stats = [
    { label: "Economia no mes", value: "62%" },
    { label: "Contas mapeadas", value: "4" },
    { label: "Alertas ativos", value: "5" },
  ];

  const bars = [54, 78, 42, 88, 64, 96, 72];

  return (
    <main className="min-h-screen overflow-hidden bg-[#eef7f2] text-slate-950">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-sky-300/30 blur-3xl" />
        <div className="absolute bottom-20 left-1/2 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />
      </div>

      <motion.header
        className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5"
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-slate-950 text-emerald-300 shadow-finance">
            <CircleDollarSign size={24} />
          </span>
          <div>
            <strong className="font-display text-xl">FinanSmart</strong>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Finance OS</p>
          </div>
        </div>
        <div className="hidden items-center gap-7 text-sm font-bold text-slate-600 md:flex">
          <a href="#recursos" className="transition-colors hover:text-slate-950">Recursos</a>
          <a href="#seguranca" className="transition-colors hover:text-slate-950">Seguranca</a>
          <a href="#demo" className="transition-colors hover:text-slate-950">Demo</a>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" className="border-slate-300 bg-white text-slate-950 hover:bg-slate-100" onClick={onLogin}>Entrar</Button>
          <Button onClick={onRegister}>Criar conta</Button>
        </div>
      </motion.header>

      <section className="relative z-10 mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-10 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:pb-24 lg:pt-16">
        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.55 }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-800 shadow-sm backdrop-blur">
            <Sparkles size={15} />
            Plataforma financeira para rotina real
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[1.02] text-slate-950 md:text-6xl lg:text-7xl">
            Controle financeiro com cara de produto, nao de planilha.
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-600">
            Organize receitas, despesas, carteiras, metas e relatorios em um painel elegante, responsivo e preparado para separar os dados de cada usuario.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button className="min-h-12 px-5" onClick={onRegister}>
              Comecar agora <ArrowRight size={18} />
            </Button>
            <Button variant="secondary" className="min-h-12 border-slate-300 bg-white px-5 text-slate-950 hover:bg-slate-100" onClick={onLogin}>
              Acessar demo admin
            </Button>
          </div>
          <div className="mt-8 grid gap-3 text-sm font-semibold text-slate-600 sm:grid-cols-3">
            {["admin / admin", "Perfil editavel", "Dados por usuario"].map((item) => (
              <span key={item} className="flex items-center gap-2 rounded-lg bg-white/70 px-3 py-2 shadow-sm">
                <CheckCircle2 className="text-emerald-600" size={18} /> {item}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          id="demo"
          className="relative"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12 }}
        >
          <motion.div
            className="absolute -right-5 -top-7 z-20 rounded-2xl border border-white/80 bg-white/90 p-4 shadow-finance backdrop-blur"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-700"><TrendingUp size={20} /></span>
              <div>
                <p className="text-xs font-bold text-slate-500">Economia subiu</p>
                <strong className="text-lg">+20%</strong>
              </div>
            </div>
          </motion.div>

          <div className="rounded-[1.6rem] border border-white/70 bg-white/75 p-3 shadow-finance backdrop-blur-xl">
            <div className="overflow-hidden rounded-[1.2rem] bg-slate-950 text-white">
              <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <div className="rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-slate-400">Junho 2026</div>
              </div>
              <div className="grid gap-4 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">Saldo atual</p>
                    <motion.strong className="mt-2 block text-4xl font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                      R$ 4.250,00
                    </motion.strong>
                  </div>
                  <span className="grid h-12 w-12 place-items-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                    <Wallet size={25} />
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="rounded-xl border border-slate-800 bg-slate-900/80 p-4"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.08 }}
                    >
                      <p className="text-xs font-bold text-slate-500">{stat.label}</p>
                      <strong className="mt-1 block text-2xl">{stat.value}</strong>
                    </motion.div>
                  ))}
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-bold text-slate-300">Receitas x despesas</p>
                    <span className="text-xs font-bold text-emerald-300">Ao vivo</span>
                  </div>
                  <div className="flex h-36 items-end gap-3">
                    {bars.map((height, index) => (
                      <div key={index} className="flex flex-1 items-end gap-1">
                        <motion.span
                          className="w-full rounded-t bg-emerald-400"
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ duration: 0.8, delay: 0.28 + index * 0.06, ease: "easeOut" }}
                        />
                        <motion.span
                          className="w-full rounded-t bg-rose-400"
                          initial={{ height: 0 }}
                          animate={{ height: `${Math.max(28, 100 - height)}%` }}
                          transition={{ duration: 0.8, delay: 0.34 + index * 0.06, ease: "easeOut" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                    <p className="text-sm text-emerald-200">Receitas</p>
                    <strong className="text-2xl">R$ 6.800</strong>
                  </div>
                  <div className="rounded-xl border border-rose-400/20 bg-rose-400/10 p-4">
                    <p className="text-sm text-rose-200">Despesas</p>
                    <strong className="text-2xl">R$ 2.550</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="recursos" className="relative z-10 mx-auto grid max-w-7xl gap-4 px-5 pb-16 md:grid-cols-3">
        {features.map(({ icon: Icon, title, text }, index) => (
          <motion.article
            key={title}
            className="group rounded-2xl border border-white/70 bg-white/80 p-6 shadow-sm backdrop-blur transition-colors hover:border-emerald-200 hover:bg-white"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
          >
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-slate-950 text-emerald-300 transition-transform duration-200 group-hover:-translate-y-1">
              <Icon size={24} />
            </span>
            <h2 className="mt-5 font-display text-xl font-bold">{title}</h2>
            <p className="mt-2 text-sm font-medium leading-6 text-slate-600">{text}</p>
          </motion.article>
        ))}
      </section>

      <section id="seguranca" className="relative z-10 mx-auto max-w-7xl px-5 pb-16">
        <motion.div
          className="grid gap-6 rounded-3xl bg-slate-950 p-6 text-white shadow-finance md:grid-cols-[.9fr_1.1fr] md:p-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Multi-tenancy</p>
            <h2 className="mt-3 font-display text-3xl font-bold">Cada usuario no seu proprio workspace.</h2>
            <p className="mt-3 text-sm font-medium leading-7 text-slate-400">A separacao local por tenant impede que os dados de um cadastro aparecam no painel de outro usuario no mesmo navegador.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { icon: LockKeyhole, title: "Sessao individual", text: "Login e cadastro controlam qual workspace sera carregado." },
              { icon: Layers3, title: "Dados segmentados", text: "Transacoes, metas e carteiras ficam vinculadas ao tenant." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5">
                <Icon className="text-emerald-300" size={25} />
                <h3 className="mt-4 font-display text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-20">
        <motion.div
          className="rounded-3xl border border-emerald-200 bg-white p-8 text-center shadow-finance"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">Pronto para testar</p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-4xl font-bold">Entre com admin/admin ou crie seu proprio workspace.</h2>
          <div className="mt-7 flex justify-center gap-3">
            <Button onClick={onRegister}>Criar conta</Button>
            <Button variant="secondary" className="border-slate-300 bg-white text-slate-950 hover:bg-slate-100" onClick={onLogin}>Entrar</Button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
