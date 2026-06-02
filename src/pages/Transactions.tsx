import { useMemo, useState } from "react";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import { Transaction, Category, Wallet } from "../types";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { EmptyState } from "../components/ui/EmptyState";
import { Input } from "../components/ui/Input";
import { Modal } from "../components/ui/Modal";
import { Select } from "../components/ui/Select";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDate, monthKey } from "../utils/formatDate";

type Props = {
  transactions: Transaction[];
  categories: Category[];
  wallets: Wallet[];
  currentMonth: string;
  saveTransaction: (transaction: Omit<Transaction, "id" | "createdAt"> & Partial<Pick<Transaction, "id" | "createdAt">>) => void;
  removeTransaction: (id: string) => void;
};

const emptyForm: Omit<Transaction, "id" | "createdAt"> = {
  type: "expense",
  title: "",
  description: "",
  amount: 0,
  category: "Alimentacao",
  walletId: "",
  paymentMethod: "Pix",
  date: new Date().toISOString().slice(0, 10),
  isRecurring: false,
  status: "pago",
};

export function Transactions({ transactions, categories, wallets, currentMonth, saveTransaction, removeTransaction }: Props) {
  const [form, setForm] = useState<Omit<Transaction, "id" | "createdAt"> & Partial<Pick<Transaction, "id" | "createdAt">>>(emptyForm);
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState<Transaction | null>(null);
  const [deleting, setDeleting] = useState<Transaction | null>(null);
  const [filters, setFilters] = useState({ query: "", type: "all", category: "all", month: currentMonth });

  const visible = useMemo(() => transactions.filter((item) => {
    const matchQuery = item.title.toLowerCase().includes(filters.query.toLowerCase());
    const matchType = filters.type === "all" || item.type === filters.type;
    const matchCategory = filters.category === "all" || item.category === filters.category;
    const matchMonth = !filters.month || monthKey(item.date) === filters.month;
    return matchQuery && matchType && matchCategory && matchMonth;
  }), [transactions, filters]);

  const startCreate = (type: "income" | "expense") => {
    setForm({ ...emptyForm, type, category: categories.find((item) => item.type === type)?.name || "" });
    setOpen(true);
  };

  const startEdit = (transaction: Transaction) => {
    setForm(transaction);
    setOpen(true);
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.title || !form.amount || !form.category) return;
    saveTransaction(form);
    setOpen(false);
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-950 dark:text-white">Transacoes</h2>
          <p className="text-sm font-semibold text-slate-500 dark:text-zinc-400">Cadastre, edite, filtre e acompanhe receitas e despesas.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => startCreate("income")}><Plus size={18} /> Nova receita</Button>
          <Button variant="secondary" onClick={() => startCreate("expense")}><Plus size={18} /> Nova despesa</Button>
        </div>
      </div>
      <section className="grid gap-3 rounded-xl border border-white/70 bg-white/82 p-4 shadow-soft dark:border-zinc-800 dark:bg-zinc-900/80 md:grid-cols-4">
        <Input label="Buscar por titulo" value={filters.query} onChange={(event) => setFilters({ ...filters, query: event.target.value })} />
        <Select label="Tipo" value={filters.type} onChange={(event) => setFilters({ ...filters, type: event.target.value })}>
          <option value="all">Todos</option><option value="income">Receitas</option><option value="expense">Despesas</option>
        </Select>
        <Select label="Categoria" value={filters.category} onChange={(event) => setFilters({ ...filters, category: event.target.value })}>
          <option value="all">Todas</option>{categories.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}
        </Select>
        <Input label="Mes" type="month" value={filters.month} onChange={(event) => setFilters({ ...filters, month: event.target.value })} />
      </section>
      <section className="overflow-hidden rounded-xl border border-white/70 bg-white/82 shadow-soft dark:border-zinc-800 dark:bg-zinc-900/80">
        <div className="hidden overflow-auto lg:block">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-zinc-950 dark:text-zinc-400">
              <tr><th className="p-4">Data</th><th>Tipo</th><th>Titulo</th><th>Categoria</th><th>Pagamento</th><th>Status</th><th>Valor</th><th className="text-right pr-4">Acoes</th></tr>
            </thead>
            <tbody>
              {visible.map((item) => (
                <tr key={item.id} className="border-t border-slate-100 dark:border-zinc-800">
                  <td className="p-4 font-semibold">{formatDate(item.date)}</td>
                  <td><Badge tone={item.type === "income" ? "green" : "red"}>{item.type === "income" ? "Receita" : "Despesa"}</Badge></td>
                  <td className="font-bold">{item.title}{item.isRecurring && <span className="ml-2"><Badge tone="purple">Recorrente</Badge></span>}</td>
                  <td>{item.category}</td><td>{item.paymentMethod}</td>
                  <td><Badge tone={item.status === "pago" ? "green" : item.status === "pendente" ? "yellow" : "red"}>{item.status}</Badge></td>
                  <td className={`font-bold ${item.type === "income" ? "text-emerald-600" : "text-rose-600"}`}>{formatCurrency(item.amount)}</td>
                  <td className="pr-4 text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" className="h-9 w-9 p-0" onClick={() => setDetails(item)}><Eye size={17} /></Button>
                      <Button variant="ghost" className="h-9 w-9 p-0" onClick={() => startEdit(item)}><Edit size={17} /></Button>
                      <Button variant="ghost" className="h-9 w-9 p-0 text-rose-600" onClick={() => setDeleting(item)}><Trash2 size={17} /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid gap-3 p-4 lg:hidden">
          {visible.map((item) => (
            <article key={item.id} className="rounded-lg border border-slate-200 p-4 dark:border-zinc-700">
              <div className="flex items-start justify-between gap-3"><div><strong>{item.title}</strong><p className="text-sm text-slate-500">{item.category} - {formatDate(item.date)}</p></div><Badge tone={item.type === "income" ? "green" : "red"}>{formatCurrency(item.amount)}</Badge></div>
              <div className="mt-3 flex gap-2"><Button variant="secondary" onClick={() => startEdit(item)}>Editar</Button><Button variant="ghost" className="text-rose-600" onClick={() => setDeleting(item)}>Excluir</Button></div>
            </article>
          ))}
        </div>
        {!visible.length && <div className="p-4"><EmptyState title="Nenhuma transacao encontrada" /></div>}
      </section>
      <Modal open={open} title={form.id ? "Editar transacao" : "Adicionar transacao"} onClose={() => setOpen(false)}>
        <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
          <Select label="Tipo" value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value as "income" | "expense", category: categories.find((item) => item.type === event.target.value)?.name || "" })}><option value="income">Receita</option><option value="expense">Despesa</option></Select>
          <Input label="Titulo" required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
          <Input label="Descricao" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
          <Input label="Valor" type="number" min="0" step="0.01" required value={form.amount || ""} onChange={(event) => setForm({ ...form, amount: Number(event.target.value) })} />
          <Select label="Categoria" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>{categories.filter((item) => item.type === form.type).map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}</Select>
          <Select label="Carteira" value={form.walletId} onChange={(event) => setForm({ ...form, walletId: event.target.value })}><option value="">Sem carteira</option>{wallets.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</Select>
          <Select label="Forma de pagamento" value={form.paymentMethod} onChange={(event) => setForm({ ...form, paymentMethod: event.target.value })}>{["Pix", "Dinheiro", "Cartao de credito", "Cartao de debito", "Boleto", "Transferencia bancaria"].map((item) => <option key={item}>{item}</option>)}</Select>
          <Input label="Data" type="date" required value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} />
          <Select label="Status" value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as Transaction["status"] })}><option value="pago">Pago</option><option value="pendente">Pendente</option><option value="atrasado">Atrasado</option></Select>
          <Select label="Recorrencia" value={form.isRecurring ? form.recurrenceFrequency || "mensal" : "nao"} onChange={(event) => setForm({ ...form, isRecurring: event.target.value !== "nao", recurrenceFrequency: event.target.value === "nao" ? undefined : event.target.value as "mensal" | "semanal" | "anual" })}><option value="nao">Nao recorrente</option><option value="mensal">Mensal</option><option value="semanal">Semanal</option><option value="anual">Anual</option></Select>
          <div className="md:col-span-2 flex justify-end gap-3"><Button variant="secondary" type="button" onClick={() => setOpen(false)}>Cancelar</Button><Button type="submit">Salvar transacao</Button></div>
        </form>
      </Modal>
      <Modal open={!!details} title="Detalhes da transacao" onClose={() => setDetails(null)}>
        {details && <div className="grid gap-3 text-sm"><p><strong>Titulo:</strong> {details.title}</p><p><strong>Descricao:</strong> {details.description || "Sem descricao"}</p><p><strong>Valor:</strong> {formatCurrency(details.amount)}</p><p><strong>Status:</strong> {details.status}</p></div>}
      </Modal>
      <ConfirmDialog open={!!deleting} title="Esta acao removera a transacao selecionada." onCancel={() => setDeleting(null)} onConfirm={() => { if (deleting) removeTransaction(deleting.id); setDeleting(null); }} />
    </div>
  );
}
