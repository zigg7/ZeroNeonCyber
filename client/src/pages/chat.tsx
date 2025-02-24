import { motion } from "framer-motion";
import { ChatInterface } from "@/components/ChatInterface";

export default function Chat() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-black p-8"
    >
      <ChatInterface />
    </motion.div>
  );
}
