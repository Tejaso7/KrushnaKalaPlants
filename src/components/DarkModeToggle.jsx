// components/DarkModeToggle.jsx
// Dark / Light mode toggle button
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

const DarkModeToggle = ({ dark, setDark }) => {
  return (
    <button
      onClick={() => setDark(!dark)}
      className="relative w-14 h-7 rounded-full bg-gray-300 dark:bg-gray-700 transition-colors duration-300 flex items-center px-1"
      aria-label="Toggle dark mode"
    >
      <motion.div
        layout
        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shadow-md ${
          dark ? 'bg-primary-dark ml-auto' : 'bg-gold'
        }`}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {dark ? <Moon size={12} className="text-white" /> : <Sun size={12} className="text-white" />}
      </motion.div>
    </button>
  );
};

export default DarkModeToggle;
