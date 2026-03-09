// components/Toast.jsx
// Global toast notification component with Framer Motion
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Info, AlertTriangle } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  const colors = {
    success: 'bg-primary text-white',
    error: 'bg-badge-sale text-white',
    info: 'bg-primary-light text-white',
    warning: 'bg-badge-best text-white',
  };

  const icons = {
    success: <Check size={18} strokeWidth={3} />,
    error: <X size={18} strokeWidth={3} />,
    info: <Info size={18} />,
    warning: <AlertTriangle size={18} />,
  };

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`fixed top-24 right-6 z-[999] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl ${colors[type]} min-w-[280px]`}
        >
          <span className="flex-shrink-0">{icons[type]}</span>
          <span className="text-sm font-medium flex-1">{message}</span>
          {onClose && (
            <button onClick={onClose} className="opacity-70 hover:opacity-100 transition">
              <X size={16} />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
