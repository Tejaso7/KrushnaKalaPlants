// components/HeroSlider.jsx
// Animated hero image slider with auto-play and manual navigation
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const slides = [
  {
    title: 'Krushnakala Hi-Tech Nursery',
    subtitle: 'Govt. Approved — Premium Plants at Wholesale Rates',
    cta: 'Shop Now',
    link: '/products',
    gradient: 'from-primary via-primary-light to-accent',
    emoji: '🌿',
  },
  {
    title: 'Alphonso & Kesar Mango',
    subtitle: 'Premium Grafted Mango Saplings — Ready to Plant',
    cta: 'Shop Fruit Plants',
    link: '/products?category=Fruit+Plants',
    gradient: 'from-orange-500 via-amber-500 to-yellow-400',
    emoji: '🥭',
  },
  {
    title: 'Vegetable Seedlings',
    subtitle: 'Tomato, Brinjal, Cabbage, Cauliflower & More',
    cta: 'Shop Vegetables',
    link: '/products?category=Vegetable+Plants',
    gradient: 'from-green-600 via-emerald-500 to-lime-400',
    emoji: '🥬',
  },
  {
    title: 'Bulk Orders Welcome',
    subtitle: 'Special Wholesale Prices for Farmers & Orchards',
    cta: 'Contact Us',
    link: '/products',
    gradient: 'from-accent via-primary-light to-primary',
    emoji: '👨‍🌾',
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), []);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className={`bg-gradient-to-br ${slide.gradient} text-white py-20 md:py-32 px-4`}
        >
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center md:text-left flex-1"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-lg md:text-2xl mb-8 opacity-90 font-light">{slide.subtitle}</p>
              <Link
                to={slide.link}
                className="inline-block bg-white text-primary font-bold px-10 py-4 rounded-full text-lg hover:bg-accent-light hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                {slide.cta} →
              </Link>
            </motion.div>
            <motion.div
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-[8rem] md:text-[12rem] drop-shadow-2xl"
            >
              {slide.emoji}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/40 transition text-xl"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/40 transition text-xl"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === current ? 'bg-white w-8' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
