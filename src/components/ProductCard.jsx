// components/ProductCard.jsx
// Clean professional product card
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ProductBadge from './ProductBadge';
import WishlistButton from './WishlistButton';
import RatingStars from './RatingStars';
import { Sprout, ShoppingCart } from 'lucide-react';

const getBadge = (product) => {
  if (product.stock > 0 && product.stock <= 5) return 'limited';
  if (product.price < 300) return 'sale';
  if (product.stock > 20) return 'bestseller';
  return 'new';
};

const ProductCard = ({ product, index = 0 }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const rating = product._id ? (3.5 + (parseInt(product._id.slice(-2), 16) % 15) / 10) : 4.5;
  const reviews = product._id ? (10 + (parseInt(product._id.slice(-4), 16) % 200)) : 42;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group bg-bg-card rounded-xl border border-border hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col card-hover"
    >
      {/* Badge */}
      <ProductBadge type={getBadge(product)} />

      {/* Wishlist button */}
      <div className="absolute top-2.5 right-2.5 z-10">
        <WishlistButton productId={product._id} />
      </div>

      {/* Product image */}
      <Link to={`/products/${product._id}`} className="img-zoom-container h-52 bg-bg-warm flex items-center justify-center">
        {product.image ? (
          <img src={product.image} alt={product.name} className="object-cover h-full w-full" />
        ) : (
          <Sprout size={40} className="text-primary/25 group-hover:text-primary/40 transition-colors" />
        )}
      </Link>

      {/* Product info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[11px] text-text-muted uppercase tracking-wide font-medium mb-1">{product.category}</p>
        <Link to={`/products/${product._id}`}>
          <h3 className="font-semibold text-[15px] text-text group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
        </Link>
        <p className="text-text-light text-xs mt-1.5 line-clamp-2 leading-relaxed">{product.description}</p>

        <div className="mt-2">
          <RatingStars rating={rating} reviews={reviews} />
        </div>

        <div className="mt-auto pt-3 flex items-end justify-between border-t border-border/50 mt-3">
          <div>
            <span className="text-primary font-bold text-lg">₹{product.price}</span>
            {product.price > 200 && (
              <span className="text-text-muted line-through text-xs ml-1.5">₹{Math.round(product.price * 1.4)}</span>
            )}
          </div>
          {user && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => addToCart(product._id)}
              className="text-xs bg-primary text-white px-3.5 py-2 rounded-lg hover:bg-primary-light transition-all font-medium flex items-center gap-1.5"
            >
              <ShoppingCart size={13} /> Add
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
