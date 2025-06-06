import "./GlobalLoader.scss"
import { useLoading } from "@/context/LoadingContext";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobalLoader() {
  const { isLoading } = useLoading();
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="global__loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="global__loader-spinner" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
