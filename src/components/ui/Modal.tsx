import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "./Button";

export function Modal({ open, title, children, onClose }: { open: boolean; title: string; children: ReactNode; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.section
            className="max-h-[92vh] w-full max-w-2xl overflow-auto rounded-xl border border-white/50 bg-white p-5 shadow-soft dark:border-zinc-700 dark:bg-zinc-950"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="font-display text-xl font-bold text-slate-950 dark:text-white">{title}</h2>
              <Button aria-label="Fechar modal" variant="ghost" className="h-10 w-10 p-0" onClick={onClose}>
                <X size={18} />
              </Button>
            </div>
            {children}
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
