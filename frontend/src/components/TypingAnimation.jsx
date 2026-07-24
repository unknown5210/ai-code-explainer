"use client";

import { motion } from "framer-motion";
import { Brain } from "lucide-react";

export default function TypingAnimation({ label = "AI is analyzing your code…" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 animate-fade-in">
      <div className="relative w-14 h-14 flex items-center justify-center">
        <motion.span
          className="absolute inset-0 rounded-full bg-accent/25"
          animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-accent-light/60"
          animate={{ rotate: 360 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
        />
        <Brain size={22} className="text-accent-light relative z-10" />
      </div>

      <p className="text-ink/70 text-sm font-medium">{label}</p>

      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-accent-light"
            animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.15,
            }}
          />
        ))}
      </div>

      <div className="w-48 h-1 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full"
          animate={{ x: ["-100%", "120%"] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: "40%" }}
        />
      </div>
    </div>
  );
}
