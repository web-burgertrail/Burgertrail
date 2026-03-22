import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import menuData from '../data/menu.json';

const allImages = [
  ...menuData.burgers.map(i => ({ src: i.image, label: i.name, category: 'Food' })),
  ...menuData.pizza.map(i => ({ src: i.image, label: i.name, category: 'Food' })),
  ...menuData.wraps.map(i => ({ src: i.image, label: i.name, category: 'Food' })),
  ...menuData.desserts.map(i => ({ src: i.image, label: i.name, category: 'Food' })),
  ...menuData.pasta.map(i => ({ src: i.image, label: i.name, category: 'Food' })),
  ...menuData.beverages.map(i => ({ src: i.image, label: i.name, category: 'Food' })),
  { src: '/images/ambience/interior1.jpg', label: 'Our Interior', category: 'Ambience' },
  { src: '/images/ambience/interior2.jpg', label: 'Dining Area', category: 'Ambience' },
  { src: '/images/ambience/exterior.jpg', label: 'Exterior View', category: 'Ambience' },
];

const FILTERS = ['All', 'Food', 'Ambience'];

export default function Gallery() {
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = active === 'All' ? allImages : allImages.filter(i => i.category === active);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pt-24 pb-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-orange-primary font-heading tracking-widest text-sm uppercase mb-3">
            Visual Feast
          </p>
          <h1 className="font-display text-6xl sm:text-8xl tracking-widest text-white">
            FOOD <span className="text-orange-primary">GALLERY</span>
          </h1>
          <p className="text-white/40 font-body mt-4 max-w-lg mx-auto text-sm">
            Every photo tells a flavour story. Click to explore.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-3 mb-10">
          {FILTERS.map(f => (
            <motion.button
              key={f}
              onClick={() => setActive(f)}
              whileTap={{ scale: 0.96 }}
              className={`relative px-6 py-2.5 rounded-full text-sm font-heading tracking-wider uppercase transition-all duration-300 ${
                active === f
                  ? 'text-white'
                  : 'glass text-white/50 hover:text-white'
              }`}
            >
              {active === f && (
                <motion.span
                  layoutId="gallery-filter"
                  className="absolute inset-0 bg-orange-primary rounded-full"
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                />
              )}
              <span className="relative z-10">{f}</span>
            </motion.button>
          ))}
        </div>

        {/* Masonry Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="masonry-grid"
          >
            {filtered.map(({ src, label }, i) => (
              <motion.div
                key={src + i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (i % 8) * 0.05 }}
                onClick={() => setLightbox({ src, label })}
                className="masonry-item group relative rounded-2xl overflow-hidden cursor-pointer"
              >
                <img
                  src={src}
                  alt={label}
                  loading="lazy"
                  className="w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.parentElement.style.minHeight = '180px';
                    e.target.parentElement.style.background = '#1A1A1A';
                    e.target.style.display = 'none';
                    const ph = document.createElement('div');
                    ph.className = 'w-full h-full flex items-center justify-center text-4xl py-12';
                    ph.textContent = '🍔';
                    e.target.parentElement.appendChild(ph);
                  }}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <p className="text-white font-heading font-medium text-sm">{label}</p>
                    <p className="text-white/50 text-xs font-body mt-0.5">Click to view</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-white/30 font-body">No images found.</div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="relative max-w-3xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={lightbox.src}
                alt={lightbox.label}
                className="w-full rounded-2xl object-contain max-h-[80vh]"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-dark-900 to-transparent rounded-b-2xl">
                <p className="text-white font-heading font-medium text-lg">{lightbox.label}</p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-dark-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-dark-700 transition-all"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
