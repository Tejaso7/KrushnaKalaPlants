// components/Skeleton.jsx
const Skeleton = ({ className = '' }) => (
  <div className={`skeleton ${className}`}>&nbsp;</div>
);

export const ProductCardSkeleton = () => (
  <div className="bg-white rounded-xl border border-border overflow-hidden">
    <Skeleton className="h-52 w-full rounded-none" />
    <div className="p-4 space-y-3">
      <Skeleton className="h-3 w-1/3" />
      <Skeleton className="h-4 w-3/4" />
      <div className="border-t border-border pt-3 flex justify-between items-center">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
    </div>
  </div>
);

export const ProductDetailSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <Skeleton className="aspect-square w-full rounded-xl" />
    <div className="space-y-4 py-4">
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-8 w-28" />
      <Skeleton className="h-11 w-40 rounded-lg" />
    </div>
  </div>
);

export default Skeleton;
