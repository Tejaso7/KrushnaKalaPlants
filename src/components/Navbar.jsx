// components/Navbar.jsx
// Professional e-commerce navbar with mega menu, search, and mobile drawer
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DarkModeToggle from './DarkModeToggle';
import { Apple, LeafyGreen, Flame, Flower2, Palmtree, Wheat, ShoppingCart, Settings, Package, Home, ShoppingBag, Menu, X, Search, ChevronDown, LogOut, User, ChevronRight } from 'lucide-react';

const categories = [
  { name: 'Fruit Plants', icon: <Apple size={18} />, link: '/products?category=Fruit+Plants', desc: 'Mango, Guava, Pomegranate' },
  { name: 'Vegetable Plants', icon: <LeafyGreen size={18} />, link: '/products?category=Vegetable+Plants', desc: 'Tomato, Brinjal, Cabbage' },
  { name: 'Spice Plants', icon: <Flame size={18} />, link: '/products?category=Spice+Plants', desc: 'Ginger, Curry Leaf, Mirchi' },
  { name: 'Flowering & Ornamental', icon: <Flower2 size={18} />, link: '/products?category=Flowering+%26+Ornamental', desc: 'Roses, Jasmine, Lily' },
  { name: 'Plantation Crops', icon: <Palmtree size={18} />, link: '/products?category=Plantation+Crops', desc: 'Coconut, Date Palm' },
  { name: 'Other Crops', icon: <Wheat size={18} />, link: '/products?category=Other+Crops', desc: 'Dragon Fruit, Chikoo' },
];

