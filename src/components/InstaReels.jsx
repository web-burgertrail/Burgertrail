import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const REELS = [
  { src: '/images/insta/reel1.mp4', poster: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80', label: 'Classic Smash' },
  { src: '/images/insta/reel2.mp4', poster: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80', label: 'Trails Special' },
  { src: '/images/insta/reel3.mp4', poster: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80', label: 'Lava Cake Drop' },
  { src: '/images/insta/reel4.mp4', poster: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80', label: 'Pizza Night' },
  { src: '/images/insta/reel5.mp4', poster: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400&q=80', label: 'Pasta Drop' },
  { src: '/images/insta/reel6.mp4', poster: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80', label: 'Shake Time' },
];

// Renders into document.body via portal so z-index is always on top
function VideoModal({ reel, onClose }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(true);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Auto-play with sound on mount
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.volume = 0.8;
    const p = v.play();
    if (p) p.catch(() => { v.muted = true; v.play().catch(() => {}); });
  }, []);

  // ESC to close
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const modal = (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.95)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.75, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.75, opacity: 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          width: 'min(340px, 90vw)',
          aspectRatio: '9/16',
          maxHeight: '88vh',
          borderRadius: '1.5rem',
          overflow: 'hidden',
          background: '#111',
          boxShadow: '0 25px 80px rgba(0,0,0,0.8)',
          border: '1px solid rgba(255,255,255,0.12)',
        }}
      >
        {/* Poster fallback */}
        <img
          src={reel.poster}
          alt={reel.label}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
        />

        {/* Video */}
        <video
          ref={videoRef}
          src={reel.src}
          poster={reel.poster}
          loop
          playsInline
          onClick={togglePlay}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1, cursor: 'pointer' }}
          onError={e => { e.target.style.display = 'none'; }}
        />

        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 40%, rgba(0,0,0,0.4) 100%)', zIndex: 2, pointerEvents: 'none' }}/>

        {/* ── CLOSE BUTTON — always visible, top right ── */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '12px', right: '12px', zIndex: 10,
            width: '36px', height: '36px',
            background: 'rgba(0,0,0,0.75)',
            border: '2px solid rgba(255,255,255,0.3)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'white',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#E4572E'; e.currentTarget.style.borderColor = '#E4572E'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.75)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Instagram badge top left */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 10, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '11px', fontFamily: 'sans-serif', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', padding: '2px 6px', borderRadius: '10px' }}>@burgertrails</span>
        </div>

        {/* Play/Pause indicator */}
        <AnimatePresence>
          {!playing && (
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
              style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3, pointerEvents: 'none' }}>
              <div style={{ width: '60px', height: '60px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white" style={{ marginLeft: '3px' }}><path d="M8 5v14l11-7z"/></svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom info + mute */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px', zIndex: 5, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <p style={{ color: 'white', fontFamily: 'sans-serif', fontWeight: 700, fontSize: '16px', marginBottom: '2px' }}>{reel.label}</p>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontFamily: 'sans-serif' }}>Burger Trails · Upperpally</p>
          </div>
          <button
            onClick={toggleMute}
            style={{ width: '38px', height: '38px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', color: 'white' }}
          >
            {muted
              ? <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zM17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/></svg>
              : <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M12 6v12m-3-8.5L8.5 8A2 2 0 007 9.5v5A2 2 0 008.5 16L9 15.5"/></svg>
            }
          </button>
        </div>
      </motion.div>
    </div>
  );

  return createPortal(
    <AnimatePresence>{modal}</AnimatePresence>,
    document.body
  );
}

function ReelCard({ reel }) {
  const videoRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else { video.pause(); video.currentTime = 0; }
      },
      { threshold: 0.7 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div onClick={() => setModalOpen(true)}
        className="relative flex-shrink-0 cursor-pointer group"
        style={{ width: '9rem', aspectRatio: '9/16' }}>
        <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 group-hover:border-orange-primary/50 transition-all">
          <img src={reel.poster} alt={reel.label} className="absolute inset-0 w-full h-full object-cover"/>
          <video ref={videoRef} src={reel.src} muted loop playsInline preload="none"
            className="absolute inset-0 w-full h-full object-cover"
            onError={e => { e.target.style.display = 'none'; }}/>
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-transparent to-transparent"/>
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 group-hover:bg-orange-primary/70 group-hover:border-orange-primary group-hover:scale-110 transition-all duration-200">
              <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
          {/* Label */}
          <div className="absolute bottom-3 left-3 right-3">
            <p className="text-white font-heading text-xs font-medium truncate">{reel.label}</p>
          </div>
        </div>
      </div>

      {/* Modal rendered via portal */}
      {modalOpen && <VideoModal reel={reel} onClose={() => setModalOpen(false)}/>}
    </>
  );
}

export default function InstaReels() {
  return (
    <section className="py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-primary font-heading font-medium tracking-widest text-xs uppercase mb-1.5">Follow the Trail</p>
            <h2 className="font-display text-3xl sm:text-4xl text-white tracking-wider">INSTA <span className="text-orange-primary">REELS</span></h2>
          </div>
          <a href="https://www.instagram.com/burgertrails" target="_blank" rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 glass px-4 py-2 rounded-full text-xs text-white/40 hover:text-white hover:border-orange-primary/30 transition-all font-heading">
            Follow Us
          </a>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-dark-900 to-transparent z-10 pointer-events-none"/>
        <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-dark-900 to-transparent z-10 pointer-events-none"/>
        <div
          className="flex gap-3 pl-4"
          style={{ animation: 'reelScroll 26s linear infinite', width: 'max-content' }}
        >
          {[...REELS, ...REELS, ...REELS].map((reel, i) => (
            <ReelCard key={`r-${i}`} reel={reel}/>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes reelScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
      `}</style>
    </section>
  );
}
