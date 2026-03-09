// pages/Home.jsx
// Premium landing page with hero slider, flash sale, categories, testimonials, and CTAs
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import HeroSlider from '../components/HeroSlider';
import FlashSale from '../components/FlashSale';
import RecentlyViewed from '../components/RecentlyViewed';
import API from '../services/api';
import ProductCard from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/Skeleton';
import { Apple, LeafyGreen, Flame, Flower2, Palmtree, Wheat, Heart, Sprout, Building2, Star, ShieldCheck, Truck, Users, Phone, RefreshCw, ArrowRight } from 'lucide-react';

const categories = [
  { name: 'Fruit Plants', icon: <Apple size={40} />, desc: 'Alphonso Mango, Kesar Mango, Guava, Pomegranate & more', color: 'from-orange-400 to-orange-600' },
  { name: 'Vegetable Plants', icon: <LeafyGreen size={40} />, desc: 'Tomato, Brinjal, Cabbage, Cauliflower & Chili seedlings', color: 'from-green-400 to-green-600' },
  { name: 'Spice Plants', icon: <Flame size={40} />, desc: 'Ginger, Curry Leaf, Mirchi & aromatic spice crops', color: 'from-red-400 to-red-600' },
  { name: 'Flowering & Ornamental', icon: <Flower2 size={40} />, desc: 'Beautiful flowering & decorative plants for gardens', color: 'from-pink-400 to-pink-600' },
  { name: 'Plantation Crops', icon: <Palmtree size={40} />, desc: 'Coconut, Date Palm, Sugarcane & large-scale farming', color: 'from-emerald-400 to-emerald-600' },
  { name: 'Other Crops', icon: <Wheat size={40} />, desc: 'Khirni, Chikoo, Dragon Fruit & specialty plants', color: 'from-amber-400 to-amber-600' },
];

const testimonials = [
  { name: 'Rajesh P.', text: 'Bought 500 Alphonso mango saplings from Krushnakala. Excellent quality, all plants survived transplanting. Best wholesale nursery in Solapur district!', rating: 5 },
  { name: 'Sunita D.', text: 'Their pomegranate and guava plants are top-notch. Government approved nursery so you get guaranteed quality. Highly recommended for farmers.', rating: 5 },
  { name: 'Manoj K.', text: 'Great collection of vegetable seedlings. Tomato and brinjal plants were healthy and started fruiting quickly. Will order again for next season.', rating: 4 },
];

const stats = [
  { label: 'Happy Farmers', value: '10,000+', icon: <Heart size={28} className="text-primary" /> },
  { label: 'Plants Delivered', value: '5,00,000+', icon: <Sprout size={28} className="text-primary" /> },
  { label: 'Districts Served', value: '30+', icon: <Building2 size={28} className="text-primary" /> },
  { label: 'Years Experience', value: '15+', icon: <Star size={28} className="text-primary" /> },
];

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch some products for "Featured" section
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await API.get('/products');
        setFeatured(res.data.slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  // Stagger animation variants
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

  return (
    <div>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Stats Bar */}
      <section className="bg-bg-card shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-2">{s.icon}</div>
              <p className="text-2xl md:text-3xl font-extrabold text-primary-dark mt-1">{s.value}</p>
              <p className="text-xs text-text-light uppercase tracking-wider mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-dark text-center mb-3">Shop by Category</h2>
          <p className="text-text-light text-center mb-10">Premium nursery plants at wholesale rates for farmers & gardeners</p>
        </motion.div>
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <motion.div key={cat.name} variants={item}>
              <Link
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className="group bg-bg-card rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <div className="mb-3 text-primary group-hover:scale-110 transition-transform duration-300">{cat.icon}</div>
                <h3 className="font-bold text-primary-dark text-lg">{cat.name}</h3>
                <p className="text-text-light text-sm mt-1">{cat.desc}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Flash Sale */}
      <FlashSale />

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-dark text-center mb-3">Featured Plants</h2>
          <p className="text-text-light text-center mb-10">Top picks from our government-approved nursery</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {loading
            ? [...Array(4)].map((_, i) => <ProductCardSkeleton key={i} />)
            : featured.map((product, i) => <ProductCard key={product._id} product={product} index={i} />)
          }
        </div>
        {featured.length > 0 && (
          <div className="text-center mt-8">
            <Link to="/products" className="inline-flex items-center gap-2 bg-primary text-white font-bold px-10 py-3 rounded-full hover:bg-primary-light transition-all shadow-lg hover:shadow-xl hover:scale-105">
              View All Plants <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </section>

      {/* Why Choose Us */}
      <section className="bg-primary-dark text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-extrabold text-center mb-12">
            Why Choose Krushnakala?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <ShieldCheck size={36} />, title: 'Govt. Approved Nursery', desc: 'Government certified hi-tech nursery ensuring quality, authenticity and healthy plants.' },
              { icon: <Sprout size={36} />, title: 'Wholesale Rates', desc: 'Buy directly from the nursery at best wholesale prices. Bulk orders welcome for farmers.' },
              { icon: <Truck size={36} />, title: 'Pan-Maharashtra Delivery', desc: 'We deliver across Maharashtra. Safe packaging ensuring plants reach you in perfect condition.' },
              { icon: <Users size={36} />, title: '15+ Years Experience', desc: 'Run by experienced horticulturists with deep knowledge of plant cultivation and care.' },
              { icon: <Phone size={36} />, title: 'Expert Guidance', desc: 'Free consultation on plant selection, planting techniques and crop management.' },
              { icon: <RefreshCw size={36} />, title: 'Healthy Plant Guarantee', desc: 'All plants are quality-checked. Replacement guaranteed for any damaged plants on delivery.' },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="text-accent-light">{f.icon}</div>
                <h4 className="font-bold mt-3 text-lg">{f.title}</h4>
                <p className="text-accent-light/80 text-sm mt-2 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-extrabold text-primary-dark text-center mb-12">
          What Our Customers Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-bg-card rounded-2xl shadow-md p-6 relative"
            >
              <div className="flex gap-0.5 mb-2">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={16} className={j < t.rating ? 'text-gold fill-gold' : 'text-gray-300'} />
                ))}
              </div>
              <p className="text-text-light text-sm leading-relaxed italic">"{t.text}"</p>
              <p className="mt-4 font-bold text-primary-dark">— {t.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recently Viewed */}
      <RecentlyViewed />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary via-primary-light to-accent py-20 px-4 text-white text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Ready to Grow?</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Join 10,000+ happy farmers. Order premium nursery plants at wholesale rates from Krushnakala Hi-Tech Nursery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="inline-flex items-center justify-center gap-2 bg-white text-primary font-bold px-10 py-4 rounded-full text-lg hover:bg-accent-light hover:text-white transition-all shadow-xl hover:scale-105">
              Shop Now <ArrowRight size={18} />
            </Link>
            <Link to="/register" className="border-2 border-white text-white font-bold px-10 py-4 rounded-full text-lg hover:bg-white hover:text-primary transition-all">
              Create Account
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
