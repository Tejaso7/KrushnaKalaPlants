// components/HeroSlider.jsx
// Professional hero slider with elegant transitions
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, Apple, LeafyGreen, Users, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const slides = [
  {
    title: 'Premium Plants at',
    titleHighlight: 'Wholesale Rates',
    subtitle: 'KrishnaKala Plants — Govt. Approved Hi-Tech Nursery serving 10,000+ farmers across Maharashtra',
    cta: 'Explore Collection',
    link: '/products',
    gradient: 'from-[#0C4D26] via-[#16713A] to-[#1E8E4A]',
    icon: <Leaf size={100} strokeWidth={0.8} />,
  },
  {
    title: 'Alphonso & Kesar',
    titleHighlight: 'Mango Saplings',
    subtitle: 'Premium grafted mango saplings ready to plant — guaranteed quality with government certification',
    cta: 'Shop Fruit Plants',
    link: '/products?category=Fruit+Plants',
    gradient: 'from-[#92400E] via-[#B45309] to-[#D97706]',
    icon: <Apple size={100} strokeWidth={0.8} />,
  },
  {
    title: 'Fresh Vegetable',
    titleHighlight: 'Seedlings',
    subtitle: 'Tomato, Brinjal, Cabbage, Cauliflower, Chili — healthy seedlings for maximum yield',
    cta: 'Shop Vegetables',
    link: '/products?category=Vegetable+Plants',
    gradient: 'from-[#065F46] via-[#047857] to-[#10B981]',
    icon: <LeafyGreen size={100} strokeWidth={0.8} />,
  },
  {
    title: 'Bulk Orders',
    titleHighlight: 'Welcome',
    subtitle: 'Special wholesale prices for farmers, orchards & nurseries. Free delivery across Maharashtra on bulk orders',
    cta: 'Get Wholesale Rates',
    link: '/products',
    gradient: 'from-[#1E3A26] via-[#16713A] to-[#2BAE66]',
    icon: <Users size={100} strokeWidth={0.8} />,
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`bg-gradient-to-br ${slide.gradient} text-white`}
        >
          <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 lg:py-28 flex flex-col md:flex-row items-center justify-between gap-8">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center md:text-left flex-1 max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-medium tracking-wide mb-5 border border-white/10">
                <span className="w-1.5 h-1.5 bg-accent-light rounded-full animate-pulse" />
                Govt. Approved Hi-Tech Nursery
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5">
                {slide.title}{' '}
                <span className="text-accent-light">{slide.titleHighlight}</span>
              </h1>
              <p className="text-base md:text-lg text-white/75 mb-8 leading-relaxed max-w-xl">{slide.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Link
                  to={slide.link}
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary-dark font-semibold px-7 py-3 rounded-lg text-sm hover:bg-accent-light hover:text-white transition-all duration-200 shadow-lg"
                >
                  {slide.cta} <ArrowRight size={16} />
                </Link>
                <Link to="/products" className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-medium px-7 py-3 rounded-lg text-sm hover:bg-white/10 transition-all duration-200">
                  View All Plants
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-white/10 hidden md:block"
            >
              {slide.icon}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/20 backdrop-blur-sm text-white w-10 h-10 rounded-lg flex items-center justify-center hover:bg-black/40 transition">
        <ChevronLeft size={20} />
      </button>
      <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/20 backdrop-blur-sm text-white w-10 h-10 rounded-lg flex items-center justify-center hover:bg-black/40 transition">
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-white w-6' : 'bg-white/30 w-2'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
