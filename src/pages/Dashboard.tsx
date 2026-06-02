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
    <motion.article className="rounded-xl border border-white/70 bg-white/82 p-5 shadow-soft backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/80" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-slate-500 dark:text-zinc-400">{title}</p>
          <strong className="mt-2 block font-display text-2xl text-slate-950 dark:text-white">{value}</strong>
          <span className="mt-2 block text-xs font-semibold text-slate-500 dark:text-zinc-400">{detail}</span>
        </div>
        <span className={`rounded-lg p-3 ${tone}`}>
          <Icon size={21} />
        </span>
      </div>
    </motion.article>
  );
}

const pieColors = ["#2563eb", "#16a34a", "#ef4444", "#8b5cf6", "#f59e0b", "#14b8a6", "#64748b"];

export function Dashboard({ transactions, goals, wallets }: { transactions: Transaction[]; goals: Goal[]; wallets: WalletType[] }) {
  const current = filterByMonth(transactions);
  const metrics = reportMetrics(current);
  const monthly = buildMonthlyComparison(transactions);
  const expenses = totalsByCategory(current, "expense");
  const incomes = totalsByCategory(current, "income");
  const alerts = getInsights(transactions, goals);

  const cards = [
    { title: "Saldo atual", value: formatCurrency(metrics.balance), detail: "Resultado do mes atual", icon: Wallet, tone: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-200" },
    { title: "Receitas do mes", value: formatCurrency(metrics.income), detail: "Entrada consolidada", icon: ArrowUpRight, tone: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200" },
    { title: "Despesas do mes", value: formatCurrency(metrics.expense), detail: "Saidas registradas", icon: ArrowDownRight, tone: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-200" },
    { title: "Economia", value: formatCurrency(metrics.savings), detail: "Comparativo com mes anterior", icon: PiggyBank, tone: "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-200" },
    { title: "Transacoes", value: String(metrics.count), detail: "Lancamentos do mes", icon: Receipt, tone: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-200" },
    { title: "Maior receita", value: formatCurrency(metrics.biggestIncome?.amount || 0), detail: metrics.biggestIncome?.title || "Sem receita", icon: Banknote, tone: "bg-cyan-50 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-200" },
  ];

  return (
    <div className="grid gap-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card, index) => <StatsCard key={card.title} {...card} index={index} />)}
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <article className="rounded-xl border border-white/70 bg-white/82 p-5 shadow-soft dark:border-zinc-800 dark:bg-zinc-900/80">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="font-display text-lg font-bold text-slate-950 dark:text-white">Receitas x despesas</h2>
            <Badge tone="blue">6 meses</Badge>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Bar dataKey="receitas" fill="#16a34a" radius={[6, 6, 0, 0]} />
                <Bar dataKey="despesas" fill="#ef4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>
        <article className="rounded-xl border border-white/70 bg-white/82 p-5 shadow-soft dark:border-zinc-800 dark:bg-zinc-900/80">
          <h2 className="mb-5 font-display text-lg font-bold text-slate-950 dark:text-white">Alertas inteligentes</h2>
          <div className="grid gap-3">
            {alerts.map((alert) => (
              <motion.div key={alert} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-zinc-700 dark:bg-zinc-950" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}>
                <AlertTriangle className="mt-0.5 text-blue-600" size={18} />
                <p className="text-sm font-semibold text-slate-700 dark:text-zinc-300">{alert}</p>
              </motion.div>
            ))}
          </div>
        </article>
      </section>
      <section className="grid gap-6 xl:grid-cols-3">
        <article className="rounded-xl border border-white/70 bg-white/82 p-5 shadow-soft dark:border-zinc-800 dark:bg-zinc-900/80 xl:col-span-2">
          <h2 className="mb-5 font-display text-lg font-bold text-slate-950 dark:text-white">Evolucao do saldo</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Line type="monotone" dataKey="saldo" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </article>
        <article className="rounded-xl border border-white/70 bg-white/82 p-5 shadow-soft dark:border-zinc-800 dark:bg-zinc-900/80">
          <h2 className="mb-5 font-display text-lg font-bold text-slate-950 dark:text-white">Despesas por categoria</h2>
          {expenses.length ? (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={expenses} dataKey="value" innerRadius={62} outerRadius={96} paddingAngle={3}>
                    {expenses.map((_, index) => <Cell key={index} fill={pieColors[index % pieColors.length]} />)}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : <EmptyState />}
        </article>
      </section>
      <section className="grid gap-6 xl:grid-cols-2">
        <article className="rounded-xl border border-white/70 bg-white/82 p-5 shadow-soft dark:border-zinc-800 dark:bg-zinc-900/80">
          <h2 className="mb-5 font-display text-lg font-bold text-slate-950 dark:text-white">Receitas por categoria</h2>
          <div className="grid gap-3">
            {incomes.map((item) => <div key={item.name} className="flex items-center justify-between rounded-lg bg-slate-50 p-3 text-sm font-bold dark:bg-zinc-950"><span>{item.name}</span><span className="text-emerald-600">{formatCurrency(item.value)}</span></div>)}
          </div>
        </article>
        <article className="rounded-xl border border-white/70 bg-white/82 p-5 shadow-soft dark:border-zinc-800 dark:bg-zinc-900/80">
          <h2 className="mb-5 font-display text-lg font-bold text-slate-950 dark:text-white">Carteiras</h2>
          <div className="grid gap-3">
            {wallets.map((wallet) => <div key={wallet.id} className="flex items-center justify-between rounded-lg bg-slate-50 p-3 text-sm font-bold dark:bg-zinc-950"><span>{wallet.name}</span><span>{formatCurrency(wallet.currentBalance)}</span></div>)}
          </div>
        </article>
      </section>
    </div>
  );
}
