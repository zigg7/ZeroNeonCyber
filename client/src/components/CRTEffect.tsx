import { motion } from "framer-motion";
import "../styles/crt.css";

export const CRTEffect: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      className="crt min-h-screen w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};
