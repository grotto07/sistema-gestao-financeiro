import { useState } from "react";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Category } from "../types";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { Input } from "../components/ui/Input";
import { Modal } from "../components/ui/Modal";
import { Select } from "../components/ui/Select";

export function Categories({ categories, saveCategory, removeCategory }: { categories: Category[]; saveCategory: (category: Omit<Category, "id"> & Partial<Pick<Category, "id">>) => void; removeCategory: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState<Category | null>(null);
  const [form, setForm] = useState<Omit<Category, "id"> & Partial<Pick<Category, "id">>>({ name: "", type: "expense", color: "#2563eb", icon: "wallet" });

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name) return;
    saveCategory(form);
    setOpen(false);
  };

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between gap-3">
        <div><h2 className="font-display text-2xl font-bold text-slate-950 dark:text-white">Categorias</h2><p className="text-sm font-semibold text-slate-500 dark:text-zinc-400">Organize receitas e despesas por cor e icone.</p></div>
        <Button onClick={() => { setForm({ name: "", type: "expense", color: "#2563eb", icon: "wallet" }); setOpen(true); }}><Plus size={18} /> Criar categoria</Button>
      </div>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <article key={category.id} className="rounded-xl border border-white/70 bg-white/82 p-5 shadow-soft dark:border-zinc-800 dark:bg-zinc-900/80">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3"><span className="h-10 w-10 rounded-lg" style={{ background: category.color }} /><div><strong>{category.name}</strong><p className="text-sm text-slate-500">Icone: {category.icon}</p></div></div>
              <Badge tone={category.type === "income" ? "green" : "red"}>{category.type === "income" ? "Receita" : "Despesa"}</Badge>
            </div>
            <div className="mt-4 flex gap-2"><Button variant="secondary" onClick={() => { setForm(category); setOpen(true); }}><Edit size={17} /> Editar</Button><Button variant="ghost" className="text-rose-600" onClick={() => setDeleting(category)}><Trash2 size={17} /> Excluir</Button></div>
          </article>
        ))}
      </section>
      <Modal open={open} title={form.id ? "Editar categoria" : "Nova categoria"} onClose={() => setOpen(false)}>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={submit}>
          <Input label="Nome" required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
          <Select label="Tipo" value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value as Category["type"] })}><option value="income">Receita</option><option value="expense">Despesa</option></Select>
          <Input label="Cor" type="color" value={form.color} onChange={(event) => setForm({ ...form, color: event.target.value })} />
          <Input label="Icone" value={form.icon} onChange={(event) => setForm({ ...form, icon: event.target.value })} />
          <div className="md:col-span-2 flex justify-end gap-3"><Button variant="secondary" type="button" onClick={() => setOpen(false)}>Cancelar</Button><Button>Salvar categoria</Button></div>
        </form>
      </Modal>
      <ConfirmDialog open={!!deleting} title="A categoria sera removida da lista." onCancel={() => setDeleting(null)} onConfirm={() => { if (deleting) removeCategory(deleting.id); setDeleting(null); }} />
    </div>
  );
}
