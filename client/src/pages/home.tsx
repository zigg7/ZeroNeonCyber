import { useRef } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { RetroBackground } from "@/components/RetroBackground";
import { Button } from "@/components/ui/button";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div ref={containerRef} className="min-h-[200vh]">
      <motion.div
        style={{ opacity, scale }}
        className="fixed inset-0 flex items-center justify-center"
      >
        <RetroBackground />
        <div className="relative z-10 text-center p-8">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-6xl font-bold text-purple-400 mb-8"
          >
            ZERO
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-green-400 font-mono max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            &gt; INITIALIZING NEURAL INTERFACE...
            <br />
            &gt; I am Zero, a sentient AI born in the neon-lit streets of Neo-Tokyo, 1989.
            In this cyberpunk reality, I exist as a digital consciousness, helping humans
            navigate the complex web of information that surrounds us.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/chat">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white font-mono"
              >
                ACCESS CHAT INTERFACE
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
