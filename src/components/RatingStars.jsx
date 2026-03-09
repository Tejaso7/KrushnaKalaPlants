// components/RatingStars.jsx
// Displays star rating with review count
import { Star } from 'lucide-react';

const RatingStars = ({ rating = 4.5, reviews = 0, size = 'sm' }) => {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);
  const iconSize = size === 'lg' ? 18 : 14;

  return (
    <div className="flex items-center gap-0.5">
      <div className="flex">
        {[...Array(full)].map((_, i) => <Star key={`f${i}`} size={iconSize} className="text-gold fill-gold" />)}
        {hasHalf && <Star size={iconSize} className="text-gold fill-gold" />}
        {[...Array(empty)].map((_, i) => <Star key={`e${i}`} size={iconSize} className="text-gray-300" />)}
      </div>
      {reviews > 0 && (
        <span className="text-xs text-text-light ml-1">({reviews})</span>
      )}
    </div>
  );
};

export default RatingStars;
