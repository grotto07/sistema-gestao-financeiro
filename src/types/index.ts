export type TransactionType = "income" | "expense";
export type TransactionStatus = "pago" | "pendente" | "atrasado";

export interface Transaction {
  id: string;
  type: TransactionType;
  title: string;
  description?: string;
  amount: number;
  category: string;
  walletId?: string;
  paymentMethod: string;
  date: string;
  isRecurring: boolean;
  recurrenceFrequency?: "mensal" | "semanal" | "anual";
  recurrenceEndDate?: string;
  status: TransactionStatus;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  type: TransactionType;
  color: string;
  icon: string;
}

export interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  createdAt: string;
}

export interface Wallet {
  id: string;
  name: string;
  type: "bank" | "cash" | "credit_card" | "investment" | "digital_wallet";
  initialBalance: number;
  currentBalance: number;
  createdAt: string;
}

export interface UserSettings {
  userName: string;
  currency: "BRL";
  theme: "light" | "dark";
  compactView: boolean;
}

export interface FinanceData {
  transactions: Transaction[];
  categories: Category[];
  goals: Goal[];
  wallets: Wallet[];
  settings: UserSettings;
}

export type PageKey = "dashboard" | "transactions" | "categories" | "reports" | "goals" | "wallets" | "settings";
