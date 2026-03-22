import { useRef } from 'react';
import { motion } from 'framer-motion';

const REELS = [
  { src: '/images/insta/reel1.mp4', poster: '/images/menu/burgers/classic-chicken.jpg', label: 'Classic Smash' },
  { src: '/images/insta/reel2.mp4', poster: '/images/menu/pizza/trails-special.jpg', label: 'Trails Special' },
  { src: '/images/insta/reel3.mp4', poster: '/images/menu/desserts/lava-cake.jpg', label: 'Lava Cake Drop' },
];

function ReelCard({ reel, index }) {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex-shrink-0 w-44 sm:w-52 aspect-[9/16] rounded-2xl overflow-hidden glass group cursor-pointer"
    >
      <video
        ref={videoRef}
        src={reel.src}
        poster={reel.poster}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          // If video fails, show poster as fallback
          e.target.style.display = 'none';
        }}
      />
      {/* Fallback poster image */}
      <img
        src={reel.poster}
        alt={reel.label}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        onError={(e) => { e.target.style.display = 'none'; }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center opacity-70 group-hover:opacity-0 transition-opacity duration-300">
        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
          <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>

      {/* Label */}
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-primary to-pink-600 flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </div>
          <span className="text-white/60 text-xs font-body">@burgertrails</span>
        </div>
        <p className="text-white font-heading text-sm font-medium">{reel.label}</p>
      </div>
    </motion.div>
  );
}

export default function InstaReels() {
  return (
    <section className="py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-primary font-heading font-medium tracking-widest text-sm uppercase mb-2">
              Follow the Trail
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wider">
              INSTA <span className="text-orange-primary">REELS</span>
            </h2>
          </div>
          <a
            href="https://www.instagram.com/burgertrails"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 glass px-5 py-2.5 rounded-full text-sm text-white/60 hover:text-white hover:border-orange-primary/30 transition-all font-heading tracking-wide"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Follow Us
          </a>
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div className="pl-4 sm:pl-6 lg:pl-8 pr-4">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
          {REELS.map((reel, i) => (
            <ReelCard key={i} reel={reel} index={i} />
          ))}
          {/* Extra visual cards as placeholders */}
          {[
            { label: 'Smash Burger Stack', color: 'from-orange-primary/30 to-dark-700', emoji: '🍔' },
            { label: 'Pizza Night', color: 'from-red-600/30 to-dark-700', emoji: '🍕' },
            { label: 'Dessert Drop', color: 'from-purple-600/30 to-dark-700', emoji: '🍩' },
          ].map((item, i) => (
            <motion.div
              key={`placeholder-${i}`}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i + 3) * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`relative flex-shrink-0 w-44 sm:w-52 aspect-[9/16] rounded-2xl overflow-hidden bg-gradient-to-b ${item.color} glass cursor-pointer group`}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-7xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.emoji}</span>
                <p className="text-white/60 font-heading text-sm text-center px-4">{item.label}</p>
              </div>
              <div className="absolute bottom-4 left-4">
                <p className="text-white/40 text-xs font-body">@burgertrails</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
