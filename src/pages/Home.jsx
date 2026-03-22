import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import menuData from '../data/menu.json';
import { CompactCard } from '../components/MenuCard';
import InstaReels from '../components/InstaReels';

// Unsplash hero slides — food photography
const HERO_SLIDES = [
  { url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1600&q=80', label: 'Classic Smash Burger' },
  { url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1600&q=80', label: 'Trails Special Pizza' },
  { url: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=1600&q=80', label: 'Chicken Alfredo' },
  { url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1600&q=80', label: 'Molten Lava Cake' },
];

function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-[#1a0800] to-dark-900" />
      <AnimatePresence mode="sync">
        <motion.div key={current} initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5, ease: 'easeInOut' }} className="absolute inset-0">
          <img src={HERO_SLIDES[current].url} alt="" className="w-full h-full object-cover" onError={e => { e.target.style.display = 'none'; }}/>
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/75 via-dark-900/50 to-dark-900" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark-900/60 to-transparent" />
    </div>
  );
}

function CountUp({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const endNum = parseInt(end);
        const startTime = performance.now();
        const step = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * endNum));
          if (progress < 1) requestAnimationFrame(step); else setCount(endNum);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function OrderNowButton() {
  const [loading, setLoading] = useState(false);
  const [locError, setLocError] = useState(false);
  const [manualAddress, setManualAddress] = useState('');

  const handleOrder = () => {
    setLoading(true); setLocError(false);
    if (!navigator.geolocation) { setLoading(false); setLocError(true); return; }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const link = `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`;
        window.open(`https://wa.me/919281410305?text=${encodeURIComponent(`Hello Burger Trails! 👋\n\nI'd like to place an order.\n\n📍 My Location:\n${link}`)}`, '_blank');
        setLoading(false);
      },
      () => { setLoading(false); setLocError(true); },
      { timeout: 10000 }
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={handleOrder} disabled={loading}
        className="flex items-center justify-center gap-3 bg-orange-primary hover:bg-orange-light text-white px-8 py-4 rounded-full font-heading font-medium text-base tracking-wider uppercase transition-all glow-orange disabled:opacity-70">
        {loading ? (
          <><svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Getting location...</>
        ) : (
          <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>ORDER NOW</>
        )}
      </motion.button>
      {locError && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-orange rounded-xl p-4 max-w-sm">
          <p className="text-orange-primary text-xs font-body mb-3">📍 Location denied. Enter your address:</p>
          <input type="text" value={manualAddress} onChange={e => setManualAddress(e.target.value)} placeholder="Area, landmark, street..." className="w-full bg-dark-700 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm font-body placeholder-white/30 focus:outline-none focus:border-orange-primary mb-3"/>
          <button onClick={() => window.open(`https://wa.me/919281410305?text=${encodeURIComponent(`Hello Burger Trails! 👋\n\nI want to order.\n\n📍 Address:\n${manualAddress}`)}`, '_blank')} className="w-full bg-orange-primary text-white py-2.5 rounded-lg text-sm font-heading font-medium">Send on WhatsApp</button>
        </motion.div>
      )}
    </div>
  );
}

const FEATURED_ITEMS = [
  menuData.burgers[0], menuData.burgers[1], menuData.pizza[0],
  menuData.wraps[0], menuData.desserts[0],
].filter(Boolean);

// Category quick-access — Swiggy-style circles
const QUICK_CATS = [
  { label: 'Burgers', icon: '🍔', path: '/menu', cat: 'burgers', bg: 'from-orange-primary/30 to-dark-700' },
  { label: 'Pizza', icon: '🍕', path: '/menu', cat: 'pizza', bg: 'from-red-600/30 to-dark-700' },
  { label: 'Wraps', icon: '🌯', path: '/menu', cat: 'wraps', bg: 'from-yellow-600/30 to-dark-700' },
  { label: 'Pasta', icon: '🍝', path: '/menu', cat: 'pasta', bg: 'from-amber-700/30 to-dark-700' },
  { label: 'Drinks', icon: '🥤', path: '/menu', cat: 'beverages', bg: 'from-blue-600/30 to-dark-700' },
  { label: 'Desserts', icon: '🍩', path: '/menu', cat: 'desserts', bg: 'from-purple-600/30 to-dark-700' },
];

