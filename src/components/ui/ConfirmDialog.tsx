import { Button } from "./Button";
import { Modal } from "./Modal";

export function ConfirmDialog({ open, title, onCancel, onConfirm }: { open: boolean; title: string; onCancel: () => void; onConfirm: () => void }) {
  return (
    <Modal open={open} title="Deseja realmente excluir?" onClose={onCancel}>
      <p className="text-slate-600 dark:text-zinc-300">{title}</p>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="secondary" onClick={onCancel}>Cancelar</Button>
        <Button variant="danger" onClick={onConfirm}>Excluir</Button>
      </div>
    </Modal>
  );
}
