// pages/Cart.jsx
// Cart page showing items, quantity controls, total, and checkout link
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useState } from 'react';
import { ShoppingCart, Sprout, Minus, Plus, X, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { cart, loading, updateCartItem, removeCartItem, fetchCart } = useCart();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);

  // Calculate total
  const total = cart?.items?.reduce((sum, item) => {
    const price = item.product?.price || 0;
    return sum + price * item.quantity;
  }, 0) || 0;

  // Place order
  const handleCheckout = async () => {
    setPlacing(true);
    try {
      await API.post('/orders');
      await fetchCart();
      navigate('/orders');
    } catch (err) {
      console.error('Error placing order:', err);
      alert('Failed to place order');
    } finally {
      setPlacing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-primary-dark mb-6">Your Cart</h1>

      {!cart?.items?.length ? (
        <div className="text-center py-20">
          <ShoppingCart size={64} className="mx-auto text-primary/30" />
          <p className="text-text-light mt-4 text-lg">Your cart is empty</p>
          <Link to="/products" className="mt-4 inline-flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-light transition">
            Browse Plants <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div key={item._id} className="bg-bg-card rounded-2xl shadow-md p-4 flex items-center gap-4">
                {/* Product image */}
                <div className="w-20 h-20 rounded-xl bg-accent-light/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {item.product?.image ? (
                    <img src={item.product.image} alt={item.product.name} className="object-cover h-full w-full" />
                  ) : (
                    <Sprout size={28} className="text-primary/40" />
                  )}
                </div>
                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-primary-dark">{item.product?.name}</h3>
                  <p className="text-sm text-text-light">₹{item.product?.price} each</p>
                </div>
                {/* Quantity controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateCartItem(item._id, Math.max(1, item.quantity - 1))}
                    className="w-8 h-8 rounded-full bg-gray-200 text-primary-dark font-bold hover:bg-gray-300 transition flex items-center justify-center"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateCartItem(item._id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-gray-200 text-primary-dark font-bold hover:bg-gray-300 transition flex items-center justify-center"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                {/* Subtotal */}
                <p className="font-bold text-primary w-20 text-right">₹{(item.product?.price * item.quantity).toFixed(2)}</p>
                {/* Remove */}
                <button
                  onClick={() => removeCartItem(item._id)}
                  className="text-red-500 hover:text-red-700 transition"
                  title="Remove"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="mt-8 bg-bg-card rounded-2xl shadow-md p-6 flex flex-col md:flex-row items-center justify-between">
            <div>
              <p className="text-text-light text-sm">Total ({cart.items.length} item{cart.items.length > 1 ? 's' : ''})</p>
              <p className="text-3xl font-bold text-primary-dark">₹{total.toFixed(2)}</p>
            </div>
            <button
              onClick={handleCheckout}
              disabled={placing}
              className="mt-4 md:mt-0 bg-primary text-white font-semibold px-10 py-3 rounded-full hover:bg-primary-light transition disabled:opacity-50"
            >
              {placing ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
