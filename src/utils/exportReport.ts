import { Transaction } from "../types";
import { formatCurrency } from "./formatCurrency";
import { reportMetrics } from "./calculations";

export function exportMonthlyReport(month: string, transactions: Transaction[]) {
  const metrics = reportMetrics(transactions);
  const payload = {
    projeto: "FinanSmart",
    periodo: month,
    resumo: {
      receitas: formatCurrency(metrics.income),
      despesas: formatCurrency(metrics.expense),
      saldo: formatCurrency(metrics.balance),
      categoriaComMaiorGasto: metrics.topCategory,
      quantidadeDeTransacoes: metrics.count,
    },
    transacoes: transactions,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `finansmart-relatorio-${month}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}
