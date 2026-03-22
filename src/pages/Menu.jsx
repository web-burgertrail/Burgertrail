import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import menuData from '../data/menu.json';
import MenuCard from '../components/MenuCard';
import { useCart } from '../context/CartContext';

const CATEGORIES = Object.keys(menuData);

const CATEGORY_META = {
  burgers:   { icon: '🍔', label: 'Burgers' },
  wraps:     { icon: '🌯', label: 'Wraps' },
  pizza:     { icon: '🍕', label: 'Pizza' },
  pasta:     { icon: '🍝', label: 'Pasta' },
  beverages: { icon: '🥤', label: 'Beverages' },
  desserts:  { icon: '🍩', label: 'Desserts' },
};

function useIsMobile() {
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const h = () => setMobile(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return mobile;
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('burgers');
  const [search, setSearch] = useState('');
  const isMobile = useIsMobile();
  const { count, openCart, total } = useCart();

  const allItems = Object.values(menuData).flat();
  const isSearching = search.trim().length > 0;
  const items = isSearching
    ? allItems.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
    : menuData[activeCategory] || [];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="min-h-screen pt-16">

      {/* Page header */}
      <div className="bg-dark-800 border-b border-white/5 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-orange-primary font-heading tracking-widest text-xs uppercase mb-1">What are you craving?</p>
          <h1 className="font-display text-4xl sm:text-5xl tracking-widest text-white">OUR <span className="text-orange-primary">MENU</span></h1>
        </div>
      </div>

      {/* Search bar */}
      <div className="sticky top-16 z-30 bg-dark-900/95 backdrop-blur-xl border-b border-white/5 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto">
          <div className="relative max-w-lg">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search for dishes..."
              className="w-full bg-dark-700 border border-white/10 rounded-full pl-9 pr-8 py-2.5 text-white text-sm font-body placeholder-white/30 focus:outline-none focus:border-orange-primary transition-colors"
            />
            {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">✕</button>}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex">

        {/* Left sidebar — desktop only */}
        {!isMobile && (
          <div className="w-52 flex-shrink-0 sticky top-32 self-start h-[calc(100vh-8rem)] overflow-y-auto border-r border-white/5 py-4 hidden md:block">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setSearch(''); }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all ${
                  activeCategory === cat && !isSearching
                    ? 'bg-orange-primary/10 border-r-2 border-orange-primary text-orange-primary'
                    : 'text-white/50 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="text-xl flex-shrink-0">{CATEGORY_META[cat]?.icon}</span>
                <span className="font-heading font-medium text-sm tracking-wide">{CATEGORY_META[cat]?.label}</span>
                <span className="ml-auto text-xs text-white/20">{menuData[cat].length}</span>
              </button>
            ))}
          </div>
        )}

        {/* Mobile horizontal tabs */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-dark-900/98 backdrop-blur-xl border-t border-white/10 flex overflow-x-auto scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setSearch(''); }}
                className={`flex-shrink-0 flex flex-col items-center gap-0.5 px-4 py-2.5 transition-all ${
                  activeCategory === cat && !isSearching
                    ? 'text-orange-primary border-t-2 border-orange-primary'
                    : 'text-white/40'
                }`}
              >
                <span className="text-lg">{CATEGORY_META[cat]?.icon}</span>
                <span className="text-[10px] font-heading tracking-wide capitalize">{cat}</span>
              </button>
            ))}
          </div>
        )}

        {/* Right: Items */}
        <div className="flex-1 min-w-0 pb-24 md:pb-8">
          {/* Category heading */}
          {!isSearching && (
            <div className="px-4 sm:px-6 py-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{CATEGORY_META[activeCategory]?.icon}</span>
                <div>
                  <h2 className="font-heading font-bold text-white text-lg">{CATEGORY_META[activeCategory]?.label}</h2>
                  <p className="text-white/30 text-xs font-body">{items.length} items</p>
                </div>
              </div>
            </div>
          )}

          {isSearching && (
            <div className="px-4 sm:px-6 py-4 border-b border-white/5">
              <p className="text-white/50 text-sm font-body">
                {items.length} result{items.length !== 1 ? 's' : ''} for "<span className="text-orange-primary">{search}</span>"
              </p>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div key={activeCategory + search} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {items.length > 0 ? (
                <div className="divide-y divide-white/0">
                  {items.map(item => (
                    <div key={item.id} className="px-2 sm:px-4">
                      <MenuCard item={item} mobile={isMobile} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 px-4">
                  <span className="text-6xl">😕</span>
                  <p className="text-white/40 font-body mt-4">No items found</p>
                  <button onClick={() => setSearch('')} className="mt-4 text-orange-primary text-sm font-heading hover:underline">Clear search</button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Floating cart bar on mobile */}
      {count > 0 && isMobile && (
        <motion.div
          initial={{ y: 80 }} animate={{ y: 0 }}
          className="fixed bottom-14 left-3 right-3 z-50"
        >
          <button
            onClick={openCart}
            className="w-full bg-orange-primary text-white py-3.5 rounded-2xl flex items-center justify-between px-5 shadow-xl glow-orange"
          >
            <span className="bg-white/20 rounded-lg px-2 py-0.5 text-xs font-heading font-bold">{count} items</span>
            <span className="font-heading font-bold tracking-wide">View Cart</span>
            <span className="font-heading font-bold">₹{total}</span>
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
