import { Goal, Transaction, Wallet } from "../types";
import { monthKey } from "./formatDate";

const monthNames = ["Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho"];

export function sumByType(transactions: Transaction[], type: "income" | "expense") {
  return transactions.filter((item) => item.type === type).reduce((sum, item) => sum + item.amount, 0);
}

export function getCurrentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export function filterByMonth(transactions: Transaction[], month = getCurrentMonth()) {
  return transactions.filter((item) => monthKey(item.date) === month);
}

export function buildMonthlyComparison(transactions: Transaction[]) {
  return monthNames.map((name, index) => {
    const month = `2026-${String(index + 1).padStart(2, "0")}`;
    const scoped = filterByMonth(transactions, month);
    const receitas = sumByType(scoped, "income");
    const despesas = sumByType(scoped, "expense");
    return { month: name, receitas, despesas, saldo: receitas - despesas };
  });
}

export function totalsByCategory(transactions: Transaction[], type: "income" | "expense") {
  const map = new Map<string, number>();
  transactions.filter((item) => item.type === type).forEach((item) => map.set(item.category, (map.get(item.category) || 0) + item.amount));
  return [...map.entries()].map(([name, value]) => ({ name, value }));
}

export function getInsights(transactions: Transaction[], goals: Goal[]) {
  const current = filterByMonth(transactions);
  const income = sumByType(current, "income");
  const expense = sumByType(current, "expense");
  const previous = filterByMonth(transactions, "2026-05");
  const prevSavings = sumByType(previous, "income") - sumByType(previous, "expense");
  const savings = income - expense;
  const pending = current.filter((item) => item.status !== "pago").length;
  const category = totalsByCategory(current, "expense").sort((a, b) => b.value - a.value)[0];
  const closeGoal = goals.find((goal) => {
    const days = Math.ceil((new Date(goal.deadline).getTime() - Date.now()) / 86400000);
    return days <= 90 && goal.currentAmount < goal.targetAmount;
  });
  return [
    category ? `Voce gastou mais com ${category.name.toLowerCase()} este mes.` : "Nenhuma despesa relevante neste mes.",
    pending ? `Existem ${pending} contas pendentes ou atrasadas.` : "Todas as contas do mes estao em dia.",
    savings >= prevSavings ? "Voce economizou mais que no mes passado." : "Sua economia ficou abaixo do mes anterior.",
    closeGoal ? `A meta ${closeGoal.title} esta proxima do prazo.` : "Suas metas estao dentro de um prazo saudavel.",
  ];
}

export function reportMetrics(transactions: Transaction[]) {
  const income = sumByType(transactions, "income");
  const expense = sumByType(transactions, "expense");
  const biggestExpense = transactions.filter((item) => item.type === "expense").sort((a, b) => b.amount - a.amount)[0];
  const biggestIncome = transactions.filter((item) => item.type === "income").sort((a, b) => b.amount - a.amount)[0];
  const category = totalsByCategory(transactions, "expense").sort((a, b) => b.value - a.value)[0];
  const dayMap = new Map<string, number>();
  transactions.filter((item) => item.type === "expense").forEach((item) => dayMap.set(item.date, (dayMap.get(item.date) || 0) + item.amount));
  const biggestDay = [...dayMap.entries()].sort((a, b) => b[1] - a[1])[0];
  return {
    income,
    expense,
    balance: income - expense,
    savings: income - expense,
    biggestExpense,
    biggestIncome,
    topCategory: category?.name || "Sem despesas",
    biggestDay: biggestDay?.[0] || "-",
    averageDailyExpense: expense / 30,
    count: transactions.length,
  };
}

export function walletBalance(wallets: Wallet[], transactions: Transaction[]) {
  return wallets.map((wallet) => {
    const related = transactions.filter((item) => item.walletId === wallet.id);
    const balance = related.reduce((sum, item) => sum + (item.type === "income" ? item.amount : -item.amount), wallet.initialBalance);
    return { ...wallet, currentBalance: balance };
  });
}
