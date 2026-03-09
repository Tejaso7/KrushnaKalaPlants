// pages/AdminDashboard.jsx
// Admin panel: manage products, view orders & users
import { useEffect, useState } from 'react';
import API from '../services/api';
import { Package, ClipboardList, PlusCircle } from 'lucide-react';

const AdminDashboard = () => {
  const [tab, setTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', image: '', stock: '' });
  const [editId, setEditId] = useState(null);
  const [formMsg, setFormMsg] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    try { const res = await API.get('/products'); setProducts(res.data); } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try { const res = await API.get('/orders'); setOrders(res.data); } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => {
    if (tab === 'products') fetchProducts();
    if (tab === 'orders') fetchOrders();
  }, [tab]);

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

  const startEdit = (product) => {
    setEditId(product._id);
    setForm({ name: product.name, description: product.description, price: product.price, category: product.category, image: product.image || '', stock: product.stock });
    setTab('add');
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try { await API.delete(`/products/${id}`); fetchProducts(); } catch (err) { console.error(err); }
  };

  const tabs = [
    { key: 'products', label: 'Products', icon: <Package size={15} /> },
    { key: 'orders', label: 'Orders', icon: <ClipboardList size={15} /> },
    { key: 'add', label: editId ? 'Edit Product' : 'Add Product', icon: <PlusCircle size={15} /> },
  ];

  const inputCls = "w-full border border-border rounded-lg px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition";

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-text-primary mb-5">Admin Dashboard</h1>

      {/* Tab Navigation */}
      <div className="flex gap-1 mb-6 border-b border-border">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition border-b-2 -mb-px ${
              tab === t.key ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-text-primary'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-3 border-primary border-t-transparent"></div>
        </div>
      )}

      {/* Products Tab */}
      {tab === 'products' && !loading && (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full">
            <thead className="bg-bg-warm">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Price</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Stock</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((p) => (
                <tr key={p._id} className="hover:bg-bg-warm/50 transition">
                  <td className="px-4 py-3 text-sm font-medium text-text-primary">{p.name}</td>
                  <td className="px-4 py-3 text-sm text-text-muted">{p.category}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-primary">₹{p.price}</td>
                  <td className="px-4 py-3 text-sm">{p.stock}</td>
                  <td className="px-4 py-3 text-sm flex gap-3">
                    <button onClick={() => startEdit(p)} className="text-primary hover:underline text-xs font-medium">Edit</button>
                    <button onClick={() => deleteProduct(p._id)} className="text-red-500 hover:underline text-xs font-medium">Delete</button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr><td colSpan={5} className="text-center py-8 text-text-muted text-sm">No products found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Orders Tab */}
      {tab === 'orders' && !loading && (
        <div className="space-y-3">
          {orders.length === 0 ? (
            <p className="text-center text-text-muted py-10 text-sm">No orders yet.</p>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="bg-white rounded-xl border border-border overflow-hidden">
                <div className="flex flex-wrap justify-between items-center px-5 py-3 bg-bg-warm border-b border-border gap-2">
                  <span className="text-xs text-text-muted">Order <strong className="text-text-primary">#{order._id.slice(-8).toUpperCase()}</strong></span>
                  <span className="text-xs text-text-muted">User: {order.user?.name} ({order.user?.email})</span>
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md ${order.status === 'completed' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-yellow-50 text-yellow-700 border border-yellow-200'}`}>
                    {order.status}
                  </span>
                </div>
                <div className="px-5 py-3 space-y-1">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-text-muted">{item.product?.name || 'Product'} × {item.quantity}</span>
                      <span className="font-medium">₹{((item.product?.price || 0) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border px-5 py-3 flex justify-between font-semibold text-text-primary text-sm">
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
        <div className="bg-white rounded-xl border border-border p-6 max-w-lg">
          <h2 className="text-lg font-bold text-text-primary mb-4">{editId ? 'Edit Product' : 'Add New Product'}</h2>
          {formMsg && <div className="bg-green-50 text-green-700 border border-green-200 px-3 py-2 rounded-lg mb-4 text-sm">{formMsg}</div>}
          <form onSubmit={handleSubmit} className="space-y-3">
            <input type="text" required placeholder="Product Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
            <textarea required placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${inputCls} h-24`} />
            <input type="number" required placeholder="Price (₹)" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className={inputCls} />
            <select required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputCls}>
              <option value="">Select Category</option>
              <option value="Fruit Plants">Fruit Plants</option>
              <option value="Vegetable Plants">Vegetable Plants</option>
              <option value="Spice Plants">Spice Plants</option>
              <option value="Flowering & Ornamental">Flowering & Ornamental</option>
              <option value="Plantation Crops">Plantation Crops</option>
              <option value="Other Crops">Other Crops</option>
            </select>
            <input type="text" placeholder="Image URL (optional)" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className={inputCls} />
            <input type="number" required placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className={inputCls} />
            <div className="flex gap-3 pt-1">
              <button type="submit" className="bg-primary text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-primary-light transition text-sm">
                {editId ? 'Update' : 'Add Product'}
              </button>
              {editId && (
                <button type="button" onClick={() => { setEditId(null); setForm({ name: '', description: '', price: '', category: '', image: '', stock: '' }); }}
                  className="border border-border text-text-muted px-5 py-2.5 rounded-lg hover:bg-bg-warm transition text-sm">
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
