import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Info, AlertTriangle } from 'lucide-react';

interface SnackbarProps {
  show: boolean;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose: () => void;
}

export function Snackbar({ 
  show, 
  message, 
  type = 'info', 
  duration = 4000,
  onClose 
}: SnackbarProps) {
  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  const icons = {
    success: <Check className="w-5 h-5" />,
    error: <X className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
  };

  const colors = {
    success: {
      bg: 'bg-[#FFEB01]',
      text: 'text-[#0E0E0E]',
      icon: 'text-[#0E0E0E]',
    },
    error: {
      bg: 'bg-[#FF4444]',
      text: 'text-white',
      icon: 'text-white',
    },
    info: {
      bg: 'bg-[#1c1c1c]',
      text: 'text-[#EAEAEA]',
      icon: 'text-[#FFEB01]',
    },
    warning: {
      bg: 'bg-[#FFA500]',
      text: 'text-[#0E0E0E]',
      icon: 'text-[#0E0E0E]',
    },
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ 
            type: 'spring', 
            stiffness: 400, 
            damping: 25,
            mass: 0.5
          }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[99999] max-w-md w-full mx-4"
        >
          <div 
            className={`
              ${colors[type].bg} 
              ${colors[type].text}
              px-6 py-4 rounded-xl shadow-2xl 
              flex items-center gap-4
              border border-[#2a2a2a]
              backdrop-blur-md
            `}
          >
            <div className={colors[type].icon}>
              {icons[type]}
            </div>
            <p className="flex-1 font-['DM_Sans:Medium',sans-serif] text-[15px] leading-relaxed">
              {message}
            </p>
            <button
              onClick={onClose}
              className={`
                ${colors[type].icon}
                hover:opacity-70 transition-opacity
                p-1 rounded-lg
              `}
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
