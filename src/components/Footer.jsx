// components/Footer.jsx
// Premium footer with newsletter, social links, and branding
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Leaf, Instagram, Facebook, Twitter, MapPin, Check, User, Phone, Send } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer className="bg-primary-dark text-white mt-16">
      {/* Newsletter */}
      <div className="bg-gradient-to-r from-primary to-accent py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold mb-2 flex items-center justify-center gap-2">
            <Leaf size={28} /> Join the KrishnaKala Plants Family
          </h3>
          <p className="text-accent-light/80 mb-6">Get wholesale rates, seasonal updates, and new plant availability alerts.</p>
          {subscribed ? (
            <motion.p initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-accent-light font-bold text-lg flex items-center justify-center gap-2">
              <Check size={20} /> Thank you for subscribing!
            </motion.p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-full text-primary-dark focus:outline-none focus:ring-2 focus:ring-accent-light"
              />
              <button type="submit" className="bg-white text-primary font-bold px-8 py-3 rounded-full hover:bg-accent-light hover:text-white transition-all shadow-md flex items-center justify-center gap-2">
                <Send size={16} /> Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="md:col-span-1">
          <h3 className="text-2xl font-extrabold mb-3 flex items-center gap-2">
            <img src="/logo.png" alt="KrishnaKala Plants Logo" className="h-10 w-10 rounded-full object-cover" /> KrishnaKala Plants
          </h3>
          <p className="text-sm text-accent-light/80 leading-relaxed">
            KrishnaKala Plants (Govt. Approved) — Premium wholesale nursery supplying fruit plants, vegetable seedlings, spice crops & ornamental plants across Maharashtra.
          </p>
          {/* Social icons */}
          <div className="flex gap-3 mt-4">
            {[
              { icon: <Instagram size={18} />, label: 'Instagram' },
              { icon: <Facebook size={18} />, label: 'Facebook' },
              { icon: <Twitter size={18} />, label: 'Twitter' },
              { icon: <MapPin size={18} />, label: 'Location' },
            ].map((social, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition" aria-label={social.label}>
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-accent-light/80">
            {[
              { to: '/', label: 'Home' },
              { to: '/products', label: 'All Plants' },
              { to: '/products?category=Fruit+Plants', label: 'Fruit Plants' },
              { to: '/products?category=Vegetable+Plants', label: 'Vegetable Plants' },
              { to: '/products?category=Spice+Plants', label: 'Spice Plants' },
            ].map((link) => (
              <li key={link.to}><Link to={link.to} className="hover:text-white transition">{link.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-bold text-lg mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-accent-light/80">
            <li><a href="#" className="hover:text-white transition">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition">Shipping Info</a></li>
            <li><a href="#" className="hover:text-white transition">Returns</a></li>
            <li><a href="#" className="hover:text-white transition">Plant Care Guide</a></li>
            <li><a href="#" className="hover:text-white transition">FAQs</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-lg mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm text-accent-light/80">
            <li className="flex items-start gap-2"><User size={16} className="mt-0.5 flex-shrink-0" /> <span><strong>Vitthal Krishna Bandgar</strong><br/><span className="flex items-center gap-1"><Phone size={12} /> <a href="tel:8999539204" className="hover:text-white">8999539204</a></span></span></li>
            <li className="flex items-start gap-2"><User size={16} className="mt-0.5 flex-shrink-0" /> <span><strong>Atharva Vitthal Bandgar</strong><br/><span className="flex items-center gap-1"><Phone size={12} /> <a href="tel:7058151143" className="hover:text-white">7058151143</a></span></span></li>
            <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 flex-shrink-0" /> <span>Balajinagar (Bhaubadi), Nhavsd Road,<br/>Malshiras, Tal. Malshiras,<br/>Dist. Solapur — 413107,<br/>Maharashtra, India</span></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 text-center py-5 text-xs text-accent-light/60">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} KrishnaKala Plants. All rights reserved. (Govt. Approved)</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
