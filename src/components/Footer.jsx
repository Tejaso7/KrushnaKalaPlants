// components/Footer.jsx
// Professional multi-column footer
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Leaf, Instagram, Facebook, Twitter, MapPin, Check, Phone, Send, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer className="bg-primary-dark text-white/90 mt-0">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Mail size={20} /> Subscribe to Our Newsletter
              </h3>
              <p className="text-white/50 text-sm mt-1">Get seasonal updates, offers and new plant alerts</p>
            </div>
            {subscribed ? (
              <motion.p initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-accent-light font-medium text-sm flex items-center gap-2">
                <Check size={16} /> Thank you for subscribing!
              </motion.p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"
                  className="flex-1 md:w-72 px-4 py-2.5 rounded-lg bg-white/10 border border-white/10 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition" />
                <button type="submit" className="bg-primary text-white font-medium px-5 py-2.5 rounded-lg hover:bg-primary-light transition text-sm flex items-center gap-1.5">
                  Subscribe <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main footer columns */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Brand */}
        <div className="md:col-span-4">
          <div className="flex items-center gap-2.5 mb-3">
            <img src="/logo.png" alt="KrishnaKala Plants" className="h-9 w-9 rounded-lg object-cover" />
            <div>
              <span className="text-lg font-bold text-white block leading-none">KrishnaKala Plants</span>
              <span className="text-[10px] text-white/40 font-medium tracking-wider uppercase">Govt. Approved Nursery</span>
            </div>
          </div>
          <p className="text-sm text-white/50 leading-relaxed mt-2">
            Premium wholesale nursery supplying fruit plants, vegetable seedlings, spice crops & ornamental plants across Maharashtra since 2010.
          </p>
          <div className="flex gap-2 mt-4">
            {[
              { icon: <Instagram size={16} />, label: 'Instagram' },
              { icon: <Facebook size={16} />, label: 'Facebook' },
              { icon: <Twitter size={16} />, label: 'Twitter' },
            ].map((social, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center hover:bg-white/15 transition" aria-label={social.label}>
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-2">
          <h4 className="font-semibold text-white text-sm mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/50">
            {[
              { to: '/', label: 'Home' },
              { to: '/products', label: 'All Plants' },
              { to: '/products?category=Fruit+Plants', label: 'Fruit Plants' },
              { to: '/products?category=Vegetable+Plants', label: 'Vegetables' },
              { to: '/products?category=Spice+Plants', label: 'Spice Plants' },
            ].map((link) => (
              <li key={link.to}><Link to={link.to} className="hover:text-white transition">{link.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div className="md:col-span-2">
          <h4 className="font-semibold text-white text-sm mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="#" className="hover:text-white transition">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition">Shipping Info</a></li>
            <li><a href="#" className="hover:text-white transition">Returns Policy</a></li>
            <li><a href="#" className="hover:text-white transition">Plant Care Guide</a></li>
            <li><a href="#" className="hover:text-white transition">FAQs</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="md:col-span-4">
          <h4 className="font-semibold text-white text-sm mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm text-white/50">
            <li className="flex items-start gap-2.5">
              <Phone size={14} className="mt-0.5 flex-shrink-0 text-white/30" />
              <div>
                <p className="text-white/70 font-medium">Prathamesh Vitthal Bandgar</p>
                <a href="tel:8788166143" className="hover:text-white transition">8788 166 143</a>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone size={14} className="mt-0.5 flex-shrink-0 text-white/30" />
              <div>
                <p className="text-white/70 font-medium">Atharva Vitthal Bandgar</p>
                <a href="tel:7058151143" className="hover:text-white transition">7058 151 143</a>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={14} className="mt-0.5 flex-shrink-0 text-white/30" />
              <span>Balajinagar (Bhamburdi), Mhaswad Road,<br/>Malshiras, Dist. Solapur — 413107,<br/>Maharashtra, India</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8 py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/35">
          <span>&copy; {new Date().getFullYear()} KrishnaKala Plants. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white/60 transition">Privacy Policy</a>
            <a href="#" className="hover:text-white/60 transition">Terms of Service</a>
            <a href="#" className="hover:text-white/60 transition">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
