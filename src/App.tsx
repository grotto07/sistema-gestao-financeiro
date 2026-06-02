import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "./components/layout/Header";
import { PageContainer } from "./components/layout/PageContainer";
import { Sidebar } from "./components/layout/Sidebar";
import { Dashboard } from "./pages/Dashboard";
import { Transactions } from "./pages/Transactions";
import { Categories } from "./pages/Categories";
import { Reports } from "./pages/Reports";
import { Goals } from "./pages/Goals";
import { Wallets } from "./pages/Wallets";
import { Settings } from "./pages/Settings";
import { useFinance } from "./hooks/useFinance";
import { PageKey } from "./types";

export default function App() {
  const finance = useFinance();
  const [page, setPage] = useState<PageKey>("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", finance.settings.theme === "dark");
  }, [finance.settings.theme]);

  const navigate = (next: PageKey) => {
    setPage(next);
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen">
      <Sidebar active={page} open={menuOpen} onToggle={() => setMenuOpen((value) => !value)} onNavigate={navigate} />
      <div className="lg:pl-72">
        <Header settings={finance.settings} />
        <PageContainer>
          {page === "dashboard" && <Dashboard transactions={finance.transactions} goals={finance.goals} wallets={finance.wallets} />}
          {page === "transactions" && <Transactions transactions={finance.transactions} categories={finance.categories} wallets={finance.wallets} currentMonth={finance.currentMonth} saveTransaction={finance.saveTransaction} removeTransaction={finance.removeTransaction} />}
          {page === "categories" && <Categories categories={finance.categories} saveCategory={finance.saveCategory} removeCategory={finance.removeCategory} />}
          {page === "reports" && <Reports transactions={finance.transactions} currentMonth={finance.currentMonth} />}
          {page === "goals" && <Goals goals={finance.goals} saveGoal={finance.saveGoal} removeGoal={finance.removeGoal} />}
          {page === "wallets" && <Wallets wallets={finance.wallets} saveWallet={finance.saveWallet} removeWallet={finance.removeWallet} />}
          {page === "settings" && <Settings settings={finance.settings} saveSettings={finance.saveSettings} restoreSeed={finance.restoreSeed} clearAll={finance.clearAll} />}
        </PageContainer>
      </div>
      <AnimatePresence>
        {finance.toast && (
          <motion.div className="fixed bottom-5 right-5 z-50 rounded-lg bg-slate-950 px-4 py-3 text-sm font-bold text-white shadow-soft dark:bg-white dark:text-slate-950" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}>
            {finance.toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
