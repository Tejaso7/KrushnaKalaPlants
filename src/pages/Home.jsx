// pages/Home.jsx
// Professional landing page
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import HeroSlider from '../components/HeroSlider';
import FlashSale from '../components/FlashSale';
import RecentlyViewed from '../components/RecentlyViewed';
import API from '../services/api';
import ProductCard from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/Skeleton';
import { Apple, LeafyGreen, Flame, Flower2, Palmtree, Wheat, Heart, Sprout, Building2, Star, ShieldCheck, Truck, Users, Phone, RefreshCw, ArrowRight, Quote } from 'lucide-react';

const categories = [
  { name: 'Fruit Plants', icon: <Apple size={28} />, desc: 'Mango, Guava, Pomegranate & more', color: 'bg-orange-50 text-orange-600' },
  { name: 'Vegetable Plants', icon: <LeafyGreen size={28} />, desc: 'Tomato, Brinjal, Cabbage seedlings', color: 'bg-green-50 text-green-600' },
  { name: 'Spice Plants', icon: <Flame size={28} />, desc: 'Ginger, Curry Leaf & Mirchi', color: 'bg-red-50 text-red-600' },
  { name: 'Flowering & Ornamental', icon: <Flower2 size={28} />, desc: 'Roses, Jasmine & decorative plants', color: 'bg-pink-50 text-pink-600' },
  { name: 'Plantation Crops', icon: <Palmtree size={28} />, desc: 'Coconut, Date Palm & more', color: 'bg-emerald-50 text-emerald-600' },
  { name: 'Other Crops', icon: <Wheat size={28} />, desc: 'Dragon Fruit, Chikoo & specialty', color: 'bg-amber-50 text-amber-600' },
];

const testimonials = [
  { name: 'Rajesh P.', text: 'Bought 500 Alphonso mango saplings from KrishnaKala Plants. Excellent quality, all plants survived transplanting. Best wholesale nursery in Solapur district!', rating: 5, location: 'Solapur' },
  { name: 'Sunita D.', text: 'Their pomegranate and guava plants are top-notch. Government approved nursery so you get guaranteed quality. Highly recommended for farmers.', rating: 5, location: 'Pune' },
  { name: 'Manoj K.', text: 'Great collection of vegetable seedlings. Tomato and brinjal plants were healthy and started fruiting quickly. Will order again for next season.', rating: 4, location: 'Sangli' },
];

const stats = [
  { label: 'Happy Farmers', value: '10,000+', icon: <Heart size={22} /> },
  { label: 'Plants Delivered', value: '5,00,000+', icon: <Sprout size={22} /> },
  { label: 'Districts Served', value: '30+', icon: <Building2 size={22} /> },
  { label: 'Years Experience', value: '15+', icon: <Star size={22} /> },
];

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      <HeroSlider />

      {/* Trust / Stats Bar */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3 justify-center md:justify-start"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/8 text-primary flex items-center justify-center flex-shrink-0">{s.icon}</div>
              <div>
                <p className="text-lg md:text-xl font-bold text-text leading-none">{s.value}</p>
                <p className="text-xs text-text-muted mt-0.5">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-text section-title">Shop by Category</h2>
          <p className="text-text-light text-sm mt-4">Browse our wide selection of nursery plants</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className="group bg-bg-card border border-border rounded-xl p-5 flex flex-col items-center text-center hover:border-primary/30 hover:shadow-md transition-all duration-200"
              >
                <div className={`w-14 h-14 rounded-xl ${cat.color} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                  {cat.icon}
                </div>
                <h3 className="font-semibold text-text text-sm leading-snug">{cat.name}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Flash Sale */}
      <FlashSale />

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-text">Featured Plants</h2>
            <p className="text-text-light text-sm mt-1">Top picks from our government-approved nursery</p>
          </div>
          <Link to="/products" className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-light transition">
            View All <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {loading
            ? [...Array(4)].map((_, i) => <ProductCardSkeleton key={i} />)
            : featured.map((product, i) => <ProductCard key={product._id} product={product} index={i} />)
          }
        </div>
        <div className="text-center mt-8 md:hidden">
          <Link to="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
            View All Plants <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-bg-warm py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-text section-title">Why Choose KrishnaKala Plants?</h2>
            <p className="text-text-light text-sm mt-4">Trusted by over 10,000 farmers across Maharashtra</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <ShieldCheck size={24} />, title: 'Govt. Approved Nursery', desc: 'Government certified hi-tech nursery ensuring quality, authenticity and healthy plants.' },
              { icon: <Sprout size={24} />, title: 'Wholesale Rates', desc: 'Buy directly from the nursery at best wholesale prices. Bulk orders welcome for farmers.' },
              { icon: <Truck size={24} />, title: 'Pan-Maharashtra Delivery', desc: 'We deliver across Maharashtra with safe packaging ensuring plants reach in perfect condition.' },
              { icon: <Users size={24} />, title: '15+ Years Experience', desc: 'Run by experienced horticulturists with deep knowledge of plant cultivation and care.' },
              { icon: <Phone size={24} />, title: 'Expert Guidance', desc: 'Free consultation on plant selection, planting techniques and crop management.' },
              { icon: <RefreshCw size={24} />, title: 'Healthy Plant Guarantee', desc: 'All plants are quality-checked. Replacement guaranteed for any damaged plants on delivery.' },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-bg-card border border-border rounded-xl p-5 hover:border-primary/20 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/8 text-primary flex items-center justify-center">{f.icon}</div>
                <h4 className="font-semibold mt-3 text-text">{f.title}</h4>
                <p className="text-text-light text-sm mt-1.5 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-text section-title">What Our Customers Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-bg-card border border-border rounded-xl p-6 relative"
            >
              <Quote size={20} className="text-primary/15 mb-3" />
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} className={j < t.rating ? 'text-gold fill-gold' : 'text-gray-200'} />
                ))}
              </div>
              <p className="text-text-light text-sm leading-relaxed">"{t.text}"</p>
              <div className="mt-4 pt-3 border-t border-border">
                <p className="font-semibold text-text text-sm">{t.name}</p>
                <p className="text-text-muted text-xs">{t.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <RecentlyViewed />

      {/* CTA Section */}
      <section className="bg-primary py-16 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">Ready to Grow?</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Join 10,000+ happy farmers. Get premium nursery plants at wholesale rates delivered to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/products" className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold px-7 py-3 rounded-lg text-sm hover:bg-accent-light hover:text-white transition-all">
              Shop Now <ArrowRight size={15} />
            </Link>
            <Link to="/register" className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-medium px-7 py-3 rounded-lg text-sm hover:bg-white/10 transition-all">
              Create Account
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
