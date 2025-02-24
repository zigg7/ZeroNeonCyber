import { motion } from "framer-motion";

export const RetroBackground = () => {
  return (
    <motion.div
      className="fixed inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1513622790541-eaa84d356909')",
          filter: "brightness(0.4) contrast(1.2) saturate(1.2)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
    </motion.div>
  );
};
