// components/RatingStars.jsx
// Displays star rating with review count
const RatingStars = ({ rating = 4.5, reviews = 0, size = 'sm' }) => {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);
  const sizeClass = size === 'lg' ? 'text-xl' : 'text-sm';

  return (
    <div className="flex items-center gap-1">
      <div className={`flex ${sizeClass} text-gold`}>
        {[...Array(full)].map((_, i) => <span key={`f${i}`}>★</span>)}
        {hasHalf && <span>★</span>}
        {[...Array(empty)].map((_, i) => <span key={`e${i}`} className="text-gray-300">★</span>)}
      </div>
      {reviews > 0 && (
        <span className="text-xs text-text-light ml-1">({reviews})</span>
      )}
    </div>
  );
};

export default RatingStars;
