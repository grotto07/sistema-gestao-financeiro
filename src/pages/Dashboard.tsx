import { motion } from "framer-motion";
import { AlertTriangle, ArrowDownRight, ArrowUpRight, Banknote, PiggyBank, Receipt, TrendingUp, Wallet } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Goal, Transaction, Wallet as WalletType } from "../types";
import { buildMonthlyComparison, filterByMonth, getInsights, reportMetrics, totalsByCategory } from "../utils/calculations";
import { formatCurrency } from "../utils/formatCurrency";
import { Badge } from "../components/ui/Badge";
import { EmptyState } from "../components/ui/EmptyState";

function StatsCard({ title, value, detail, icon: Icon, tone, index }: { title: string; value: string; detail: string; icon: typeof Wallet; tone: string; index: number }) {
  return (
    <motion.article className="finance-panel group rounded-xl p-4 transition-colors hover:border-slate-600" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{title}</p>
          <strong className="mt-3 block font-display text-2xl font-bold text-white">{value}</strong>
          <span className="mt-2 block text-xs font-semibold text-slate-400">{detail}</span>
        </div>
        <span className={`rounded-lg border p-3 ${tone}`}>
          <Icon size={21} />
        </span>
      </div>
    </motion.article>
  );
}

const pieColors = ["#22c55e", "#38bdf8", "#f43f5e", "#a78bfa", "#f59e0b", "#14b8a6", "#94a3b8"];
const chartGrid = "rgba(148, 163, 184, 0.14)";
const chartText = "#94a3b8";

