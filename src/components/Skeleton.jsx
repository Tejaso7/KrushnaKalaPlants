// components/Skeleton.jsx
// Reusable skeleton loading placeholders
const Skeleton = ({ className = '' }) => (
  <div className={`skeleton ${className}`}>&nbsp;</div>
);

// Product card skeleton
export const ProductCardSkeleton = () => (
  <div className="bg-bg-card dark:bg-dark-card rounded-2xl shadow-md overflow-hidden">
    <Skeleton className="h-56 w-full rounded-none" />
    <div className="p-4 space-y-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-1/2" />
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>
    </div>
  </div>
);

// Product detail skeleton
export const ProductDetailSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <Skeleton className="h-96 w-full" />
    <div className="space-y-4 p-4">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-10 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-10 w-32 rounded-full" />
      <Skeleton className="h-12 w-40 rounded-full" />
    </div>
  </div>
);

export default Skeleton;
