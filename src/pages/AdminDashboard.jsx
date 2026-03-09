// pages/AdminDashboard.jsx
// Admin panel: manage products, view orders & users
import { useEffect, useState } from 'react';
import API from '../services/api';

const AdminDashboard = () => {
  const [tab, setTab] = useState('products'); // products | orders | add
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Product form state
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', image: '', stock: '' });
  const [editId, setEditId] = useState(null);
  const [formMsg, setFormMsg] = useState('');

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await API.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await API.get('/orders');
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tab === 'products') fetchProducts();
    if (tab === 'orders') fetchOrders();
  }, [tab]);

  // Handle add/edit product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMsg('');
    try {
      const payload = { ...form, price: Number(form.price), stock: Number(form.stock) };
      if (editId) {
        await API.put(`/products/${editId}`, payload);
        setFormMsg('Product updated!');
      } else {
        await API.post('/products', payload);
        setFormMsg('Product added!');
      }
      setForm({ name: '', description: '', price: '', category: '', image: '', stock: '' });
      setEditId(null);
      fetchProducts();
    } catch (err) {
      setFormMsg(err.response?.data?.message || 'Error');
    }
  };

  // Start editing a product
  const startEdit = (product) => {
    setEditId(product._id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image || '',
      stock: product.stock,
    });
    setTab('add');
  };

  // Delete product
  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const tabs = [
    { key: 'products', label: 'Products' },
    { key: 'orders', label: 'Orders' },
    { key: 'add', label: editId ? 'Edit Product' : 'Add Product' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-primary-dark mb-6">Admin Dashboard</h1>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
              tab === t.key ? 'bg-primary text-white' : 'bg-gray-200 text-primary-dark hover:bg-gray-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent"></div>
        </div>
      )}

      {/* Products Tab */}
      {tab === 'products' && !loading && (
        <div className="overflow-x-auto">
          <table className="w-full bg-bg-card rounded-2xl shadow-md overflow-hidden">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm">Name</th>
                <th className="px-4 py-3 text-left text-sm">Category</th>
                <th className="px-4 py-3 text-left text-sm">Price</th>
                <th className="px-4 py-3 text-left text-sm">Stock</th>
                <th className="px-4 py-3 text-left text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-b border-gray-100 hover:bg-bg/50">
                  <td className="px-4 py-3 text-sm font-medium">{p.name}</td>
                  <td className="px-4 py-3 text-sm text-text-light">{p.category}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-primary">₹{p.price}</td>
                  <td className="px-4 py-3 text-sm">{p.stock}</td>
                  <td className="px-4 py-3 text-sm flex gap-2">
                    <button onClick={() => startEdit(p)} className="text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => deleteProduct(p._id)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr><td colSpan={5} className="text-center py-8 text-text-light">No products found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Orders Tab */}
      {tab === 'orders' && !loading && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <p className="text-center text-text-light py-10">No orders yet.</p>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="bg-bg-card rounded-2xl shadow-md p-6">
                <div className="flex flex-wrap justify-between items-center mb-3">
                  <span className="text-xs text-text-light">Order #{order._id.slice(-8).toUpperCase()}</span>
                  <span className="text-xs text-text-light">User: {order.user?.name} ({order.user?.email})</span>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${order.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {order.status}
                  </span>
                </div>
                <div className="space-y-1">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>{item.product?.name || 'Product'} × {item.quantity}</span>
                      <span>₹{((item.product?.price || 0) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t mt-3 pt-2 flex justify-between font-bold text-primary-dark">
                  <span>Total</span>
                  <span>₹{order.total.toFixed(2)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Add/Edit Product Tab */}
      {tab === 'add' && (
        <div className="bg-bg-card rounded-2xl shadow-md p-8 max-w-lg">
          <h2 className="text-xl font-bold text-primary-dark mb-4">{editId ? 'Edit Product' : 'Add New Product'}</h2>
          {formMsg && <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg mb-4 text-sm">{formMsg}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" required placeholder="Product Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
            <textarea required placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary h-24" />
            <input type="number" required placeholder="Price (₹)" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
            <select required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Select Category</option>
              <option value="Fruit Plants">Fruit Plants</option>
              <option value="Vegetable Plants">Vegetable Plants</option>
              <option value="Spice Plants">Spice Plants</option>
              <option value="Flowering & Ornamental">Flowering & Ornamental</option>
              <option value="Plantation Crops">Plantation Crops</option>
              <option value="Other Crops">Other Crops</option>
            </select>
            <input type="text" placeholder="Image URL (optional)" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
            <input type="number" required placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
            <div className="flex gap-3">
              <button type="submit" className="bg-primary text-white font-semibold px-6 py-2 rounded-xl hover:bg-primary-light transition">
                {editId ? 'Update' : 'Add Product'}
              </button>
              {editId && (
                <button type="button" onClick={() => { setEditId(null); setForm({ name: '', description: '', price: '', category: '', image: '', stock: '' }); }}
                  className="bg-gray-200 text-primary-dark px-6 py-2 rounded-xl hover:bg-gray-300 transition">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