export function Dashboard({ transactions, goals, wallets }: { transactions: Transaction[]; goals: Goal[]; wallets: WalletType[] }) {
  const current = filterByMonth(transactions);
  const metrics = reportMetrics(current);
  const monthly = buildMonthlyComparison(transactions);
  const expenses = totalsByCategory(current, "expense");
  const incomes = totalsByCategory(current, "income");
  const alerts = getInsights(transactions, goals);
  const savingsRate = metrics.income ? Math.max(0, Math.round((metrics.savings / metrics.income) * 100)) : 0;
  const biggestExpense = metrics.biggestExpense?.amount || 0;

  const cards = [
    { title: "Receitas", value: formatCurrency(metrics.income), detail: "Entrada consolidada", icon: ArrowUpRight, tone: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300" },
    { title: "Despesas", value: formatCurrency(metrics.expense), detail: "Saidas registradas", icon: ArrowDownRight, tone: "border-rose-400/20 bg-rose-400/10 text-rose-300" },
    { title: "Economia", value: formatCurrency(metrics.savings), detail: `${savingsRate}% das receitas`, icon: PiggyBank, tone: "border-blue-400/20 bg-blue-400/10 text-blue-300" },
    { title: "Transacoes", value: String(metrics.count), detail: "Lancamentos do mes", icon: Receipt, tone: "border-amber-400/20 bg-amber-400/10 text-amber-300" },
    { title: "Maior despesa", value: formatCurrency(biggestExpense), detail: metrics.biggestExpense?.title || "Sem despesa", icon: TrendingUp, tone: "border-violet-400/20 bg-violet-400/10 text-violet-300" },
    { title: "Maior receita", value: formatCurrency(metrics.biggestIncome?.amount || 0), detail: metrics.biggestIncome?.title || "Sem receita", icon: Banknote, tone: "border-cyan-400/20 bg-cyan-400/10 text-cyan-300" },
  ];

  return (
    <div className="grid gap-6">
      <section className="grid gap-6 xl:grid-cols-[1.3fr_.7fr]">
        <motion.article className="finance-panel metric-grid overflow-hidden rounded-2xl p-6" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">Resumo executivo</p>
              <h2 className="mt-3 font-display text-4xl font-bold text-white md:text-5xl">{formatCurrency(metrics.balance)}</h2>
              <p className="mt-3 max-w-xl text-sm font-semibold leading-6 text-slate-400">Saldo atual calculado com receitas, despesas e lancamentos do mes. O objetivo aqui e leitura rapida para decisao, nao decoracao.</p>
            </div>
            <div className="grid min-w-56 gap-3">
              <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                <p className="text-xs font-bold text-emerald-200">Taxa de economia</p>
                <strong className="mt-1 block text-3xl text-white">{savingsRate}%</strong>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-950/55 p-4">
                <p className="text-xs font-bold text-slate-500">Comparativo</p>
                <strong className="mt-1 block text-sm text-slate-200">Performance mensal positiva</strong>
              </div>
            </div>
          </div>
        </motion.article>
        <article className="finance-panel rounded-2xl p-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Status operacional</p>
          <div className="mt-5 grid gap-4">
            <div className="flex items-center justify-between"><span className="text-sm font-semibold text-slate-400">Banco Supabase</span><Badge tone="green">Pronto</Badge></div>
            <div className="flex items-center justify-between"><span className="text-sm font-semibold text-slate-400">Persistencia local</span><Badge tone="blue">Ativa</Badge></div>
            <div className="flex items-center justify-between"><span className="text-sm font-semibold text-slate-400">Relatorios</span><Badge tone="purple">Exportavel</Badge></div>
          </div>
        </article>
      </section>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card, index) => <StatsCard key={card.title} {...card} index={index} />)}
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <article className="finance-panel rounded-xl p-5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-lg font-bold text-white">Receitas x despesas</h2>
              <p className="text-xs font-semibold text-slate-500">Comparativo por mes</p>
            </div>
            <Badge tone="green">6 meses</Badge>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthly}>
                <CartesianGrid stroke={chartGrid} strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: chartText, fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: chartText, fontSize: 12 }} />
                <Tooltip cursor={{ fill: "rgba(148,163,184,.08)" }} contentStyle={{ background: "#020617", border: "1px solid #334155", borderRadius: 10, color: "#e5e7eb" }} formatter={(value) => formatCurrency(Number(value))} />
                <Bar dataKey="receitas" fill="#22c55e" radius={[6, 6, 0, 0]} />
                <Bar dataKey="despesas" fill="#f43f5e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>
        <article className="finance-panel rounded-xl p-5">
          <h2 className="mb-5 font-display text-lg font-bold text-white">Alertas inteligentes</h2>
          <div className="grid gap-3">
            {alerts.map((alert) => (
              <motion.div key={alert} className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-950/55 p-3" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}>
                <AlertTriangle className="mt-0.5 text-emerald-300" size={18} />
                <p className="text-sm font-semibold text-slate-300">{alert}</p>
              </motion.div>
            ))}
          </div>
        </article>
      </section>
      <section className="grid gap-6 xl:grid-cols-3">
        <article className="finance-panel rounded-xl p-5 xl:col-span-2">
          <h2 className="mb-5 font-display text-lg font-bold text-white">Evolucao do saldo</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthly}>
                <CartesianGrid stroke={chartGrid} strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: chartText, fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: chartText, fontSize: 12 }} />
                <Tooltip contentStyle={{ background: "#020617", border: "1px solid #334155", borderRadius: 10, color: "#e5e7eb" }} formatter={(value) => formatCurrency(Number(value))} />
                <Line type="monotone" dataKey="saldo" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4, fill: "#020617", stroke: "#38bdf8", strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </article>
        <article className="finance-panel rounded-xl p-5">
          <h2 className="mb-5 font-display text-lg font-bold text-white">Despesas por categoria</h2>
          {expenses.length ? (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={expenses} dataKey="value" innerRadius={62} outerRadius={96} paddingAngle={3}>
                    {expenses.map((_, index) => <Cell key={index} fill={pieColors[index % pieColors.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#020617", border: "1px solid #334155", borderRadius: 10, color: "#e5e7eb" }} formatter={(value) => formatCurrency(Number(value))} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : <EmptyState />}
        </article>
      </section>
      <section className="grid gap-6 xl:grid-cols-2">
        <article className="finance-panel rounded-xl p-5">
          <h2 className="mb-5 font-display text-lg font-bold text-white">Receitas por categoria</h2>
          <div className="grid gap-3">
            {incomes.map((item) => <div key={item.name} className="finance-surface flex items-center justify-between rounded-lg p-3 text-sm font-bold"><span className="text-slate-300">{item.name}</span><span className="text-emerald-300">{formatCurrency(item.value)}</span></div>)}
          </div>
        </article>
        <article className="finance-panel rounded-xl p-5">
          <h2 className="mb-5 font-display text-lg font-bold text-white">Carteiras</h2>
          <div className="grid gap-3">
            {wallets.map((wallet) => <div key={wallet.id} className="finance-surface flex items-center justify-between rounded-lg p-3 text-sm font-bold"><span className="text-slate-300">{wallet.name}</span><span className="text-white">{formatCurrency(wallet.currentBalance)}</span></div>)}
          </div>
        </article>
      </section>
    </div>
  );
}
