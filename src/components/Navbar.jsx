import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/menu', label: 'Menu' },
  { path: '/about', label: 'About' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, openCart } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-dark-900/95 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/30'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-primary/60 group-hover:border-orange-primary transition-colors glow-orange-sm">
                <img
                  src="/images/logo/logo.png"
                  alt="Burger Trails"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<span class="flex items-center justify-center w-full h-full text-orange-primary font-display text-xl">BT</span>';
                  }}
                />
              </div>
              <div>
                <span className="font-display text-2xl tracking-widest text-white group-hover:text-orange-primary transition-colors">
                  BURGER
                </span>
                <span className="font-display text-2xl tracking-widest text-orange-primary ml-1">
                  TRAILS
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`font-heading font-medium text-sm tracking-widest uppercase transition-all duration-300 relative group ${
                    location.pathname === path
                      ? 'text-orange-primary'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-orange-primary transition-all duration-300 ${
                    location.pathname === path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Cart */}
              <button
                onClick={openCart}
                className="relative flex items-center gap-2 glass px-4 py-2 rounded-full hover:border-orange-primary/40 transition-all duration-300 group"
                aria-label="Open cart"
              >
                <svg className="w-5 h-5 text-white group-hover:text-orange-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="font-body text-sm text-white/80 group-hover:text-white transition-colors hidden sm:block">Cart</span>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-orange-primary rounded-full text-xs font-bold flex items-center justify-center text-white"
                  >
                    {count}
                  </motion.span>
                )}
              </button>

              {/* Order CTA */}
              <Link
                to="/order"
                className="hidden sm:flex items-center gap-2 bg-orange-primary hover:bg-orange-light text-white px-5 py-2.5 rounded-full font-heading font-medium text-sm tracking-wider uppercase transition-all duration-300 glow-orange hover:scale-105"
              >
                Order Now
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen(v => !v)}
                className="lg:hidden flex flex-col gap-1.5 p-2"
                aria-label="Toggle menu"
              >
                <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-dark-900/95 backdrop-blur-xl" onClick={() => setMenuOpen(false)} />
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-72 bg-dark-800 border-l border-white/5 p-8 flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="flex justify-end mb-10">
                <button onClick={() => setMenuOpen(false)} className="text-white/60 hover:text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col gap-6">
                {navLinks.map(({ path, label }, i) => (
                  <motion.div
                    key={path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      to={path}
                      className={`font-display text-3xl tracking-widest transition-colors ${
                        location.pathname === path ? 'text-orange-primary' : 'text-white/70 hover:text-white'
                      }`}
                    >
                      {label.toUpperCase()}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-auto">
                <Link
                  to="/order"
                  className="flex items-center justify-center gap-2 bg-orange-primary text-white px-6 py-3 rounded-full font-heading font-medium text-sm tracking-wider uppercase w-full glow-orange"
                >
                  Order Now
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
