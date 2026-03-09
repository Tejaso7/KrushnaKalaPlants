// components/Toast.jsx
// Global toast notification component with Framer Motion
import { motion, AnimatePresence } from 'framer-motion';

const Toast = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  const colors = {
    success: 'bg-primary text-white',
    error: 'bg-badge-sale text-white',
    info: 'bg-primary-light text-white',
    warning: 'bg-badge-best text-white',
  };

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠',
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
          <span className="text-xl font-bold">{icons[type]}</span>
          <span className="text-sm font-medium flex-1">{message}</span>
          {onClose && (
            <button onClick={onClose} className="opacity-70 hover:opacity-100 transition text-lg">✕</button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
