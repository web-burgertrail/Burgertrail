import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const BADGE_COLORS = {
  'Bestseller': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  "Chef's Pick": 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Hot 🔥': 'bg-red-500/20 text-red-400 border-red-500/30',
  'Veg': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Signature': 'bg-orange-primary/20 text-orange-primary border-orange-primary/30',
  'Fan Fav': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  'Must Try': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Summer 🍉': 'bg-green-600/20 text-green-300 border-green-600/30',
};

// Item detail popup — Swiggy style
function ItemModal({ item, onClose, onAdd }) {
  const { items, updateQty, removeItem } = useCart();
  const cartItem = items.find(i => i.id === item.id);
  const badgeClass = BADGE_COLORS[item.badge] || '';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
        className="w-full sm:max-w-md bg-dark-800 rounded-t-3xl sm:rounded-2xl overflow-hidden border border-white/10"
      >
        {/* Image */}
        <div className="relative aspect-video bg-dark-700">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={e => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML += `<div class="absolute inset-0 flex items-center justify-center text-7xl">${item.fallback || '🍔'}</div>`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-800/80 to-transparent" />
          {item.badge && (
            <span className={`absolute top-3 left-3 text-xs font-heading px-2.5 py-1 rounded-full border ${badgeClass}`}>
              {item.badge}
            </span>
          )}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 bg-dark-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:text-orange-primary transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Details */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h2 className="font-heading font-bold text-white text-xl leading-tight">{item.name}</h2>
            <span className="font-display text-2xl text-orange-primary flex-shrink-0">₹{item.price}</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1 bg-green-600/20 border border-green-600/30 px-2 py-0.5 rounded">
              <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-green-400 text-xs font-heading font-bold">{item.rating || '4.2'}</span>
            </div>
            <span className="text-white/30 text-xs font-body">({item.reviews || Math.floor(Math.random() * 200 + 50)} ratings)</span>
            {item.calories && <span className="text-white/30 text-xs font-body">• {item.calories} kcal</span>}
          </div>

          <p className="text-white/60 font-body text-sm leading-relaxed mb-5">{item.description}</p>

          {/* Add / Qty */}
          {!cartItem ? (
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              onClick={() => { onAdd(item); onClose(); }}
              className="w-full bg-orange-primary hover:bg-orange-light text-white py-3.5 rounded-full font-heading font-medium tracking-wide transition-all glow-orange"
            >
              Add to Cart — ₹{item.price}
            </motion.button>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 glass rounded-full px-4 py-2">
                <button onClick={() => updateQty(cartItem.id, cartItem.quantity - 1)} className="w-7 h-7 flex items-center justify-center text-orange-primary font-bold text-xl">−</button>
                <span className="text-white font-heading text-lg w-6 text-center">{cartItem.quantity}</span>
                <button onClick={() => updateQty(cartItem.id, cartItem.quantity + 1)} className="w-7 h-7 flex items-center justify-center text-orange-primary font-bold text-xl">+</button>
              </div>
              <span className="text-orange-primary font-display text-xl">₹{item.price * cartItem.quantity}</span>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Desktop row card (Swiggy/Zomato style)
function DesktopCard({ item }) {
  const { addItem, items, updateQty } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const cartItem = items.find(i => i.id === item.id);
  const badgeClass = BADGE_COLORS[item.badge] || '';

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="flex gap-4 p-4 border-b border-white/5 hover:bg-white/[0.02] transition-all cursor-pointer group"
      >
        {/* Left: Info */}
        <div className="flex-1 min-w-0">
          {/* Veg/Non-veg indicator */}
          <div className="flex items-center gap-2 mb-1.5">
            <div className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center flex-shrink-0 ${item.badge === 'Veg' ? 'border-green-500' : 'border-red-500'}`}>
              <div className={`w-2 h-2 rounded-full ${item.badge === 'Veg' ? 'bg-green-500' : 'bg-red-500'}`} />
            </div>
            {item.badge && item.badge !== 'Veg' && (
              <span className={`text-xs font-heading px-2 py-0.5 rounded-full border ${badgeClass}`}>{item.badge}</span>
            )}
          </div>

          <h3 className="font-heading font-semibold text-white text-base mb-1 group-hover:text-orange-primary transition-colors">{item.name}</h3>

          <div className="flex items-center gap-2 mb-2">
            <span className="font-heading font-bold text-white text-base">₹{item.price}</span>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <span className="text-green-400 text-xs font-bold">{item.rating || '4.2'}</span>
              <span className="text-white/30 text-xs">({item.reviews || Math.floor(Math.random() * 200 + 50)})</span>
            </div>
          </div>

          <p className="text-white/40 text-sm font-body leading-relaxed line-clamp-2">{item.description}</p>
        </div>

        {/* Right: Image + Add */}
        <div className="flex-shrink-0 w-28 relative">
          <div className="w-28 h-28 rounded-xl overflow-hidden bg-dark-600">
            {!imgErr ? (
              <img src={item.image} alt={item.name} loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={() => setImgErr(true)} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl bg-dark-700">
                {item.fallback || '🍔'}
              </div>
            )}
          </div>

          {/* Add button below image */}
          {!cartItem ? (
            <button
              onClick={e => { e.stopPropagation(); addItem(item); }}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-dark-800 border border-orange-primary text-orange-primary hover:bg-orange-primary hover:text-white px-5 py-1.5 rounded-full text-sm font-heading font-bold tracking-wide transition-all whitespace-nowrap shadow-lg"
            >
              ADD
            </button>
          ) : (
            <div
              onClick={e => e.stopPropagation()}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-dark-800 border border-orange-primary rounded-full px-2 py-1 shadow-lg"
            >
              <button onClick={() => updateQty(cartItem.id, cartItem.quantity - 1)} className="w-6 h-6 flex items-center justify-center text-orange-primary font-bold text-lg leading-none">−</button>
              <span className="text-white font-heading text-sm w-4 text-center">{cartItem.quantity}</span>
              <button onClick={() => updateQty(cartItem.id, cartItem.quantity + 1)} className="w-6 h-6 flex items-center justify-center text-orange-primary font-bold text-lg leading-none">+</button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showModal && <ItemModal item={item} onClose={() => setShowModal(false)} onAdd={addItem} />}
      </AnimatePresence>
    </>
  );
}

// Mobile compact card — just name + tap for popup
function MobileCard({ item }) {
  const { addItem, items, updateQty } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const cartItem = items.find(i => i.id === item.id);
  const badgeClass = BADGE_COLORS[item.badge] || '';

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="flex gap-3 p-3 border-b border-white/5 active:bg-white/[0.03] cursor-pointer group"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <div className={`w-3.5 h-3.5 border-2 rounded-sm flex items-center justify-center flex-shrink-0 ${item.badge === 'Veg' ? 'border-green-500' : 'border-red-500'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${item.badge === 'Veg' ? 'bg-green-500' : 'bg-red-500'}`} />
            </div>
            {item.badge && item.badge !== 'Veg' && (
              <span className={`text-[10px] font-heading px-1.5 py-0.5 rounded-full border ${badgeClass}`}>{item.badge}</span>
            )}
          </div>
          <h3 className="font-heading font-semibold text-white text-sm leading-tight mb-1">{item.name}</h3>
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-white text-sm">₹{item.price}</span>
            <div className="flex items-center gap-0.5">
              <svg className="w-2.5 h-2.5 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <span className="text-green-400 text-[10px] font-bold">{item.rating || '4.2'}</span>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 relative mt-1">
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-dark-600">
            {!imgErr ? (
              <img src={item.image} alt={item.name} loading="lazy" className="w-full h-full object-cover"
                onError={() => setImgErr(true)} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl bg-dark-700">{item.fallback || '🍔'}</div>
            )}
          </div>
          {!cartItem ? (
            <button onClick={e => { e.stopPropagation(); addItem(item); }}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-dark-800 border border-orange-primary text-orange-primary px-3 py-0.5 rounded-full text-xs font-heading font-bold shadow-md">
              ADD
            </button>
          ) : (
            <div onClick={e => e.stopPropagation()} className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-dark-800 border border-orange-primary rounded-full px-1.5 py-0.5 shadow-md">
              <button onClick={() => updateQty(cartItem.id, cartItem.quantity - 1)} className="w-5 h-5 flex items-center justify-center text-orange-primary font-bold text-base leading-none">−</button>
              <span className="text-white font-heading text-xs w-3.5 text-center">{cartItem.quantity}</span>
              <button onClick={() => updateQty(cartItem.id, cartItem.quantity + 1)} className="w-5 h-5 flex items-center justify-center text-orange-primary font-bold text-base leading-none">+</button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showModal && <ItemModal item={item} onClose={() => setShowModal(false)} onAdd={addItem} />}
      </AnimatePresence>
    </>
  );
}

// Compact card for Featured Picks on Home
export function CompactCard({ item }) {
  const { addItem, items } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const inCart = items.find(i => i.id === item.id);

  return (
    <>
      <motion.div whileHover={{ y: -4 }} onClick={() => setShowModal(true)}
        className="group glass rounded-xl overflow-hidden hover:border-orange-primary/30 transition-all cursor-pointer flex flex-col">
        <div className="aspect-square bg-dark-600 overflow-hidden relative">
          {!imgErr ? (
            <img src={item.image} alt={item.name} loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={() => setImgErr(true)} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-3xl sm:text-4xl bg-dark-700">{item.fallback || '🍔'}</div>
          )}
          {item.badge && (
            <span className={`absolute top-1.5 left-1.5 text-[9px] sm:text-xs font-heading px-1.5 py-0.5 rounded-full border ${BADGE_COLORS[item.badge] || ''}`}>{item.badge}</span>
          )}
          {inCart && (
            <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-orange-primary rounded-full flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">{inCart.quantity}</span>
            </div>
          )}
        </div>
        <div className="p-2 sm:p-3 flex flex-col gap-1.5">
          <h3 className="font-heading font-semibold text-white text-xs sm:text-sm leading-tight line-clamp-2">{item.name}</h3>
          <div className="flex items-center justify-between">
            <span className="font-display text-base sm:text-lg text-orange-primary">₹{item.price}</span>
            <button onClick={e => { e.stopPropagation(); addItem(item); }}
              className="bg-orange-primary hover:bg-orange-light text-white px-2 py-1 rounded-full text-[10px] sm:text-xs font-heading font-medium transition-all">
              + Add
            </button>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {showModal && <ItemModal item={item} onClose={() => setShowModal(false)} onAdd={addItem} />}
      </AnimatePresence>
    </>
  );
}

export default function MenuCard({ item, mobile = false }) {
  return mobile ? <MobileCard item={item} /> : <DesktopCard item={item} />;
}
