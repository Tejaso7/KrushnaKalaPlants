// pages/ProductDetails.jsx
// Single product view with full details and add-to-cart
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Sprout, ArrowLeft, ShoppingCart } from 'lucide-react';

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
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!product) {
    return <p className="text-center py-20 text-lg text-text-light">Product not found.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link to="/products" className="text-primary hover:underline text-sm mb-6 inline-flex items-center gap-1"><ArrowLeft size={14} /> Back to Shop</Link>
      <div className="bg-bg-card rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Image */}
        <div className="h-80 md:h-auto bg-accent-light/20 flex items-center justify-center">
          {product.image ? (
            <img src={product.image} alt={product.name} className="object-cover h-full w-full" />
          ) : (
            <Sprout size={80} className="text-primary/30" />
          )}
        </div>
        {/* Details */}
        <div className="p-8 flex flex-col justify-center">
          <span className="text-xs uppercase tracking-wider text-accent font-semibold">{product.category}</span>
          <h1 className="text-3xl font-bold text-primary-dark mt-2">{product.name}</h1>
          <p className="text-text-light mt-4 leading-relaxed">{product.description}</p>
          <p className="text-3xl font-bold text-primary mt-6">₹{product.price}</p>
          <p className="text-sm text-text-light mt-1">
            {product.stock > 0 ? (
              <span className="text-accent font-semibold">In Stock ({product.stock} left)</span>
            ) : (
              <span className="text-red-500 font-semibold">Out of Stock</span>
            )}
          </p>
          {user ? (
            <button
              onClick={() => addToCart(product._id)}
              disabled={product.stock === 0}
              className="mt-6 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-light transition disabled:opacity-50 disabled:cursor-not-allowed w-fit flex items-center gap-2"
            >
              <ShoppingCart size={18} /> Add to Cart
            </button>
          ) : (
            <Link to="/login" className="mt-6 text-primary underline text-sm">Login to add to cart</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
