import { useState } from "react";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Wallet } from "../types";
import { Button } from "../components/ui/Button";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { Input } from "../components/ui/Input";
import { Modal } from "../components/ui/Modal";
import { Select } from "../components/ui/Select";
import { formatCurrency } from "../utils/formatCurrency";

export function Wallets({ wallets, saveWallet, removeWallet }: { wallets: Wallet[]; saveWallet: (wallet: Omit<Wallet, "id" | "createdAt"> & Partial<Pick<Wallet, "id" | "createdAt">>) => void; removeWallet: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState<Wallet | null>(null);
  const [form, setForm] = useState<Omit<Wallet, "id" | "createdAt"> & Partial<Pick<Wallet, "id" | "createdAt">>>({ name: "", type: "bank", initialBalance: 0, currentBalance: 0 });
  const submit = (event: React.FormEvent) => { event.preventDefault(); if (!form.name) return; saveWallet(form); setOpen(false); };
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between gap-3"><div><h2 className="font-display text-2xl font-bold text-slate-950 dark:text-white">Carteiras</h2><p className="text-sm font-semibold text-slate-500 dark:text-zinc-400">Contas bancarias, cartoes e investimentos.</p></div><Button onClick={() => { setForm({ name: "", type: "bank", initialBalance: 0, currentBalance: 0 }); setOpen(true); }}><Plus size={18} /> Nova carteira</Button></div>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {wallets.map((wallet) => <article key={wallet.id} className="rounded-xl border border-white/70 bg-white/82 p-5 shadow-soft dark:border-zinc-800 dark:bg-zinc-900/80"><p className="text-sm font-bold text-slate-500">{wallet.type}</p><strong className="mt-2 block font-display text-xl">{wallet.name}</strong><span className="mt-3 block text-2xl font-bold">{formatCurrency(wallet.currentBalance)}</span><p className="text-sm text-slate-500">Saldo inicial: {formatCurrency(wallet.initialBalance)}</p><div className="mt-4 flex gap-2"><Button variant="secondary" onClick={() => { setForm(wallet); setOpen(true); }}><Edit size={17} /> Editar</Button><Button variant="ghost" className="text-rose-600" onClick={() => setDeleting(wallet)}><Trash2 size={17} /></Button></div></article>)}
      </section>
      <Modal open={open} title={form.id ? "Editar carteira" : "Nova carteira"} onClose={() => setOpen(false)}>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={submit}>
          <Input label="Nome" required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
          <Select label="Tipo" value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value as Wallet["type"] })}><option value="bank">Conta bancaria</option><option value="cash">Carteira fisica</option><option value="credit_card">Cartao de credito</option><option value="investment">Investimentos</option><option value="digital_wallet">Conta digital</option></Select>
          <Input label="Saldo inicial" type="number" step="0.01" value={form.initialBalance || ""} onChange={(event) => setForm({ ...form, initialBalance: Number(event.target.value), currentBalance: Number(event.target.value) })} />
          <div className="md:col-span-2 flex justify-end gap-3"><Button variant="secondary" type="button" onClick={() => setOpen(false)}>Cancelar</Button><Button>Salvar carteira</Button></div>
        </form>
      </Modal>
      <ConfirmDialog open={!!deleting} title="Esta carteira sera removida." onCancel={() => setDeleting(null)} onConfirm={() => { if (deleting) removeWallet(deleting.id); setDeleting(null); }} />
    </div>
  );
}
