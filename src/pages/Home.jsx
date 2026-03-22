import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import menuData from '../data/menu.json';
import MenuCard from '../components/MenuCard';
import InstaReels from '../components/InstaReels';

const HERO_PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 4,
  duration: Math.random() * 4 + 3,
}));

function HeroParticle({ p }) {
  return (
    <motion.div
      className="absolute rounded-full bg-orange-primary opacity-40"
      style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
      animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
      transition={{ repeat: Infinity, duration: p.duration, delay: p.delay, ease: 'easeInOut' }}
    />
  );
}

function LiveLocationButton() {
  const [loading, setLoading] = useState(false);
  const [locError, setLocError] = useState(false);
  const [manualAddress, setManualAddress] = useState('');

  const handleOrder = () => {
    setLoading(true);
    setLocError(false);

    if (!navigator.geolocation) {
      setLoading(false);
      setLocError(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        const msg = encodeURIComponent(
          `Hello Burger Trails! 👋\n\nI'd like to place an order.\n\n📍 My Location:\n${mapsLink}\n\nPlease send me your menu or confirm delivery availability.`
        );
        window.open(`https://wa.me/919281410305?text=${msg}`, '_blank');
        setLoading(false);
      },
      () => {
        setLoading(false);
        setLocError(true);
      },
      { timeout: 10000 }
    );
  };

  const handleManualOrder = () => {
    const addr = manualAddress.trim() || 'Not provided';
    const msg = encodeURIComponent(
      `Hello Burger Trails! 👋\n\nI'd like to place an order.\n\n📍 My Address:\n${addr}\n\nPlease confirm delivery availability.`
    );
    window.open(`https://wa.me/919281410305?text=${msg}`, '_blank');
  };

  return (
    <div className="flex flex-col items-start gap-3">
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleOrder}
        disabled={loading}
        className="flex items-center gap-3 bg-orange-primary hover:bg-orange-light text-white px-8 py-4 rounded-full font-heading font-medium text-base tracking-wider uppercase transition-all duration-300 glow-orange disabled:opacity-70"
      >
        {loading ? (
          <>
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Getting Location...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Order with Live Location
          </>
        )}
      </motion.button>

      {locError && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-orange rounded-xl p-4 w-full max-w-sm"
        >
          <p className="text-orange-primary text-xs font-body mb-3">
            📍 Location access denied. Enter your address manually:
          </p>
          <input
            type="text"
            value={manualAddress}
            onChange={(e) => setManualAddress(e.target.value)}
            placeholder="Your address, area, landmark..."
            className="w-full bg-dark-700 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm font-body placeholder-white/30 focus:outline-none focus:border-orange-primary mb-3"
          />
          <button
            onClick={handleManualOrder}
            className="w-full bg-orange-primary hover:bg-orange-light text-white py-2.5 rounded-lg text-sm font-heading font-medium tracking-wide transition-colors"
          >
            Send Order on WhatsApp
          </button>
        </motion.div>
      )}
    </div>
  );
}