export default function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <HeroSlideshow />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h1 className="font-display leading-none tracking-widest text-white" style={{ fontSize: 'clamp(3rem, 13vw, 8.5rem)' }}>
                BURGER TRAILS
              </h1>
            </motion.div>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="text-white/60 text-base sm:text-lg font-body mt-5 mb-10 max-w-md leading-relaxed">
              Crafted with fire, served with soul. Pre-order on WhatsApp — ready when you arrive.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="flex flex-col sm:flex-row gap-4">
              <OrderNowButton />
              <Link to="/menu" className="flex items-center justify-center gap-2 glass px-8 py-4 rounded-full font-heading font-medium text-base tracking-wider uppercase hover:border-orange-primary/40 hover:text-orange-primary transition-all">
                View Menu <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex gap-10 mt-14">
              {[{ number: '50', suffix: '+', label: 'Menu Items' }, { number: '3', suffix: 'PM', label: 'Opens Daily' }, { number: '3', suffix: 'AM', label: 'Closes At' }].map(({ number, suffix, label }) => (
                <div key={label}>
                  <p className="font-display text-3xl text-orange-primary tracking-wider"><CountUp end={number} suffix={suffix} /></p>
                  <p className="text-white/40 text-xs font-body tracking-wide mt-1">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center pt-2"><div className="w-1 h-2 bg-orange-primary rounded-full"/></div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="border-y border-orange-primary/20 bg-orange-primary/5 py-4 overflow-hidden">
        <div className="flex gap-12 animate-scroll-x whitespace-nowrap">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="flex items-center gap-12 flex-shrink-0">
              <span className="font-display text-2xl tracking-widest text-orange-primary">BITE THE BEST</span>
              <span className="text-orange-primary/40">✦</span>
              <span className="font-display text-2xl tracking-widest text-white/30">BURGER TRAILS</span>
              <span className="text-orange-primary/40">✦</span>
              <span className="font-display text-2xl tracking-widest text-orange-primary/60">OPEN TILL 3AM</span>
              <span className="text-orange-primary/40">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* QUICK CATEGORIES — Swiggy circles */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <h2 className="font-display text-4xl sm:text-5xl tracking-wider text-white">ORDER BY <span className="text-orange-primary">CATEGORY</span></h2>
        </motion.div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {QUICK_CATS.map(({ label, icon, path, bg }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
              <Link to={path} className="flex flex-col items-center gap-3 group">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${bg} flex items-center justify-center text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-300 border border-white/5`}>
                  {icon}
                </div>
                <span className="text-white/60 text-xs sm:text-sm font-heading tracking-wide group-hover:text-orange-primary transition-colors">{label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED PICKS */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-end justify-between mb-8">
          <div>
            <p className="text-orange-primary font-heading font-medium tracking-widest text-xs uppercase mb-2">Must Try</p>
            <h2 className="font-display text-4xl sm:text-5xl tracking-wider text-white">FEATURED <span className="text-orange-primary">PICKS</span></h2>
          </div>
          <Link to="/menu" className="hidden sm:flex items-center gap-1.5 text-white/40 hover:text-orange-primary text-sm font-heading tracking-wide transition-colors">
            See all <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          </Link>
        </motion.div>
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-3">
          {FEATURED_ITEMS.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className={i >= 3 ? 'hidden lg:block' : ''}>
              <CompactCard item={item} />
            </motion.div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link to="/menu" className="glass px-8 py-3 rounded-full font-heading font-medium tracking-wider text-sm uppercase hover:border-orange-primary/40 hover:text-orange-primary transition-all flex items-center gap-2">
            Full Menu <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </Link>
        </div>
      </section>

      {/* INSTA REELS */}
      <InstaReels />

      {/* ABOUT SNIPPET */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="absolute inset-0 bg-orange-primary/10 blur-3xl rounded-3xl"/>
              <div className="relative grid grid-cols-2 gap-3">
                {[
                  { src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80', cls: 'col-span-2 aspect-video' },
                  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80', cls: 'col-span-1 aspect-square' },
                  { src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&q=80', cls: 'col-span-1 aspect-square' },
                ].map(({ src, cls }, i) => (
                  <div key={i} className={`${cls} rounded-2xl overflow-hidden`}>
                    <img src={src} alt="Burger Trails ambience" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" onError={e => { e.target.parentElement.style.background = '#1A1A1A'; e.target.style.display = 'none'; }}/>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-orange-primary font-heading font-medium tracking-widest text-sm uppercase mb-4">Our Story</p>
              <h2 className="font-display text-5xl sm:text-6xl tracking-wider text-white mb-6">MORE THAN JUST <span className="text-orange-primary">FOOD</span></h2>
              <p className="text-white/50 font-body leading-relaxed mb-4">Born in the lively streets of Upperpally, Hyderabad, Burger Trails is where passion meets the plate. Crafted from scratch — finest ingredients, bold spice blends.</p>
              <p className="text-white/40 font-body text-sm leading-relaxed mb-8">Open every evening from 3 PM till 3 AM. Order online, come pick it up — hot and fresh when you walk in.</p>
              <Link to="/about" className="inline-flex items-center gap-2 text-orange-primary font-heading font-medium tracking-wider text-sm uppercase hover:gap-4 transition-all">
                Our Full Story <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative glass-orange rounded-3xl p-10 sm:p-14 text-center overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-primary to-transparent"/>
            <h2 className="font-display text-5xl sm:text-7xl tracking-widest text-white mb-4">HUNGRY? <span className="text-orange-primary">WE'RE OPEN.</span></h2>
            <p className="text-white/50 font-body mb-8 max-w-md mx-auto text-sm">Pre-order via WhatsApp. Pick it up — ready when you arrive.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/menu" className="bg-orange-primary hover:bg-orange-light text-white px-10 py-4 rounded-full font-heading font-medium tracking-wider uppercase transition-all glow-orange hover:scale-105">Browse Menu</Link>
              <a href="https://wa.me/919281410305" target="_blank" rel="noopener noreferrer" className="glass px-10 py-4 rounded-full font-heading font-medium tracking-wider uppercase hover:border-green-500/40 hover:text-green-400 transition-all">WhatsApp Us</a>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
