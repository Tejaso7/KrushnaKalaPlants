// pages/Products.jsx
// Product listing with category filter and price sort
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import API from '../services/api';
import ProductCard from '../components/ProductCard';
import { ChevronRight, SlidersHorizontal } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [sort, setSort] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {};
        if (category) params.category = category;
        if (sort) params.sort = sort;
        const res = await API.get('/products', { params });
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category, sort]);

  const handleCategoryChange = (val) => {
    setCategory(val);
    if (val) {
      setSearchParams({ category: val });
    } else {
      setSearchParams({});
    }
  };

  const categories = ['', 'Fruit Plants', 'Vegetable Plants', 'Spice Plants', 'Flowering & Ornamental', 'Plantation Crops', 'Other Crops'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-text-muted mb-5">
        <Link to="/" className="hover:text-primary transition">Home</Link>
        <ChevronRight size={12} />
        <span className="text-text-primary font-medium">{category || 'All Plants'}</span>
      </nav>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">{category || 'All Plants'}</h1>
          {!loading && <p className="text-sm text-text-muted mt-0.5">{products.length} products found</p>}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-sm text-text-muted">
            <SlidersHorizontal size={14} />
            <span className="hidden sm:inline">Filter:</span>
          </div>
          <select
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="border border-border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
          >
            <option value="">All Categories</option>
            {categories.filter(Boolean).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
          >
            <option value="">Sort by Price</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-3 border-primary border-t-transparent"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-text-muted text-lg">No products found.</p>
          <button onClick={() => handleCategoryChange('')} className="mt-3 text-sm text-primary hover:underline">Clear filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
