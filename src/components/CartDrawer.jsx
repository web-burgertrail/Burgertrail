import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const { isOpen, closeCart, items, total, updateQty, removeItem, clearCart } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-dark-800 border-l border-white/5 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-primary/20 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-orange-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h2 className="font-heading font-semibold text-white text-lg tracking-wide">Your Cart</h2>
                {items.length > 0 && (
                  <span className="bg-orange-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {items.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-white/30 hover:text-red-400 text-xs font-body transition-colors"
                  >
                    Clear all
                  </button>
                )}
                <button
                  onClick={closeCart}
                  className="w-8 h-8 glass rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-64 text-center"
                  >
                    <div className="w-20 h-20 bg-dark-700 rounded-full flex items-center justify-center mb-4">
                      <span className="text-4xl">🛒</span>
                    </div>
                    <p className="text-white/40 font-body text-sm">Your cart is empty</p>
                    <p className="text-white/20 font-body text-xs mt-1">Add some delicious items!</p>
                    <button
                      onClick={closeCart}
                      className="mt-6 bg-orange-primary text-white px-6 py-2.5 rounded-full text-sm font-heading font-medium tracking-wide hover:bg-orange-light transition-colors"
                    >
                      Browse Menu
                    </button>
                  </motion.div>
                ) : (
                  items.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="glass rounded-xl p-4 flex gap-4"
                    >
                      {/* Image */}
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-dark-600 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-2xl">🍔</div>'; }}
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-heading font-medium text-white text-sm truncate">{item.name}</p>
                        <p className="text-orange-primary font-body text-sm font-semibold mt-0.5">₹{item.price}</p>

                        {/* Qty controls */}
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-2 glass rounded-full px-2 py-1">
                            <button
                              onClick={() => updateQty(item.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-white/60 hover:text-orange-primary transition-colors font-bold"
                            >
                              −
                            </button>
                            <span className="text-white text-sm font-heading w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQty(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-white/60 hover:text-orange-primary transition-colors font-bold"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-white/40 text-xs font-body">
                            = ₹{item.price * item.quantity}
                          </span>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-white/20 hover:text-red-400 transition-colors flex-shrink-0"
                        aria-label="Remove item"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/50 font-body text-sm">Subtotal</span>
                  <span className="text-white font-body text-sm">₹{total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/50 font-body text-sm">Delivery</span>
                  <span className="text-green-400 font-body text-sm">Free</span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex justify-between items-center">
                  <span className="text-white font-heading font-semibold text-lg">Total</span>
                  <span className="text-orange-primary font-display text-2xl">₹{total}</span>
                </div>
                <Link
                  to="/order"
                  onClick={closeCart}
                  className="flex items-center justify-center gap-2 w-full bg-orange-primary hover:bg-orange-light text-white py-3.5 rounded-full font-heading font-medium tracking-wide transition-all duration-300 glow-orange"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Order on WhatsApp
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
