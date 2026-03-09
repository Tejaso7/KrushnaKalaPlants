// components/AnnouncementBar.jsx
// Top banner with rotating announcements, flash sale countdown, and marquee
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  '🚚 FREE Delivery across Maharashtra on bulk orders!',
  '🏥 Government Approved Hi-Tech Nursery — Quality Guaranteed',
  '🥭 New Season: Alphonso & Kesar Mango Saplings Available Now!',
  '📞 Call 8999539204 or 7058151143 for Wholesale Enquiries',
];

const AnnouncementBar = () => {
  const [index, setIndex] = useState(0);

  // Rotate messages every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-primary-dark text-accent-light text-xs md:text-sm py-2 overflow-hidden relative z-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="font-medium tracking-wide"
          >
            {messages[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AnnouncementBar;
