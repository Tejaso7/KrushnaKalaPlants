// pages/Orders.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { Package, ChevronRight } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get('/orders/my');
        setOrders(res.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-3 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-text-muted mb-5">
        <Link to="/" className="hover:text-primary transition">Home</Link>
        <ChevronRight size={12} />
        <span className="text-text-primary font-medium">Orders</span>
      </nav>

      <h1 className="text-2xl font-bold text-text-primary mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <Package size={48} className="mx-auto text-border" />
          <p className="text-text-muted mt-4">No orders yet.</p>
          <Link to="/products" className="mt-3 inline-block text-sm text-primary hover:underline">Browse Plants</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl border border-border overflow-hidden">
              {/* Order header */}
              <div className="flex items-center justify-between px-5 py-3 bg-bg-warm border-b border-border">
                <div className="flex items-center gap-4 text-xs text-text-muted">
                  <span>Order <strong className="text-text-primary">#{order._id.slice(-8).toUpperCase()}</strong></span>
                  {order.createdAt && (
                    <span>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  )}
                </div>
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md ${
                  order.status === 'completed' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                }`}>
                  {order.status}
                </span>
              </div>
              {/* Items */}
              <div className="px-5 py-3 space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-text-muted">{item.product?.name || 'Product'} <span className="text-text-muted/60">× {item.quantity}</span></span>
                    <span className="font-medium text-text-primary">₹{((item.product?.price || 0) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              {/* Total */}
              <div className="border-t border-border px-5 py-3 flex justify-between">
                <span className="text-sm font-semibold text-text-primary">Total</span>
                <span className="text-sm font-bold text-text-primary">₹{order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
