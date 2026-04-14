import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/product/productSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductCard from '../components/ProductCard';
import SearchFilters from '../components/SearchFilters';
import Pagination from '../components/Pagination';
import catalogBanner from '../assets/catalog-banner.svg';

const defaultFilters = {
  keyword: '',
  category: '',
  sort: 'latest',
  page: 1
};

function ProductListPage() {
  const [filters, setFilters] = useState(defaultFilters);
  const dispatch = useDispatch();
  const { products, categories, page, pages, loading, error, total } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [dispatch, filters]);

  const changeHandler = (event) => {
    setFilters((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
      page: 1
    }));
  };

  return (
    <div className="container-page page-section space-y-8">
      <section className="grid gap-6 overflow-hidden rounded-[2rem] bg-white/80 p-5 shadow-panel sm:p-6 md:grid-cols-[1fr_320px] md:items-center">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Catalog</p>
          <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">Find products by category, search, and sort.</h1>
          <p className="max-w-2xl text-slate-500">
            Browse a cleaner storefront with built-in discovery tools and a more visual presentation.
          </p>
          <p className="pt-2 text-sm font-semibold text-slate-700">{total} products available</p>
        </div>
        <img src={catalogBanner} alt="Catalog banner" className="w-full rounded-[1.5rem] border border-slate-200" />
      </section>

      <SearchFilters
        filters={filters}
        categories={categories}
        onChange={changeHandler}
        onReset={() => setFilters(defaultFilters)}
      />

      {loading ? <Loader text="Loading products" /> : null}
      {error ? <Message variant="error">{error}</Message> : null}

      {products.length ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="card flex flex-col items-center gap-4 p-10 text-center">
          <img src={catalogBanner} alt="Empty catalog results" className="max-w-md rounded-[1.5rem] border border-slate-200" />
          <div>
            <h2 className="text-2xl font-black text-slate-900">No products matched these filters</h2>
            <p className="mt-2 text-slate-500">Try clearing the search or picking a different category.</p>
          </div>
        </div>
      )}

      <Pagination page={page} pages={pages} onPageChange={(pageNumber) => setFilters((prev) => ({ ...prev, page: pageNumber }))} />
    </div>
  );
}

export default ProductListPage;
