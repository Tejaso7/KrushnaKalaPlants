// components/Navbar.jsx
// Premium mega-menu navbar with mobile drawer, dark mode toggle, cart badge
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DarkModeToggle from './DarkModeToggle';
import { Apple, LeafyGreen, Flame, Flower2, Palmtree, Wheat, ShoppingCart, Settings, Package, Home, ShoppingBag, Menu, X, Leaf, ChevronDown, LogOut, User } from 'lucide-react';

const categories = [
  { name: 'Fruit Plants', icon: <Apple size={20} />, link: '/products?category=Fruit+Plants' },
  { name: 'Vegetable Plants', icon: <LeafyGreen size={20} />, link: '/products?category=Vegetable+Plants' },
  { name: 'Spice Plants', icon: <Flame size={20} />, link: '/products?category=Spice+Plants' },
  { name: 'Flowering & Ornamental', icon: <Flower2 size={20} />, link: '/products?category=Flowering+%26+Ornamental' },
  { name: 'Plantation Crops', icon: <Palmtree size={20} />, link: '/products?category=Plantation+Crops' },
  { name: 'Other Crops', icon: <Wheat size={20} />, link: '/products?category=Other+Crops' },
];

const Navbar = ({ dark, setDark }) => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Close mega menu on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) setMegaOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-primary/95 backdrop-blur-md text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold tracking-tight flex items-center gap-2 hover:scale-105 transition-transform">
          <img src="/logo.png" alt="KrishnaKala Plants Logo" className="h-10 w-10 rounded-full object-cover" />
          <span className="bg-gradient-to-r from-white to-accent-light bg-clip-text text-transparent">KrishnaKala Plants</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1 text-sm font-medium">
          <Link to="/" className="px-4 py-2 rounded-xl hover:bg-white/10 transition-all">Home</Link>

          {/* Shop with mega dropdown */}
          <div ref={megaRef} className="relative">
            <button
              onClick={() => setMegaOpen(!megaOpen)}
              onMouseEnter={() => setMegaOpen(true)}
              className="px-4 py-2 rounded-xl hover:bg-white/10 transition-all flex items-center gap-1"
            >
              Shop
              <ChevronDown className={`w-4 h-4 transition-transform ${megaOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {megaOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  onMouseLeave={() => setMegaOpen(false)}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[520px] bg-white rounded-2xl shadow-2xl p-6 grid grid-cols-3 gap-3 text-primary-dark"
                >
                  <Link to="/products" onClick={() => setMegaOpen(false)} className="col-span-3 text-center bg-gradient-to-r from-primary to-accent text-white rounded-xl px-4 py-3 font-bold hover:opacity-90 transition mb-2 flex items-center justify-center gap-2">
                    <ShoppingCart size={16} /> Browse All Plants
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat.name}
                      to={cat.link}
                      onClick={() => setMegaOpen(false)}
                      className="flex items-center gap-2 px-3 py-3 rounded-xl hover:bg-bg transition-all text-sm font-medium"
                    >
                      <span className="text-primary">{cat.icon}</span>
                      <span>{cat.name}</span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {user && (
            <Link to="/cart" className="px-4 py-2 rounded-xl hover:bg-white/10 transition-all relative">
              <span className="flex items-center gap-1">
                <ShoppingCart size={16} /> Cart
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-badge-sale text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </span>
            </Link>
          )}

          {user && user.role === 'admin' && (
            <Link to="/admin" className="px-4 py-2 rounded-xl hover:bg-white/10 transition-all flex items-center gap-1"><Settings size={16} /> Admin</Link>
          )}

          {user && (
            <Link to="/orders" className="px-4 py-2 rounded-xl hover:bg-white/10 transition-all flex items-center gap-1"><Package size={16} /> Orders</Link>
          )}
        </div>

        {/* Right side: auth + dark mode */}
        <div className="hidden lg:flex items-center gap-3">
          <DarkModeToggle dark={dark} setDark={setDark} />
          {user ? (
            <div className="flex items-center gap-3 ml-2">
              <span className="text-accent-light text-sm font-medium flex items-center gap-1"><User size={14} /> {user.name}</span>
              <button onClick={handleLogout} className="bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-primary transition-all flex items-center gap-1">
                <LogOut size={14} /> Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 ml-2">
              <Link to="/login" className="px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/10 transition-all">Login</Link>
              <Link to="/register" className="bg-white text-primary px-5 py-2 rounded-full text-sm font-bold hover:bg-accent-light hover:text-white transition-all shadow-md">
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-3 lg:hidden">
          <DarkModeToggle dark={dark} setDark={setDark} />
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none" aria-label="Toggle menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-80 bg-primary-dark z-50 lg:hidden flex flex-col overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <span className="text-xl font-bold flex items-center gap-2"><Leaf size={20} /> Menu</span>
                <button onClick={() => setMenuOpen(false)}><X size={24} /></button>
              </div>
              <div className="flex flex-col p-6 gap-2">
                {[
                  { to: '/', label: 'Home', icon: <Home size={18} /> },
                  { to: '/products', label: 'Shop All', icon: <ShoppingBag size={18} /> },
                  ...(user ? [{ to: '/cart', label: `Cart${cartCount > 0 ? ` (${cartCount})` : ''}`, icon: <ShoppingCart size={18} /> }] : []),
                  ...(user ? [{ to: '/orders', label: 'My Orders', icon: <Package size={18} /> }] : []),
                  ...(user?.role === 'admin' ? [{ to: '/admin', label: 'Admin', icon: <Settings size={18} /> }] : []),
                ].map((item) => (
                  <Link key={item.to} to={item.to} onClick={() => setMenuOpen(false)}
                    className="py-3 px-4 rounded-xl hover:bg-white/10 transition-all font-medium flex items-center gap-2">
                    {item.icon} {item.label}
                  </Link>
                ))}
                {/* Categories in drawer */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-xs uppercase tracking-wider text-accent-light mb-3">Categories</p>
                  {categories.map((cat) => (
                    <Link key={cat.name} to={cat.link} onClick={() => setMenuOpen(false)}
                      className="py-2 px-4 rounded-xl hover:bg-white/10 transition-all text-sm flex items-center gap-2">
                      {cat.icon} {cat.name}
                    </Link>
                  ))}
                </div>
                {/* Auth */}
                <div className="mt-auto pt-6 border-t border-white/10 mt-6">
                  {user ? (
                    <button onClick={() => { handleLogout(); setMenuOpen(false); }}
                      className="w-full py-3 bg-white/10 rounded-xl font-semibold hover:bg-white/20 transition">
                      Logout
                    </button>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Link to="/login" onClick={() => setMenuOpen(false)}
                        className="py-3 text-center rounded-xl hover:bg-white/10 transition font-medium">Login</Link>
                      <Link to="/register" onClick={() => setMenuOpen(false)}
                        className="py-3 text-center bg-white text-primary rounded-xl font-bold hover:bg-accent-light hover:text-white transition">Register</Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
