// components/ProductCard.jsx
// Premium product card with badges, wishlist, rating, hover zoom, and animations
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ProductBadge from './ProductBadge';
import WishlistButton from './WishlistButton';
import RatingStars from './RatingStars';

// Determine badge type from product properties
const getBadge = (product) => {
  if (product.stock > 0 && product.stock <= 5) return 'limited';
  if (product.price < 300) return 'sale';
  if (product.stock > 20) return 'bestseller';
  return 'new';
};

const ProductCard = ({ product, index = 0 }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  // Pseudo-random rating based on product id
  const rating = product._id ? (3.5 + (parseInt(product._id.slice(-2), 16) % 15) / 10) : 4.5;
  const reviews = product._id ? (10 + (parseInt(product._id.slice(-4), 16) % 200)) : 42;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-bg-card rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col relative"
    >
      {/* Badge */}
      <ProductBadge type={getBadge(product)} />

      {/* Wishlist button */}
      <div className="absolute top-3 right-3 z-10">
        <WishlistButton productId={product._id} />
      </div>

      {/* Product image with hover zoom */}
      <Link to={`/products/${product._id}`} className="img-zoom-container h-56 bg-accent-light/10 flex items-center justify-center">
        {product.image ? (
          <img src={product.image} alt={product.name} className="object-cover h-full w-full" />
        ) : (
          <span className="text-6xl group-hover:scale-110 transition-transform duration-300">🌱</span>
        )}
      </Link>

      {/* Product info */}
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/products/${product._id}`}>
          <h3 className="font-bold text-base text-primary-dark group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
        </Link>
        <p className="text-text-light text-xs mt-1 line-clamp-2 leading-relaxed">{product.description}</p>

        {/* Rating */}
        <div className="mt-2">
          <RatingStars rating={rating} reviews={reviews} />
        </div>

        <div className="mt-auto pt-3 flex items-end justify-between">
          <div>
            <span className="text-primary font-extrabold text-xl">₹{product.price}</span>
            {product.price > 200 && (
              <span className="text-text-light line-through text-xs ml-2">₹{Math.round(product.price * 1.4)}</span>
            )}
          </div>
          {user && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => addToCart(product._id)}
              className="text-xs bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-light transition-all shadow-md hover:shadow-lg font-semibold"
            >
              + Add
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
