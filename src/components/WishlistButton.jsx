// components/WishlistButton.jsx
// Heart icon button for wishlisting products (localStorage based)
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WishlistButton = ({ productId, size = 'md' }) => {
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlisted(list.includes(productId));
  }, [productId]);

  const toggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const list = JSON.parse(localStorage.getItem('wishlist') || '[]');
    let newList;
    if (list.includes(productId)) {
      newList = list.filter((id) => id !== productId);
    } else {
      newList = [...list, productId];
    }
    localStorage.setItem('wishlist', JSON.stringify(newList));
    setWishlisted(!wishlisted);
  };

  const sizeClass = size === 'lg' ? 'w-10 h-10 text-xl' : 'w-8 h-8 text-base';

  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      onClick={toggle}
      className={`${sizeClass} rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
        wishlisted
          ? 'bg-badge-sale text-white'
          : 'bg-white/80 backdrop-blur-sm text-gray-400 hover:text-badge-sale'
      }`}
      aria-label="Toggle wishlist"
    >
      <motion.span
        animate={wishlisted ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        {wishlisted ? '♥' : '♡'}
      </motion.span>
    </motion.button>
  );
};

export default WishlistButton;
