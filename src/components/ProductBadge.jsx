// components/ProductBadge.jsx
import { motion } from 'framer-motion';
import { Flame, Star, Gem, Sparkles } from 'lucide-react';

const badgeStyles = {
  sale: 'bg-badge-sale text-white',
  bestseller: 'bg-badge-best text-white',
  limited: 'bg-badge-limited text-white',
  new: 'bg-primary text-white',
};

const badgeIcons = {
  sale: <Flame size={11} />,
  bestseller: <Star size={11} />,
  limited: <Gem size={11} />,
  new: <Sparkles size={11} />,
};

const badgeLabels = {
  sale: 'Sale',
  bestseller: 'Bestseller',
  limited: 'Limited',
  new: 'New',
};

const ProductBadge = ({ type = 'sale' }) => {
  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-md text-[10px] font-semibold flex items-center gap-1 ${badgeStyles[type]}`}
    >
      {badgeIcons[type]} {badgeLabels[type]}
    </motion.span>
  );
};

export default ProductBadge;
