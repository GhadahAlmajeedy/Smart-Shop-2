import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems]   = useState([]);
  const [wishlist, setWishlist]     = useState([]);
  const [toasts, setToasts]         = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  /* ---- Toast ---- */
  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  /* ---- Cart ---- */
  const addToCart = useCallback((product, selectedSize, selectedColor, qty = 1) => {
    setCartItems(prev => {
      const key = `${product.id}-${selectedSize}-${selectedColor}`;
      const existing = prev.find(i => i.cartKey === key);
      if (existing) {
        return prev.map(i => i.cartKey === key ? { ...i, quantity: i.quantity + qty } : i);
      }
      return [...prev, { ...product, cartKey: key, selectedSize, selectedColor, quantity: qty }];
    });
    addToast(`تمت إضافة "${product.name}" إلى السلة ✓`);
  }, [addToast]);

  const removeFromCart = useCallback((cartKey) => {
    setCartItems(prev => prev.filter(i => i.cartKey !== cartKey));
    addToast('تم حذف المنتج من السلة', 'error');
  }, [addToast]);

  const updateQuantity = useCallback((cartKey, qty) => {
    if (qty < 1) return;
    setCartItems(prev => prev.map(i => i.cartKey === cartKey ? { ...i, quantity: qty } : i));
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);
  const cartTotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);

  /* ---- Wishlist ---- */
  const toggleWishlist = useCallback((product) => {
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        addToast('تم إزالة المنتج من المفضلة', 'error');
        return prev.filter(p => p.id !== product.id);
      }
      addToast(`تمت إضافة "${product.name}" إلى المفضلة ♥`);
      return [...prev, product];
    });
  }, [addToast]);

  const isWishlisted = useCallback((id) => wishlist.some(p => p.id === id), [wishlist]);

  return (
    <CartContext.Provider value={{
      cartItems, cartCount, cartTotal,
      addToCart, removeFromCart, updateQuantity, clearCart,
      wishlist, toggleWishlist, isWishlisted,
      toasts, isCartOpen, setIsCartOpen,
    }}>
      {children}

      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.type === 'error' ? 'error' : ''}`}>
            <i className={`fas ${t.type === 'error' ? 'fa-circle-xmark' : 'fa-circle-check'}`}
               style={{ color: t.type === 'error' ? 'var(--danger)' : 'var(--success)', fontSize: '1.2rem' }} />
            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.message}</span>
          </div>
        ))}
      </div>
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
