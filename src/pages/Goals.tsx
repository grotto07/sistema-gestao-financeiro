import { useState } from "react";
import { Edit, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Goal } from "../types";
import { Button } from "../components/ui/Button";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { Input } from "../components/ui/Input";
import { Modal } from "../components/ui/Modal";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";

export function Goals({ goals, saveGoal, removeGoal }: { goals: Goal[]; saveGoal: (goal: Omit<Goal, "id" | "createdAt"> & Partial<Pick<Goal, "id" | "createdAt">>) => void; removeGoal: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState<Goal | null>(null);
  const [form, setForm] = useState<Omit<Goal, "id" | "createdAt"> & Partial<Pick<Goal, "id" | "createdAt">>>({ title: "", targetAmount: 0, currentAmount: 0, deadline: "2026-12-30", category: "" });
  const submit = (event: React.FormEvent) => { event.preventDefault(); if (!form.title || !form.targetAmount) return; saveGoal(form); setOpen(false); };
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between gap-3"><div><h2 className="font-display text-2xl font-bold text-slate-950 dark:text-white">Metas financeiras</h2><p className="text-sm font-semibold text-slate-500 dark:text-zinc-400">Acompanhe progresso, prazo e objetivos.</p></div><Button onClick={() => { setForm({ title: "", targetAmount: 0, currentAmount: 0, deadline: "2026-12-30", category: "" }); setOpen(true); }}><Plus size={18} /> Criar meta</Button></div>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {goals.map((goal) => {
          const progress = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
          const days = Math.ceil((new Date(goal.deadline).getTime() - Date.now()) / 86400000);
          return <article key={goal.id} className="rounded-xl border border-white/70 bg-white/82 p-5 shadow-soft dark:border-zinc-800 dark:bg-zinc-900/80">
            <div className="flex items-start justify-between gap-3"><div><strong className="font-display text-lg">{goal.title}</strong><p className="text-sm text-slate-500">{formatCurrency(goal.currentAmount)} de {formatCurrency(goal.targetAmount)}</p></div><span className={`rounded-full px-2 py-1 text-xs font-bold ${days <= 90 ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>{days} dias</span></div>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-zinc-800"><motion.div className="h-full rounded-full bg-blue-600" initial={{ width: 0 }} animate={{ width: `${progress}%` }} /></div>
            <p className="mt-2 text-sm font-bold">{progress}% concluido - Prazo: {formatDate(goal.deadline)}</p>
            <div className="mt-4 flex gap-2"><Button variant="secondary" onClick={() => { setForm(goal); setOpen(true); }}><Edit size={17} /> Editar</Button><Button variant="ghost" className="text-rose-600" onClick={() => setDeleting(goal)}><Trash2 size={17} /> Excluir</Button></div>
          </article>;
        })}
      </section>
      <Modal open={open} title={form.id ? "Editar meta" : "Nova meta"} onClose={() => setOpen(false)}>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={submit}>
          <Input label="Titulo" required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
          <Input label="Categoria" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} />
          <Input label="Valor alvo" required type="number" step="0.01" value={form.targetAmount || ""} onChange={(event) => setForm({ ...form, targetAmount: Number(event.target.value) })} />
          <Input label="Valor atual" type="number" step="0.01" value={form.currentAmount || ""} onChange={(event) => setForm({ ...form, currentAmount: Number(event.target.value) })} />
          <Input label="Prazo" type="date" value={form.deadline} onChange={(event) => setForm({ ...form, deadline: event.target.value })} />
          <div className="md:col-span-2 flex justify-end gap-3"><Button variant="secondary" type="button" onClick={() => setOpen(false)}>Cancelar</Button><Button>Salvar meta</Button></div>
        </form>
      </Modal>
      <ConfirmDialog open={!!deleting} title="Esta meta sera removida." onCancel={() => setDeleting(null)} onConfirm={() => { if (deleting) removeGoal(deleting.id); setDeleting(null); }} />
    </div>
  );
}
