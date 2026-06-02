import { useMemo, useState } from "react";
import { seedData } from "../data/seed";
import { Category, FinanceData, Goal, Transaction, Wallet, UserSettings } from "../types";
import { getCurrentMonth, walletBalance } from "../utils/calculations";
import { useLocalStorage } from "./useLocalStorage";

const key = "finansmart:data";
const makeId = (prefix: string) => `${prefix}-${crypto.randomUUID()}`;

export function useFinance() {
  const [data, setData] = useLocalStorage<FinanceData>(key, seedData);
  const [toast, setToast] = useState("");

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };

  const walletsWithBalance = useMemo(() => walletBalance(data.wallets, data.transactions), [data.wallets, data.transactions]);

  const saveTransaction = (input: Omit<Transaction, "id" | "createdAt"> & Partial<Pick<Transaction, "id" | "createdAt">>) => {
    const transaction: Transaction = { ...input, id: input.id || makeId("tr"), createdAt: input.createdAt || new Date().toISOString() };
    setData((current) => ({
      ...current,
      transactions: current.transactions.some((item) => item.id === transaction.id)
        ? current.transactions.map((item) => (item.id === transaction.id ? transaction : item))
        : [transaction, ...current.transactions],
    }));
    notify(transaction.type === "income" ? "Receita salva com sucesso" : "Despesa salva com sucesso");
  };

  const removeTransaction = (id: string) => {
    setData((current) => ({ ...current, transactions: current.transactions.filter((item) => item.id !== id) }));
    notify("Transacao excluida com sucesso");
  };

  const saveCategory = (input: Omit<Category, "id"> & Partial<Pick<Category, "id">>) => {
    const category: Category = { ...input, id: input.id || makeId("cat") };
    setData((current) => ({
      ...current,
      categories: current.categories.some((item) => item.id === category.id)
        ? current.categories.map((item) => (item.id === category.id ? category : item))
        : [category, ...current.categories],
    }));
    notify("Categoria salva com sucesso");
  };

  const removeCategory = (id: string) => {
    setData((current) => ({ ...current, categories: current.categories.filter((item) => item.id !== id) }));
    notify("Categoria excluida com sucesso");
  };

  const saveGoal = (input: Omit<Goal, "id" | "createdAt"> & Partial<Pick<Goal, "id" | "createdAt">>) => {
    const goal: Goal = { ...input, id: input.id || makeId("goal"), createdAt: input.createdAt || new Date().toISOString() };
    setData((current) => ({
      ...current,
      goals: current.goals.some((item) => item.id === goal.id) ? current.goals.map((item) => (item.id === goal.id ? goal : item)) : [goal, ...current.goals],
    }));
    notify("Meta salva com sucesso");
  };

  const removeGoal = (id: string) => {
    setData((current) => ({ ...current, goals: current.goals.filter((item) => item.id !== id) }));
    notify("Meta excluida com sucesso");
  };

  const saveWallet = (input: Omit<Wallet, "id" | "createdAt"> & Partial<Pick<Wallet, "id" | "createdAt">>) => {
    const wallet: Wallet = { ...input, id: input.id || makeId("wallet"), createdAt: input.createdAt || new Date().toISOString() };
    setData((current) => ({
      ...current,
      wallets: current.wallets.some((item) => item.id === wallet.id) ? current.wallets.map((item) => (item.id === wallet.id ? wallet : item)) : [wallet, ...current.wallets],
    }));
    notify("Carteira salva com sucesso");
  };

  const removeWallet = (id: string) => {
    setData((current) => ({ ...current, wallets: current.wallets.filter((item) => item.id !== id) }));
    notify("Carteira excluida com sucesso");
  };

  const saveSettings = (settings: UserSettings) => {
    setData((current) => ({ ...current, settings }));
    notify("Configuracoes salvas");
  };

  const restoreSeed = () => {
    setData(seedData);
    notify("Dados restaurados com sucesso");
  };

  const clearAll = () => {
    setData({ ...seedData, transactions: [], goals: [], wallets: [], categories: seedData.categories });
    notify("Dados limpos com sucesso");
  };

  return {
    ...data,
    wallets: walletsWithBalance,
    currentMonth: getCurrentMonth(),
    toast,
    saveTransaction,
    removeTransaction,
    saveCategory,
    removeCategory,
    saveGoal,
    removeGoal,
    saveWallet,
    removeWallet,
    saveSettings,
    restoreSeed,
    clearAll,
  };
}
