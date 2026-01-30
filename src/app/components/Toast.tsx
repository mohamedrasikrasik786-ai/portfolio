import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";

interface ToastProps {
  show: boolean;
  message: string;
  type?: "success" | "error" | "info";
}

export function Toast({ show, message, type = "success" }: ToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100000] pointer-events-none"
        >
          <div
            className={`flex items-center gap-3 px-6 py-4 rounded-[12px] shadow-2xl backdrop-blur-xl border ${
              type === "success"
                ? "bg-[#FFEB01]/95 border-[#FFEB01] text-[#0E0E0E]"
                : type === "error"
                ? "bg-red-500/95 border-red-600 text-white"
                : "bg-[#1c1c1c]/95 border-[#2a2a2a] text-white"
            }`}
          >
            {type === "success" && (
              <div className="size-5 rounded-full bg-[#0E0E0E] flex items-center justify-center">
                <Check className="w-3 h-3 text-[#FFEB01]" strokeWidth={3} />
              </div>
            )}
            <p className="font-['DM_Sans:SemiBold',sans-serif] text-[16px] whitespace-nowrap">
              {message}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
