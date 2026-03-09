// components/RecentlyViewed.jsx
// Shows recently viewed products from localStorage
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sprout } from 'lucide-react';

const RecentlyViewed = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    setItems(stored.slice(0, 6));
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-lg font-bold text-text-primary mb-4">Recently Viewed</h2>
      <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
        {items.map((item, i) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={`/products/${item._id}`}
              className="flex-shrink-0 w-36 bg-white rounded-xl border border-border overflow-hidden card-hover block"
            >
              <div className="h-28 bg-bg-warm flex items-center justify-center">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="object-cover h-full w-full" />
                ) : (
                  <Sprout size={24} className="text-primary/20" />
                )}
              </div>
              <div className="p-2.5">
                <p className="text-xs font-semibold text-text-primary truncate">{item.name}</p>
                <p className="text-xs font-bold text-primary mt-0.5">₹{item.price}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export const addToRecentlyViewed = (product) => {
  const stored = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
  const filtered = stored.filter((p) => p._id !== product._id);
  const updated = [product, ...filtered].slice(0, 10);
  localStorage.setItem('recentlyViewed', JSON.stringify(updated));
};

export default RecentlyViewed;
