// pages/ProductDetails.jsx
// Single product view with full details and add-to-cart
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Sprout, ChevronRight, ShoppingCart, Truck, ShieldCheck, Package } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-3 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!product) {
    return <p className="text-center py-20 text-lg text-text-muted">Product not found.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-text-muted mb-6">
        <Link to="/" className="hover:text-primary transition">Home</Link>
        <ChevronRight size={12} />
        <Link to="/products" className="hover:text-primary transition">Plants</Link>
        <ChevronRight size={12} />
        <span className="text-text-primary font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div className="bg-bg-warm rounded-xl border border-border overflow-hidden aspect-square flex items-center justify-center">
          {product.image ? (
            <img src={product.image} alt={product.name} className="object-cover h-full w-full" />
          ) : (
            <Sprout size={80} className="text-primary/20" />
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <span className="text-xs uppercase tracking-wider text-primary font-semibold">{product.category}</span>
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary mt-2">{product.name}</h1>
          <p className="text-text-muted mt-3 leading-relaxed text-sm">{product.description}</p>

          <div className="mt-5 pb-5 border-b border-border">
            <p className="text-3xl font-bold text-text-primary">₹{product.price}</p>
            <p className="text-sm mt-1">
              {product.stock > 0 ? (
                <span className="text-primary font-medium">In Stock ({product.stock} available)</span>
              ) : (
                <span className="text-red-500 font-medium">Out of Stock</span>
              )}
            </p>
          </div>

          {/* Action */}
          <div className="mt-5">
            {user ? (
              <button
                onClick={() => addToCart(product._id)}
                disabled={product.stock === 0}
                className="bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary-light transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
              >
                <ShoppingCart size={16} /> Add to Cart
              </button>
            ) : (
              <Link to="/login" className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary-light transition text-sm">
                Login to Purchase
              </Link>
            )}
          </div>

          {/* Trust signals */}
          <div className="mt-6 pt-5 border-t border-border grid grid-cols-3 gap-3">
            {[
              { icon: <Truck size={16} />, label: 'Safe Delivery' },
              { icon: <ShieldCheck size={16} />, label: 'Govt. Approved' },
              { icon: <Package size={16} />, label: 'Secure Packing' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-1 text-center">
                <span className="text-primary/60">{item.icon}</span>
                <span className="text-[11px] text-text-muted">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
