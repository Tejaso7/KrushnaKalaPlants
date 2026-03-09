// pages/Cart.jsx
// Cart page showing items, quantity controls, total, and checkout
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useState } from 'react';
import { ShoppingCart, Sprout, Minus, Plus, X, ArrowRight, ChevronRight, ShieldCheck } from 'lucide-react';

const Cart = () => {
  const { cart, loading, updateCartItem, removeCartItem, fetchCart } = useCart();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);

  const total = cart?.items?.reduce((sum, item) => {
    const price = item.product?.price || 0;
    return sum + price * item.quantity;
  }, 0) || 0;

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
        <div className="animate-spin rounded-full h-10 w-10 border-3 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-text-muted mb-5">
        <Link to="/" className="hover:text-primary transition">Home</Link>
        <ChevronRight size={12} />
        <span className="text-text-primary font-medium">Cart</span>
      </nav>

      <h1 className="text-2xl font-bold text-text-primary mb-6">Shopping Cart</h1>

      {!cart?.items?.length ? (
        <div className="text-center py-20">
          <ShoppingCart size={48} className="mx-auto text-border" />
          <p className="text-text-muted mt-4">Your cart is empty</p>
          <Link to="/products" className="mt-4 inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-primary-light transition text-sm font-medium">
            Browse Plants <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-3">
            {cart.items.map((item) => (
              <div key={item._id} className="bg-white rounded-xl border border-border p-4 flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-bg-warm flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {item.product?.image ? (
                    <img src={item.product.image} alt={item.product.name} className="object-cover h-full w-full" />
                  ) : (
                    <Sprout size={20} className="text-primary/30" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-text-primary text-sm truncate">{item.product?.name}</h3>
                  <p className="text-xs text-text-muted">₹{item.product?.price} each</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => updateCartItem(item._id, Math.max(1, item.quantity - 1))}
                    className="w-7 h-7 rounded-md border border-border text-text-muted hover:bg-bg-warm transition flex items-center justify-center"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-7 text-center text-sm font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateCartItem(item._id, item.quantity + 1)}
                    className="w-7 h-7 rounded-md border border-border text-text-muted hover:bg-bg-warm transition flex items-center justify-center"
                  >
                    <Plus size={12} />
                  </button>
                </div>
                <p className="font-semibold text-text-primary w-20 text-right text-sm">₹{(item.product?.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => removeCartItem(item._id)}
                  className="text-text-muted hover:text-red-500 transition"
                  title="Remove"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl border border-border p-5 h-fit sticky top-24">
            <h3 className="font-semibold text-text-primary mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm border-b border-border pb-4 mb-4">
              <div className="flex justify-between text-text-muted">
                <span>Subtotal ({cart.items.length} item{cart.items.length > 1 ? 's' : ''})</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-text-muted">
                <span>Shipping</span>
                <span className="text-primary font-medium">Free</span>
              </div>
            </div>
            <div className="flex justify-between font-bold text-text-primary mb-5">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={placing}
              className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary-light transition disabled:opacity-50 text-sm"
            >
              {placing ? 'Placing Order...' : 'Place Order'}
            </button>
            <p className="flex items-center justify-center gap-1.5 text-[11px] text-text-muted mt-3">
              <ShieldCheck size={12} /> Secure checkout
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
