// components/FlashSale.jsx
// Clean flash sale banner with countdown timer
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, ArrowRight } from 'lucide-react';

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
    <section className="bg-primary-dark py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-badge-sale rounded-lg flex items-center justify-center">
            <Zap size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white">Today's Flash Sale</h2>
            <p className="text-white/60 text-sm">Limited time offers — Ends today!</p>
          </div>
        </div>

        {/* Countdown */}
        <div className="flex items-center gap-2">
          {[
            { label: 'HRS', value: pad(timeLeft.hours) },
            { label: 'MIN', value: pad(timeLeft.minutes) },
            { label: 'SEC', value: pad(timeLeft.seconds) },
          ].map((item, i) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className="bg-white/10 rounded-lg px-3 py-2 min-w-[52px] text-center">
                <div className="text-xl md:text-2xl font-bold font-mono text-white leading-none">{item.value}</div>
                <div className="text-[9px] uppercase tracking-wider text-white/50 mt-1">{item.label}</div>
              </div>
              {i < 2 && <span className="text-white/30 text-xl font-bold">:</span>}
            </div>
          ))}
        </div>

        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-badge-sale text-white font-semibold px-6 py-2.5 rounded-lg text-sm hover:bg-red-700 transition-all"
        >
          Shop Sale <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
};

export default FlashSale;
