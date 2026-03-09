// components/FlashSale.jsx
// Flash sale section with live countdown timer and featured products
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, ArrowRight } from 'lucide-react';

// Countdown target: 24 hours from now (resets daily)
const getTargetTime = () => {
  const now = new Date();
  const target = new Date(now);
  target.setHours(23, 59, 59, 999);
  return target.getTime();
};

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = getTargetTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        hours: Math.floor(diff / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <section className="bg-gradient-to-r from-badge-sale via-badge-best to-gold py-12 px-4">
      <div className="max-w-6xl mx-auto text-center text-white">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-2 flex items-center justify-center gap-3">
            <Zap size={36} className="text-white" /> Flash Sale
          </h2>
          <p className="text-lg opacity-90 mb-6">Hurry! Deals end today</p>

          {/* Countdown */}
          <div className="flex justify-center gap-4 mb-8">
            {[
              { label: 'Hours', value: pad(timeLeft.hours) },
              { label: 'Minutes', value: pad(timeLeft.minutes) },
              { label: 'Seconds', value: pad(timeLeft.seconds) },
            ].map((item) => (
              <div key={item.label} className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 min-w-[80px]">
                <div className="text-3xl md:text-5xl font-extrabold font-mono">{item.value}</div>
                <div className="text-xs uppercase tracking-wider opacity-80 mt-1">{item.label}</div>
              </div>
            ))}
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-white text-badge-sale font-bold px-10 py-4 rounded-full text-lg hover:bg-accent-light hover:text-white transition-all duration-300 shadow-xl hover:scale-105"
          >
            Shop Flash Sale <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FlashSale;
