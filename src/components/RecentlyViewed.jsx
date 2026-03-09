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
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-primary-dark mb-6">Recently Viewed</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {items.map((item, i) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to={`/products/${item._id}`}
              className="flex-shrink-0 w-40 bg-bg-card rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-32 bg-accent-light/20 flex items-center justify-center">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="object-cover h-full w-full" />
                ) : (
                  <Sprout size={32} className="text-primary" />
                )}
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold text-primary-dark truncate">{item.name}</p>
                <p className="text-xs font-bold text-primary">₹{item.price}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// Helper to add a product to recently viewed
export const addToRecentlyViewed = (product) => {
  const stored = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
  const filtered = stored.filter((p) => p._id !== product._id);
  const updated = [product, ...filtered].slice(0, 10);
  localStorage.setItem('recentlyViewed', JSON.stringify(updated));
};

export default RecentlyViewed;
