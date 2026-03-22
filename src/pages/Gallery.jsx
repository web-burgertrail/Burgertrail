import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Gallery images — Unsplash food + restaurant photos
const GALLERY_ITEMS = [
  { src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80', label: 'Classic Smash Burger', category: 'Food', size: 'tall' },
  { src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80', label: 'Trails Special Pizza', category: 'Food', size: 'normal' },
  { src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80', label: 'Our Restaurant', category: 'Ambience', size: 'wide' },
  { src: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80', label: 'Double Smash Burger', category: 'Food', size: 'normal' },
  { src: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80', label: 'Molten Lava Cake', category: 'Food', size: 'normal' },
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', label: 'Fine Dining Area', category: 'Ambience', size: 'wide' },
  { src: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80', label: 'BBQ Chicken Pizza', category: 'Food', size: 'normal' },
  { src: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=600&q=80', label: 'Chicken Alfredo Pasta', category: 'Food', size: 'tall' },
  { src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80', label: 'Evening Ambience', category: 'Ambience', size: 'normal' },
  { src: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&q=80', label: 'Grilled Chicken Wrap', category: 'Food', size: 'normal' },
  { src: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', label: 'Oreo Milkshake', category: 'Food', size: 'normal' },
  { src: 'https://images.unsplash.com/photo-1519690016267-bece5f2f226f?w=800&q=80', label: 'Kitchen Action', category: 'Ambience', size: 'wide' },
  { src: 'https://images.unsplash.com/photo-1607478900766-efe13248b125?w=600&q=80', label: 'Brownie Sundae', category: 'Food', size: 'normal' },
  { src: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&q=80', label: 'Spicy Jalapeño Burger', category: 'Food', size: 'normal' },
  { src: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&q=80', label: 'Mango Mastani', category: 'Food', size: 'normal' },
  { src: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80', label: 'Bolognese Pasta', category: 'Food', size: 'normal' },
  { src: 'https://images.unsplash.com/photo-1624371414361-e670edf4048b?w=600&q=80', label: 'Churros with Dip', category: 'Food', size: 'normal' },
  { src: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=80', label: 'New York Cheesecake', category: 'Food', size: 'normal' },
];

const FILTERS = ['All', 'Food', 'Ambience'];

export default function Gallery() {
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = active === 'All' ? GALLERY_ITEMS : GALLERY_ITEMS.filter(i => i.category === active);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="min-h-screen pb-20" style={{ paddingTop: "7rem" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="text-orange-primary font-heading tracking-widest text-sm uppercase mb-3">Visual Feast</p>
          <h1 className="font-display text-6xl sm:text-8xl tracking-widest text-white">FOOD <span className="text-orange-primary">GALLERY</span></h1>
          <p className="text-white/40 font-body mt-3 text-sm">Every photo tells a flavour story. Click to explore.</p>
        </motion.div>

        {/* Filters */}
        <div className="flex justify-center gap-3 mb-10">
          {FILTERS.map(f => (
            <motion.button key={f} onClick={() => setActive(f)} whileTap={{ scale: 0.96 }}
              className={`relative px-6 py-2.5 rounded-full text-sm font-heading tracking-wider uppercase transition-all ${active === f ? 'text-white' : 'glass text-white/50 hover:text-white'}`}>
              {active === f && <motion.span layoutId="gf" className="absolute inset-0 bg-orange-primary rounded-full" transition={{ type: 'spring', damping: 20, stiffness: 300 }}/>}
              <span className="relative z-10">{f}</span>
            </motion.button>
          ))}
        </div>

        {/* Grid — stable CSS grid, no masonry jumble */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[200px]"
          >
            {filtered.map((item, i) => (
              <motion.div
                key={item.src}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (i % 8) * 0.04 }}
                onClick={() => setLightbox(item)}
                className={`relative rounded-2xl overflow-hidden cursor-pointer group bg-dark-700
                  ${item.size === 'wide' ? 'sm:col-span-2' : ''}
                  ${item.size === 'tall' ? 'row-span-2' : ''}
                `}
              >
                <img
                  src={item.src}
                  alt={item.label}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={e => { e.target.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <p className="text-white font-heading font-medium text-sm">{item.label}</p>
                    <p className="text-white/40 text-xs font-body">{item.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)} className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }} transition={{ type: 'spring', damping: 22 }}
              className="relative max-w-3xl w-full" onClick={e => e.stopPropagation()}>
              <div className="rounded-2xl overflow-hidden bg-dark-700">
                <img src={lightbox.src} alt={lightbox.label} className="w-full object-contain max-h-[80vh]"/>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-dark-900 to-transparent rounded-b-2xl">
                <p className="text-white font-heading font-medium">{lightbox.label}</p>
                <p className="text-white/40 text-xs font-body mt-0.5">{lightbox.category}</p>
              </div>
              <button onClick={() => setLightbox(null)} className="absolute top-3 right-3 w-9 h-9 bg-dark-800/90 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-dark-700 transition-all">✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
