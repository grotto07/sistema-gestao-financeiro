import { Category, FinanceData, Goal, Transaction, Wallet } from "../types";

const now = new Date().toISOString();

export const seedCategories: Category[] = [
  { id: "cat-food", name: "Alimentacao", type: "expense", color: "#ef4444", icon: "utensils" },
  { id: "cat-transport", name: "Transporte", type: "expense", color: "#f97316", icon: "car" },
  { id: "cat-home", name: "Moradia", type: "expense", color: "#8b5cf6", icon: "home" },
  { id: "cat-education", name: "Educacao", type: "expense", color: "#2563eb", icon: "book" },
  { id: "cat-leisure", name: "Lazer", type: "expense", color: "#ec4899", icon: "sparkles" },
  { id: "cat-health", name: "Saude", type: "expense", color: "#14b8a6", icon: "heart" },
  { id: "cat-subscriptions", name: "Assinaturas", type: "expense", color: "#64748b", icon: "repeat" },
  { id: "cat-shopping", name: "Compras", type: "expense", color: "#a855f7", icon: "shopping" },
  { id: "cat-other-expense", name: "Outros", type: "expense", color: "#71717a", icon: "wallet" },
  { id: "cat-salary", name: "Salario", type: "income", color: "#16a34a", icon: "briefcase" },
  { id: "cat-freelance", name: "Freelance", type: "income", color: "#0ea5e9", icon: "laptop" },
  { id: "cat-sales", name: "Vendas", type: "income", color: "#22c55e", icon: "store" },
  { id: "cat-investments", name: "Investimentos", type: "income", color: "#6366f1", icon: "trending" },
  { id: "cat-refund", name: "Reembolso", type: "income", color: "#06b6d4", icon: "receipt" },
  { id: "cat-other-income", name: "Outros", type: "income", color: "#10b981", icon: "plus" },
];

export const seedWallets: Wallet[] = [
  { id: "wallet-nubank", name: "Nubank", type: "digital_wallet", initialBalance: 2300, currentBalance: 2300, createdAt: now },
  { id: "wallet-cash", name: "Carteira fisica", type: "cash", initialBalance: 250, currentBalance: 250, createdAt: now },
  { id: "wallet-savings", name: "Poupanca", type: "investment", initialBalance: 1700, currentBalance: 1700, createdAt: now },
  { id: "wallet-card", name: "Cartao empresarial", type: "credit_card", initialBalance: 0, currentBalance: -420, createdAt: now },
];

export const seedTransactions: Transaction[] = [
  { id: "tr-salary", type: "income", title: "Salario", description: "Pagamento mensal", amount: 3500, category: "Salario", walletId: "wallet-nubank", paymentMethod: "Transferencia bancaria", date: "2026-06-01", isRecurring: true, recurrenceFrequency: "mensal", status: "pago", createdAt: now },
  { id: "tr-freelance", type: "income", title: "Freelance Landing Page", amount: 850, category: "Freelance", walletId: "wallet-nubank", paymentMethod: "Pix", date: "2026-06-05", isRecurring: false, status: "pago", createdAt: now },
  { id: "tr-digital", type: "income", title: "Venda de produto digital", amount: 300, category: "Vendas", walletId: "wallet-nubank", paymentMethod: "Pix", date: "2026-06-10", isRecurring: false, status: "pago", createdAt: now },
  { id: "tr-market", type: "expense", title: "Supermercado", amount: 420, category: "Alimentacao", walletId: "wallet-nubank", paymentMethod: "Cartao de debito", date: "2026-06-03", isRecurring: false, status: "pago", createdAt: now },
  { id: "tr-internet", type: "expense", title: "Internet", amount: 120, category: "Assinaturas", walletId: "wallet-nubank", paymentMethod: "Boleto", date: "2026-06-08", isRecurring: true, recurrenceFrequency: "mensal", status: "pendente", createdAt: now },
  { id: "tr-energy", type: "expense", title: "Energia", amount: 230, category: "Moradia", walletId: "wallet-nubank", paymentMethod: "Boleto", date: "2026-06-12", isRecurring: true, recurrenceFrequency: "mensal", status: "pendente", createdAt: now },
  { id: "tr-fuel", type: "expense", title: "Combustivel", amount: 180, category: "Transporte", walletId: "wallet-cash", paymentMethod: "Dinheiro", date: "2026-06-15", isRecurring: false, status: "pago", createdAt: now },
  { id: "tr-netflix", type: "expense", title: "Netflix", amount: 39.9, category: "Assinaturas", walletId: "wallet-card", paymentMethod: "Cartao de credito", date: "2026-06-18", isRecurring: true, recurrenceFrequency: "mensal", status: "pago", createdAt: now },
  { id: "tr-course", type: "expense", title: "Curso online", amount: 97, category: "Educacao", walletId: "wallet-card", paymentMethod: "Cartao de credito", date: "2026-06-20", isRecurring: false, status: "pago", createdAt: now },
  { id: "tr-april-profit", type: "income", title: "Consultoria abril", amount: 1200, category: "Freelance", walletId: "wallet-nubank", paymentMethod: "Pix", date: "2026-04-15", isRecurring: false, status: "pago", createdAt: now },
  { id: "tr-may-profit", type: "income", title: "Projeto maio", amount: 1750, category: "Freelance", walletId: "wallet-nubank", paymentMethod: "Pix", date: "2026-05-11", isRecurring: false, status: "pago", createdAt: now },
  { id: "tr-may-rent", type: "expense", title: "Aluguel maio", amount: 1100, category: "Moradia", walletId: "wallet-nubank", paymentMethod: "Transferencia bancaria", date: "2026-05-06", isRecurring: true, recurrenceFrequency: "mensal", status: "pago", createdAt: now },
];

export const seedGoals: Goal[] = [
  { id: "goal-emergency", title: "Reserva de emergencia", targetAmount: 5000, currentAmount: 2500, deadline: "2026-12-30", category: "Seguranca", createdAt: now },
  { id: "goal-notebook", title: "Comprar notebook", targetAmount: 3500, currentAmount: 1350, deadline: "2026-09-15", category: "Trabalho", createdAt: now },
  { id: "goal-travel", title: "Viagem de ferias", targetAmount: 4000, currentAmount: 920, deadline: "2026-11-20", category: "Lazer", createdAt: now },
];

export const seedData: FinanceData = {
  transactions: seedTransactions,
  categories: seedCategories,
  goals: seedGoals,
  wallets: seedWallets,
  settings: {
    userName: "Felipe",
    currency: "BRL",
    theme: "light",
    compactView: false,
  },
};
