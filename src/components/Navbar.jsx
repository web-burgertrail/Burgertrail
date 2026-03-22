import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useStoreTimer } from '../hooks/useStoreTimer';

const NAV_TABS = [
  { path: '/', label: 'Home', icon: (a) => <svg className={`w-4 h-4 ${a ? 'text-orange-primary' : 'text-white/50'}`} fill={a ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg> },
  { path: '/menu', label: 'Menu', icon: (a) => <svg className={`w-4 h-4 ${a ? 'text-orange-primary' : 'text-white/50'}`} fill={a ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg> },
  { path: '/gallery', label: 'Gallery', icon: (a) => <svg className={`w-4 h-4 ${a ? 'text-orange-primary' : 'text-white/50'}`} fill={a ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg> },
  { path: '/about', label: 'About', icon: (a) => <svg className={`w-4 h-4 ${a ? 'text-orange-primary' : 'text-white/50'}`} fill={a ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> },
  { path: '/contact', label: 'Contact', icon: (a) => <svg className={`w-4 h-4 ${a ? 'text-orange-primary' : 'text-white/50'}`} fill={a ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg> },
  { path: '/order', label: 'Order', icon: (a) => <svg className={`w-4 h-4 ${a ? 'text-orange-primary' : 'text-white/50'}`} fill={a ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg> },
];

function StoreTimerBar() {
  const { isOpen, formatted } = useStoreTimer();
  return (
    <div className={`w-full py-1.5 px-4 text-center flex items-center justify-center gap-2 ${isOpen ? 'bg-green-900/50 border-b border-green-700/30' : 'bg-dark-800 border-b border-orange-primary/15'}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isOpen ? 'bg-green-400 animate-pulse' : 'bg-orange-primary/70'}`}/>
      <span className={`text-xs font-body ${isOpen ? 'text-green-300' : 'text-white/50'}`}>
        {isOpen
          ? <>We're Open! <strong className="text-white font-heading">Closes in</strong> <span className="text-green-400 font-heading font-bold tracking-widest">{formatted}</span></>
          : <>🌙 Sorry, we can't serve you right now. <span className="text-orange-primary font-heading font-semibold">Opens in <span className="tracking-widest">{formatted}</span></span></>
        }
      </span>
    </div>
  );
}

export default function Navbar() {
  const { count, openCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle home tab click — always scroll to top even if already on /
  const handleHomeClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-dark-900/97 backdrop-blur-xl">

      {/* Row 1: Timer */}
      <StoreTimerBar />

      {/* Row 2: Logo | Social icons + Cart + Order */}
      <div className="flex items-center justify-between px-3 sm:px-5 lg:px-10 py-2 border-b border-white/5">

        {/* Logo — with optional logo image */}
        <Link to="/" onClick={handleHomeClick} className="flex items-center gap-2 group flex-shrink-0">
          {/* Logo image — place your logo at /images/logo/logo.png */}
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border-2 border-orange-primary/60 flex items-center justify-center bg-dark-700 flex-shrink-0">
            <img
              src="/images/logo/logo.png"
              alt="BT"
              className="w-full h-full object-cover"
              onError={e => {
                e.target.parentElement.innerHTML = '<span class="text-orange-primary font-display text-xs font-bold">BT</span>';
              }}
            />
          </div>
          <span className="font-display leading-none" style={{ fontSize: 'clamp(0.88rem, 3.2vw, 1.1rem)' }}>
            <span className="text-white tracking-widest">BURGER </span>
            <span className="text-orange-primary tracking-widest">TRAILS</span>
          </span>
        </Link>

        {/* Right: icons */}
        <div className="flex items-center gap-1.5 sm:gap-2">

          {/* Instagram — small */}
          <a href="https://www.instagram.com/burgertrails" target="_blank" rel="noopener noreferrer"
            title="Instagram" aria-label="Instagram"
            className="w-7 h-7 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            style={{ background: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>

          {/* WhatsApp — small */}
          <a href="https://wa.me/919281410305" target="_blank" rel="noopener noreferrer"
            title="WhatsApp" aria-label="WhatsApp"
            className="w-7 h-7 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            style={{ background: '#25D366' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          </a>

          {/* Cart */}
          <button onClick={openCart} aria-label="Cart"
            className="relative flex items-center gap-1 glass px-2.5 py-1.5 rounded-full hover:border-orange-primary/40 transition-all group">
            <svg className="w-3.5 h-3.5 text-white/70 group-hover:text-orange-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
            <span className="text-white/60 text-xs font-body hidden sm:block group-hover:text-white transition-colors">Cart</span>
            {count > 0 && (
              <motion.span key={count} initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-orange-primary rounded-full text-[9px] font-bold flex items-center justify-center text-white">
                {count}
              </motion.span>
            )}
          </button>

          {/* Order Now — desktop */}
          <Link to="/order" className="hidden lg:flex items-center gap-1 bg-orange-primary hover:bg-orange-light text-white px-3.5 py-1.5 rounded-full font-heading font-medium text-xs tracking-wider uppercase transition-all glow-orange-sm hover:scale-105">
            Order Now
          </Link>
        </div>
      </div>

      {/* Row 3: Nav tabs — CENTERED on desktop */}
      <div className="border-b border-white/5 bg-dark-800/40">
        <div className="max-w-5xl mx-auto px-2">
          <div className="flex items-center justify-center sm:justify-center overflow-x-auto scrollbar-hide">
            {NAV_TABS.map(({ path, label, icon }) => {
              const active = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  onClick={path === '/' ? handleHomeClick : undefined}
                  className={`relative flex-shrink-0 flex flex-col sm:flex-row items-center gap-0.5 sm:gap-1.5 px-3 sm:px-5 py-2.5 text-xs font-heading font-medium tracking-wide uppercase transition-all whitespace-nowrap ${
                    active ? 'text-orange-primary' : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  {icon(active)}
                  <span className="text-[10px] sm:text-xs">{label}</span>
                  {active && (
                    <motion.span
                      layoutId="nav-ul"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-primary rounded-full"
                      transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
