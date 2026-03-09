// pages/Orders.jsx
// Displays user's order history
import { useEffect, useState } from 'react';
import API from '../services/api';

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
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-primary-dark mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center text-text-light py-20 text-lg">No orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-bg-card rounded-2xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-text-light">Order #{order._id.slice(-8).toUpperCase()}</span>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${order.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {order.status}
                </span>
              </div>
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span>{item.product?.name || 'Product'} × {item.quantity}</span>
                    <span className="font-semibold">₹{((item.product?.price || 0) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t mt-4 pt-3 flex justify-between font-bold text-primary-dark">
                <span>Total</span>
                <span>₹{order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
