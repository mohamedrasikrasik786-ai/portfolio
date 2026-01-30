import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, Info, X } from 'lucide-react';

interface ConfirmDialogProps {
  show: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  show,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'info',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const typeConfig = {
    danger: {
      icon: <AlertTriangle className="w-6 h-6 text-[#FF4444]" />,
      confirmBg: 'bg-[#FF4444] hover:bg-[#FF3333]',
      confirmText: 'text-white',
      title: title || 'Confirm Delete',
    },
    warning: {
      icon: <AlertTriangle className="w-6 h-6 text-[#FFA500]" />,
      confirmBg: 'bg-[#FFA500] hover:bg-[#FF9500]',
      confirmText: 'text-[#0E0E0E]',
      title: title || 'Warning',
    },
    info: {
      icon: <Info className="w-6 h-6 text-[#FFEB01]" />,
      confirmBg: 'bg-[#FFEB01] hover:bg-[#FFD700]',
      confirmText: 'text-[#0E0E0E]',
      title: title || 'Confirm',
    },
  };

  const config = typeConfig[type];

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100000]"
            onClick={onCancel}
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-[100001] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ 
                type: 'spring', 
                stiffness: 400, 
                damping: 30,
                mass: 0.8
              }}
              className="
                bg-[#0E0E0E] 
                border border-[#2a2a2a] 
                rounded-2xl 
                shadow-2xl 
                max-w-md 
                w-full 
                overflow-hidden
              "
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="px-6 pt-6 pb-4 border-b border-[#2a2a2a]">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {config.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-['Barlow_Condensed',sans-serif] text-[24px] text-white leading-tight">
                      {config.title}
                    </h3>
                  </div>
                  <button
                    onClick={onCancel}
                    className="
                      flex-shrink-0
                      text-[#737373] 
                      hover:text-white 
                      transition-colors
                      p-1
                      rounded-lg
                      hover:bg-[#1c1c1c]
                    "
                    aria-label="Close dialog"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-6">
                <p className="font-['DM_Sans:Regular',sans-serif] text-[16px] text-[#EAEAEA] leading-relaxed whitespace-pre-line">
                  {message}
                </p>
              </div>

              {/* Actions */}
              <div className="px-6 pb-6 flex gap-3 justify-end">
                <button
                  onClick={onCancel}
                  className="
                    px-5 py-2.5 
                    rounded-lg 
                    font-['DM_Sans:Medium',sans-serif] 
                    text-[15px]
                    text-[#EAEAEA]
                    bg-[#1c1c1c]
                    hover:bg-[#2a2a2a]
                    border border-[#2a2a2a]
                    transition-all
                    duration-200
                  "
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  className={`
                    px-5 py-2.5 
                    rounded-lg 
                    font-['DM_Sans:Bold',sans-serif] 
                    text-[15px]
                    ${config.confirmBg}
                    ${config.confirmText}
                    transition-all
                    duration-200
                    shadow-lg
                    hover:shadow-xl
                  `}
                >
                  {confirmText}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
