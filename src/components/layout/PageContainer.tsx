import { ReactNode } from "react";
import { motion } from "framer-motion";

export function PageContainer({ children }: { children: ReactNode }) {
  return (
    <motion.main className="mx-auto w-full max-w-[1500px] p-5 lg:p-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      {children}
    </motion.main>
  );
}
