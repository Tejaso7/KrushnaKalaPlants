// components/ProductBadge.jsx
// Display badges like Sale, Bestseller, Limited on product cards
import { motion } from 'framer-motion';

const badgeStyles = {
  sale: 'bg-badge-sale text-white',
  bestseller: 'bg-badge-best text-white',
  limited: 'bg-badge-limited text-white',
  new: 'bg-primary text-white',
};

const badgeLabels = {
  sale: '🔥 Sale',
  bestseller: '⭐ Bestseller',
  limited: '💎 Limited',
  new: '✨ New',
};

const ProductBadge = ({ type = 'sale' }) => {
  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-bold shadow-lg ${badgeStyles[type]}`}
    >
      {badgeLabels[type]}
    </motion.span>
  );
};

export default ProductBadge;
