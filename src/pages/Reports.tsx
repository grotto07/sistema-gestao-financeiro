import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Transaction } from "../types";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { Input } from "../components/ui/Input";
import { filterByMonth, reportMetrics, totalsByCategory } from "../utils/calculations";
import { exportMonthlyReport } from "../utils/exportReport";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDate, monthLabel } from "../utils/formatDate";

export function Reports({ transactions, currentMonth }: { transactions: Transaction[]; currentMonth: string }) {
  const [month, setMonth] = useState(currentMonth);
  const scoped = useMemo(() => filterByMonth(transactions, month), [transactions, month]);
  const metrics = reportMetrics(scoped);
  const categories = totalsByCategory(scoped, "expense");
  const biggest = scoped.filter((item) => item.type === "expense").sort((a, b) => b.amount - a.amount).slice(0, 5);
  const cards = [
    ["Total de receitas", formatCurrency(metrics.income)],
    ["Total de despesas", formatCurrency(metrics.expense)],
    ["Saldo do mes", formatCurrency(metrics.balance)],
    ["Economia do mes", formatCurrency(metrics.savings)],
    ["Categoria que mais gastou", metrics.topCategory],
    ["Dia com maior gasto", metrics.biggestDay === "-" ? "-" : formatDate(metrics.biggestDay)],
    ["Transacoes", String(metrics.count)],
    ["Media de gastos por dia", formatCurrency(metrics.averageDailyExpense)],
  ];
  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div><h2 className="font-display text-2xl font-bold text-slate-950 dark:text-white">Relatorio mensal</h2><p className="text-sm font-semibold text-slate-500 dark:text-zinc-400">Resumo profissional de {monthLabel(month)}.</p></div>
        <div className="flex gap-3"><Input label="Mes e ano" type="month" value={month} onChange={(event) => setMonth(event.target.value)} /><Button className="self-end" onClick={() => exportMonthlyReport(month, scoped)}><Download size={18} /> Exportar relatorio</Button></div>
      </div>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(([label, value]) => <article key={label} className="rounded-xl border border-white/70 bg-white/82 p-5 shadow-soft dark:border-zinc-800 dark:bg-zinc-900/80"><p className="text-sm font-bold text-slate-500">{label}</p><strong className="mt-2 block font-display text-xl text-slate-950 dark:text-white">{value}</strong></article>)}
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        <article className="rounded-xl border border-white/70 bg-white/82 p-5 shadow-soft dark:border-zinc-800 dark:bg-zinc-900/80">
          <h3 className="mb-5 font-display text-lg font-bold">Gastos por categoria</h3>
          {categories.length ? <div className="h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={categories}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="name" tickLine={false} axisLine={false} /><YAxis tickLine={false} axisLine={false} /><Tooltip formatter={(value) => formatCurrency(Number(value))} /><Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></div> : <EmptyState />}
        </article>
        <article className="rounded-xl border border-white/70 bg-white/82 p-5 shadow-soft dark:border-zinc-800 dark:bg-zinc-900/80">
          <h3 className="mb-5 font-display text-lg font-bold">Maiores despesas</h3>
          <div className="grid gap-3">
            {biggest.map((item) => <div key={item.id} className="flex items-center justify-between rounded-lg bg-slate-50 p-3 text-sm font-bold dark:bg-zinc-950"><span>{item.title}</span><span className="text-rose-600">{formatCurrency(item.amount)}</span></div>)}
            {!biggest.length && <EmptyState />}
          </div>
        </article>
      </section>
    </div>
  );
}