// Featured items: top 3 burgers + 1 pizza
const FEATURED_ITEMS = [
  ...menuData.burgers.slice(0, 3),
  ...menuData.pizza.slice(0, 1),
  ...menuData.desserts.slice(0, 1),
  ...menuData.beverages.slice(1, 2),
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          {/* Background image (ambience) */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15"
            style={{ backgroundImage: 'url(/images/ambience/interior1.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900/80 via-dark-900/60 to-dark-900" />
          {/* Radial glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-primary/10 blur-[120px] rounded-full" />
        </div>

        {/* Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {HERO_PARTICLES.map(p => <HeroParticle key={p.id} p={p} />)}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0}
                className="flex items-center gap-3 mb-6"
              >
                <span className="w-8 h-0.5 bg-orange-primary" />
                <span className="font-heading text-orange-primary text-sm tracking-widest uppercase font-medium">
                  Upperpally, Hyderabad
                </span>
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}>
                <div className="overflow-hidden">
                  <h1 className="font-display text-7xl sm:text-8xl lg:text-9xl tracking-widest text-white leading-none">
                    BURGER
                  </h1>
                </div>
                <div className="overflow-hidden">
                  <h1 className="font-display text-7xl sm:text-8xl lg:text-9xl tracking-widest text-orange-primary leading-none text-glow">
                    TRAILS
                  </h1>
                </div>
              </motion.div>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
                className="text-white/50 text-lg font-body mt-6 mb-10 max-w-md leading-relaxed"
              >
                Crafted with fire, served with soul. Every item on our menu is a journey through bold flavours and premium ingredients.
              </motion.p>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={3}
                className="flex flex-col sm:flex-row gap-4"
              >
                <LiveLocationButton />
                <Link
                  to="/menu"
                  className="flex items-center gap-2 glass px-8 py-4 rounded-full font-heading font-medium text-base tracking-wider uppercase hover:border-orange-primary/40 hover:text-orange-primary transition-all duration-300"
                >
                  View Menu
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={4}
                className="flex gap-8 mt-14"
              >
                {[
                  { number: '50+', label: 'Menu Items' },
                  { number: '3PM', label: 'Opens Daily' },
                  { number: '3AM', label: 'Late Night' },
                ].map(({ number, label }) => (
                  <div key={label}>
                    <p className="font-display text-3xl text-orange-primary tracking-wider">{number}</p>
                    <p className="text-white/40 text-xs font-body tracking-wide mt-1">{label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Hero visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
              className="hidden lg:flex items-center justify-center"
            >
              <div className="relative">
                {/* Glow circle */}
                <div className="absolute inset-0 bg-orange-primary/20 blur-3xl rounded-full scale-110" />
                {/* Logo or hero image */}
                <div className="relative w-80 h-80 rounded-full overflow-hidden border-2 border-orange-primary/30 glow-orange">
                  <img
                    src="/images/logo/logo.png"
                    alt="Burger Trails"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-full flex flex-col items-center justify-center bg-dark-700">
                          <span style="font-size:8rem">🍔</span>
                        </div>`;
                    }}
                  />
                </div>
                {/* Floating chips */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  className="absolute -top-4 -right-4 glass-orange rounded-2xl px-4 py-3"
                >
                  <p className="font-display text-orange-primary text-lg">BITE THE BEST</p>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-4 -left-8 glass rounded-xl px-4 py-2"
                >
                  <p className="text-white/60 text-xs font-body">⭐ 4.9 Rating</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center pt-2">
            <div className="w-1 h-2 bg-orange-primary rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ─── TAGLINE MARQUEE ─── */}
      <div className="border-y border-orange-primary/20 bg-orange-primary/5 py-4 overflow-hidden">
        <div className="flex gap-12 animate-scroll-x whitespace-nowrap">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="flex items-center gap-12 flex-shrink-0">
              <span className="font-display text-2xl tracking-widest text-orange-primary">BITE THE BEST</span>
              <span className="text-orange-primary/40 text-lg">✦</span>
              <span className="font-display text-2xl tracking-widest text-white/30">BURGER TRAILS</span>
              <span className="text-orange-primary/40 text-lg">✦</span>
              <span className="font-display text-2xl tracking-widest text-orange-primary/60">OPEN TILL 3AM</span>
              <span className="text-orange-primary/40 text-lg">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── FEATURED ITEMS ─── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-orange-primary font-heading font-medium tracking-widest text-sm uppercase mb-3">
            Must Try
          </p>
          <div className="flex items-end justify-between">
            <h2 className="font-display text-5xl sm:text-6xl tracking-wider text-white">
              FEATURED <span className="text-orange-primary">PICKS</span>
            </h2>
            <Link
              to="/menu"
              className="hidden sm:flex items-center gap-2 text-white/50 hover:text-orange-primary text-sm font-heading tracking-wide transition-colors"
            >
              Full Menu
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {FEATURED_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={i < 3 ? 'col-span-1 md:col-span-1 lg:col-span-2' : 'col-span-1 md:col-span-1 lg:col-span-2'}
            >
              <MenuCard item={item} />
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/menu"
            className="glass px-8 py-3.5 rounded-full font-heading font-medium tracking-wider text-sm uppercase hover:border-orange-primary/40 hover:text-orange-primary transition-all duration-300 flex items-center gap-2"
          >
            Explore Full Menu
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ─── INSTA REELS ─── */}
      <InstaReels />

      {/* ─── ABOUT SNIPPET ─── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-orange-primary/10 blur-3xl rounded-3xl" />
              <div className="relative grid grid-cols-2 gap-3">
                {[
                  '/images/ambience/interior1.jpg',
                  '/images/ambience/exterior.jpg',
                  '/images/ambience/interior2.jpg',
                  '/images/menu/burgers/classic-chicken.jpg',
                ].map((src, i) => (
                  <div key={i} className={`rounded-2xl overflow-hidden aspect-square ${i === 0 ? 'col-span-2 aspect-video' : ''}`}>
                    <img
                      src={src}
                      alt="Burger Trails Ambience"
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.parentElement.style.background = '#1A1A1A';
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-orange-primary font-heading font-medium tracking-widest text-sm uppercase mb-4">
                Our Story
              </p>
              <h2 className="font-display text-5xl sm:text-6xl tracking-wider text-white mb-6">
                MORE THAN JUST <span className="text-orange-primary">FOOD</span>
              </h2>
              <p className="text-white/50 font-body text-base leading-relaxed mb-6">
                Born in the lively streets of Upperpally, Hyderabad, Burger Trails is where passion meets the plate. We craft each item from scratch — using the finest ingredients, bold spice blends, and a relentless commitment to quality.
              </p>
              <p className="text-white/40 font-body text-sm leading-relaxed mb-8">
                Open every evening from 3 PM until 3 AM, we serve the night owls, the foodies, and everyone in between who believes that great food is worth staying up for.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-orange-primary font-heading font-medium tracking-wider text-sm uppercase hover:gap-4 transition-all duration-300"
              >
                Our Full Story
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative glass-orange rounded-3xl p-12 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-primary/10 via-transparent to-orange-primary/10" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-primary to-transparent" />
            <div className="relative z-10">
              <h2 className="font-display text-5xl sm:text-7xl tracking-widest text-white mb-4">
                HUNGRY? <span className="text-orange-primary">WE'RE OPEN.</span>
              </h2>
              <p className="text-white/50 font-body text-base mb-8 max-w-lg mx-auto">
                Order right now via WhatsApp with your live location and get your food delivered fresh.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/menu"
                  className="bg-orange-primary hover:bg-orange-light text-white px-10 py-4 rounded-full font-heading font-medium tracking-wider uppercase transition-all duration-300 glow-orange hover:scale-105"
                >
                  Browse Menu
                </Link>
                <a
                  href="https://wa.me/919281410305"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass px-10 py-4 rounded-full font-heading font-medium tracking-wider uppercase hover:border-green-500/40 hover:text-green-400 transition-all duration-300"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
