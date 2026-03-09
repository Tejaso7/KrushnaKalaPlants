// pages/Products.jsx
// Product listing with category filter and price sort
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../services/api';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [sort, setSort] = useState('');

  // Fetch products on mount and when filters change
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

  // Update URL params when category changes
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary-dark mb-6">Our Plants</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <select
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="border border-primary/30 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">All Categories</option>
          {categories.filter(Boolean).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-primary/30 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Sort by Price</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-text-light py-20 text-lg">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