const Navbar = ({ dark, setDark }) => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const megaRef = useRef(null);

  const handleLogout = () => { logout(); navigate('/login'); };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) setMegaOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <img src="/logo.png" alt="KrishnaKala Plants" className="h-9 w-9 rounded-lg object-cover" />
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-primary-dark leading-none block">KrishnaKala</span>
              <span className="text-[10px] text-text-muted font-medium tracking-wider uppercase">Plants</span>
            </div>
          </Link>

          {/* Search bar — desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-6">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search plants, seeds, saplings..."
                className="w-full bg-bg-warm border border-border rounded-lg pl-10 pr-4 py-2 text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
              />
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            </div>
          </form>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-text">
            <Link to="/" className="px-3 py-2 rounded-lg hover:bg-bg-warm hover:text-primary transition-colors">Home</Link>

            {/* Shop dropdown */}
            <div ref={megaRef} className="relative">
              <button
                onClick={() => setMegaOpen(!megaOpen)}
                onMouseEnter={() => setMegaOpen(true)}
                className="px-3 py-2 rounded-lg hover:bg-bg-warm hover:text-primary transition-colors flex items-center gap-1"
              >
                Shop <ChevronDown className={`w-3.5 h-3.5 transition-transform ${megaOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {megaOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    onMouseLeave={() => setMegaOpen(false)}
                    className="absolute top-full left-0 mt-1 w-[380px] bg-bg-card border border-border rounded-xl shadow-xl p-2"
                  >
                    <Link to="/products" onClick={() => setMegaOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary-light transition mb-1">
                      <ShoppingBag size={15} /> View All Plants
                    </Link>
                    {categories.map((cat) => (
                      <Link
                        key={cat.name}
                        to={cat.link}
                        onClick={() => setMegaOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-bg-warm transition-colors group"
                      >
                        <span className="w-8 h-8 rounded-lg bg-primary/8 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">{cat.icon}</span>
                        <div>
                          <p className="text-sm font-medium text-text">{cat.name}</p>
                          <p className="text-xs text-text-muted">{cat.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {user && (
              <Link to="/cart" className="px-3 py-2 rounded-lg hover:bg-bg-warm hover:text-primary transition-colors relative flex items-center gap-1">
                <ShoppingCart size={16} /> Cart
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 left-6 bg-badge-sale text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link to="/admin" className="px-3 py-2 rounded-lg hover:bg-bg-warm hover:text-primary transition-colors flex items-center gap-1"><Settings size={15} /> Admin</Link>
            )}
            {user && (
              <Link to="/orders" className="px-3 py-2 rounded-lg hover:bg-bg-warm hover:text-primary transition-colors flex items-center gap-1"><Package size={15} /> Orders</Link>
            )}
          </nav>

          {/* Right side: auth + dark mode */}
          <div className="hidden lg:flex items-center gap-2">
            <DarkModeToggle dark={dark} setDark={setDark} />
            {user ? (
              <div className="flex items-center gap-2 ml-1">
                <span className="text-text-light text-sm flex items-center gap-1"><User size={14} /> {user.name}</span>
                <button onClick={handleLogout} className="text-sm font-medium text-text-light hover:text-primary transition flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-bg-warm">
                  <LogOut size={14} /> Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-1">
                <Link to="/login" className="text-sm font-medium text-text hover:text-primary transition px-3 py-1.5 rounded-lg hover:bg-bg-warm">Login</Link>
                <Link to="/register" className="text-sm font-semibold bg-primary text-white px-4 py-1.5 rounded-lg hover:bg-primary-light transition">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile: search + dark mode + hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <DarkModeToggle dark={dark} setDark={setDark} />
            {user && (
              <Link to="/cart" className="relative p-2">
                <ShoppingCart size={20} className="text-text" />
                {cartCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-badge-sale text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{cartCount}</span>
                )}
              </Link>
            )}
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-text" aria-label="Toggle menu">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMenuOpen(false)} className="fixed inset-0 bg-black/40 z-40 lg:hidden" />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-80 bg-bg-card z-50 lg:hidden flex flex-col overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="text-lg font-bold text-primary-dark">Menu</span>
                <button onClick={() => setMenuOpen(false)} className="p-1"><X size={22} className="text-text-light" /></button>
              </div>

              {/* Mobile search */}
              <form onSubmit={(e) => { handleSearch(e); setMenuOpen(false); }} className="px-4 pt-4">
                <div className="relative">
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search plants..."
                    className="w-full bg-bg-warm border border-border rounded-lg pl-9 pr-4 py-2 text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                </div>
              </form>

              <div className="flex flex-col p-4 gap-0.5">
                {[
                  { to: '/', label: 'Home', icon: <Home size={17} /> },
                  { to: '/products', label: 'All Plants', icon: <ShoppingBag size={17} /> },
                  ...(user ? [{ to: '/cart', label: `Cart${cartCount > 0 ? ` (${cartCount})` : ''}`, icon: <ShoppingCart size={17} /> }] : []),
                  ...(user ? [{ to: '/orders', label: 'My Orders', icon: <Package size={17} /> }] : []),
                  ...(user?.role === 'admin' ? [{ to: '/admin', label: 'Admin Panel', icon: <Settings size={17} /> }] : []),
                ].map((item) => (
                  <Link key={item.to} to={item.to} onClick={() => setMenuOpen(false)}
                    className="py-2.5 px-3 rounded-lg hover:bg-bg-warm transition-colors font-medium text-sm flex items-center gap-2.5 text-text">
                    <span className="text-text-light">{item.icon}</span> {item.label}
                  </Link>
                ))}

                {/* Categories */}
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs uppercase tracking-wider text-text-muted mb-2 px-3 font-semibold">Categories</p>
                  {categories.map((cat) => (
                    <Link key={cat.name} to={cat.link} onClick={() => setMenuOpen(false)}
                      className="py-2 px-3 rounded-lg hover:bg-bg-warm transition-colors text-sm flex items-center justify-between text-text">
                      <span className="flex items-center gap-2.5"><span className="text-primary">{cat.icon}</span> {cat.name}</span>
                      <ChevronRight size={14} className="text-text-muted" />
                    </Link>
                  ))}
                </div>

                {/* Auth */}
                <div className="mt-auto pt-4 border-t border-border mt-4">
                  {user ? (
                    <div>
                      <p className="text-sm text-text-light mb-2 px-3 flex items-center gap-1"><User size={14} /> {user.name}</p>
                      <button onClick={() => { handleLogout(); setMenuOpen(false); }}
                        className="w-full py-2.5 text-sm font-medium text-badge-sale hover:bg-red-50 rounded-lg transition flex items-center justify-center gap-1">
                        <LogOut size={15} /> Logout
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Link to="/login" onClick={() => setMenuOpen(false)} className="py-2.5 text-center rounded-lg border border-border text-sm font-medium hover:bg-bg-warm transition">Login</Link>
                      <Link to="/register" onClick={() => setMenuOpen(false)} className="py-2.5 text-center bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-light transition">Register</Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
