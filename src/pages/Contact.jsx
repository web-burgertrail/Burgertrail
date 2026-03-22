import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStoreTimer } from '../hooks/useStoreTimer';

function LiveStatus() {
  const { isOpen, formatted } = useStoreTimer();
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-heading font-medium ${
      isOpen ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-orange-primary/20 text-orange-primary border border-orange-primary/30'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-green-400 animate-pulse' : 'bg-orange-primary'}`}/>
      {isOpen
        ? <>OPEN NOW · Closes in <span className="font-bold tracking-widest">{formatted}</span></>
        : <>CLOSED · Opens in <span className="font-bold tracking-widest">{formatted}</span></>
      }
    </div>
  );
}

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [locError, setLocError] = useState(false);
  const [manualAddress, setManualAddress] = useState('');

  const handleOrder = () => {
    setLoading(true); setLocError(false);
    if (!navigator.geolocation) { setLoading(false); setLocError(true); return; }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const link = `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`;
        window.open(`https://wa.me/919281410305?text=${encodeURIComponent(`Hello Burger Trails! 👋\n\nI want to place an order.\n\n📍 My Location:\n${link}`)}`, '_blank');
        setLoading(false);
      },
      () => { setLoading(false); setLocError(true); },
      { timeout: 10000 }
    );
  };

  const SOCIAL_LINKS = [
    {
      label: 'WhatsApp',
      href: 'https://wa.me/919281410305',
      bg: '#25D366',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>,
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/burgertrails',
      bgGradient: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
    },
    {
      label: 'Facebook',
      href: '#',
      bg: '#1877F2',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
    },
    {
      label: 'YouTube',
      href: '#',
      bg: '#FF0000',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
    },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
      className="min-h-screen pb-20" style={{ paddingTop: '7.8rem' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="text-orange-primary font-heading tracking-widest text-sm uppercase mb-3">Get In Touch</p>
          <h1 className="font-display text-6xl sm:text-8xl tracking-widest text-white">FIND <span className="text-orange-primary">US</span></h1>
          <p className="text-white/40 font-body mt-3 text-sm">Come visit us or order via WhatsApp — always fresh.</p>
        </motion.div>

        {/* ── SOCIAL ICONS at top ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex justify-center gap-4 mb-12">
          {SOCIAL_LINKS.map(({ label, href, bg, bgGradient, icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              title={label} aria-label={label}
              className="flex flex-col items-center gap-2 group"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                style={{ background: bgGradient || bg }}
              >
                {icon}
              </div>
              <span className="text-white/40 text-xs font-body group-hover:text-white/70 transition-colors">{label}</span>
            </a>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: Info */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4">

            {/* Location — click to open map */}
            <a
              href="https://maps.google.com/?q=Upperpally+Hyderabad+Telangana"
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-xl px-5 py-4 flex gap-4 items-center hover:border-orange-primary/40 transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 bg-orange-primary/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-orange-primary/30 transition-colors">
                <svg className="w-5 h-5 text-orange-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-heading font-semibold text-white text-sm">Locate Us</p>
                <p className="text-white/50 font-body text-xs mt-0.5">Upperpally, Hyderabad · Telangana 500048</p>
              </div>
              <svg className="w-4 h-4 text-white/30 group-hover:text-orange-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>

            {/* Opening Hours + Live Status */}
            <div className="glass rounded-xl px-5 py-4 flex gap-4 items-start hover:border-white/15 transition-all">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <p className="font-heading font-semibold text-white text-sm mb-2">Opening Hours</p>
                <p className="text-white/50 font-body text-xs">Mon – Fri: <span className="text-orange-primary">3 PM – 3 AM</span></p>
                <p className="text-white/50 font-body text-xs">Sat – Sun: <span className="text-orange-primary">2 PM – 3 AM</span></p>
                <div className="mt-3">
                  <LiveStatus />
                </div>
              </div>
            </div>

            {/* Pre-order box */}
            <div className="glass-orange rounded-xl px-5 py-4">
              <p className="font-heading font-semibold text-white text-sm mb-1">Place Your Order</p>
              <p className="text-white/40 font-body text-xs mb-4">We'll get it ready before you arrive.</p>
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={handleOrder} disabled={loading}
                className="w-full bg-orange-primary hover:bg-orange-light text-white py-3 rounded-full font-heading font-medium tracking-wide transition-all glow-orange flex items-center justify-center gap-2 text-sm disabled:opacity-70"
              >
                {loading ? (
                  <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Getting Location...</>
                ) : (
                  <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>Order Now</>
                )}
              </motion.button>
              {locError && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-3 space-y-2">
                  <p className="text-orange-primary text-xs font-body">Location denied. Enter your address:</p>
                  <input type="text" value={manualAddress} onChange={e => setManualAddress(e.target.value)} placeholder="Area, landmark, street..."
                    className="w-full bg-dark-700 border border-white/10 rounded-lg px-3 py-2 text-white text-xs font-body placeholder-white/30 focus:outline-none focus:border-orange-primary"/>
                  <button onClick={() => window.open(`https://wa.me/919281410305?text=${encodeURIComponent(`Hello Burger Trails! 👋\n\n📍 Address:\n${manualAddress}`)}`, '_blank')}
                    className="w-full glass py-2.5 rounded-full text-xs font-heading font-medium hover:text-green-400 hover:border-green-500/40 transition-all text-white/60">
                    Send on WhatsApp
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Right: Google Map */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="rounded-2xl overflow-hidden border border-white/10 min-h-[380px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.042!2d78.3892!3d17.3375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96c0a21b6697%3A0xfbaadb4ebdf1c4de!2sUpperpally%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              className="w-full h-full min-h-[380px]"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              title="Burger Trails Location"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
