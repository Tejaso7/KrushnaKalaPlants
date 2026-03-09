// components/Pagination.jsx
// Pagination UI component
import { motion } from 'framer-motion';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-xl text-sm font-medium bg-bg-card shadow-md hover:bg-primary hover:text-white transition disabled:opacity-30 disabled:cursor-not-allowed"
      >
        ← Prev
      </button>
      {pages.map((page) => (
        <motion.button
          key={page}
          whileTap={{ scale: 0.9 }}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-200 ${
            page === currentPage
              ? 'bg-primary text-white shadow-lg scale-110'
              : 'bg-bg-card shadow-md hover:bg-primary-light hover:text-white'
          }`}
        >
          {page}
        </motion.button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-xl text-sm font-medium bg-bg-card shadow-md hover:bg-primary hover:text-white transition disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
