// context/CartContext.jsx
// Provides cart state and methods across the app
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import API from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { token } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Show toast notification
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  // Fetch cart from backend
  const fetchCart = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await API.get('/cart');
      setCart(res.data);
    } catch (err) {
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Add item to cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      const res = await API.post('/cart', { productId, quantity });
      setCart(res.data);
      showToast('Added to cart!');
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  // Update cart item quantity
  const updateCartItem = async (itemId, quantity) => {
    try {
      const res = await API.put(`/cart/${itemId}`, { quantity });
      setCart(res.data);
    } catch (err) {
      console.error('Error updating cart:', err);
    }
  };

  // Remove item from cart
  const removeCartItem = async (itemId) => {
    try {
      const res = await API.delete(`/cart/${itemId}`);
      setCart(res.data);
      showToast('Removed from cart');
    } catch (err) {
      console.error('Error removing from cart:', err);
    }
  };

  // Get cart item count
  const cartCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <CartContext.Provider value={{ cart, loading, cartCount, addToCart, updateCartItem, removeCartItem, fetchCart, toast }}>
      {children}
    </CartContext.Provider>
  );
};
