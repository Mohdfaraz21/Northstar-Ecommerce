import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeaturedProducts } from '../features/product/productSlice';
import ProductCard from '../components/ProductCard';
import heroIllustration from '../assets/hero-illustration.svg';

const shoppingCategories = [
  { name: 'Audio', blurb: 'Headphones, speakers, and listening gear' },
  { name: 'Home', blurb: 'Decor, lighting, and comfort upgrades' },
  { name: 'Fitness', blurb: 'Workout essentials for active shoppers' },
  { name: 'Travel', blurb: 'Luggage, bags, and on-the-go accessories' },
  { name: 'Clothing', blurb: 'Everyday wear with clean modern styling' },
  { name: 'Beauty', blurb: 'Self-care and skincare product picks' }
];

function HomePage() {
  const dispatch = useDispatch();
  const { featuredProducts } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  return (
    <div className="container-page page-section space-y-12">
      <section className="grid gap-8 overflow-hidden rounded-[2rem] bg-brand-900 px-5 py-8 text-white shadow-panel sm:px-6 md:grid-cols-[1.08fr_0.92fr] md:px-10 md:py-10 xl:min-h-[70vh] xl:items-center 2xl:px-14">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/80">
            Modern MERN Storefront
          </span>
          <h1 className="max-w-2xl text-3xl font-black leading-tight sm:text-4xl md:text-6xl xl:text-7xl">
            Launch a polished eCommerce experience with real checkout and admin tooling.
          </h1>
          <p className="max-w-2xl text-base text-slate-200 md:text-lg xl:text-xl">
            Explore curated products, persistent carts, secure JWT auth, Stripe payments, and an admin dashboard that is ready for real product management.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/products" className="btn rounded-full bg-accent text-white hover:opacity-90">
              Browse products
            </Link>
            <Link to="/admin" className="btn rounded-full bg-white/10 text-white hover:bg-white/20">
              Admin dashboard
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/25 blur-3xl" />
          <div className="card relative overflow-hidden border-white/10 bg-white/10 p-4 text-white">
            <img
              src={heroIllustration}
              alt="Storefront dashboard illustration"
              className="w-full rounded-[1.5rem] border border-white/10 bg-white/5"
            />
            <div className="mt-4 grid grid-cols-2 gap-3 text-left text-sm">
              <div className="rounded-2xl bg-white/10 p-4">JWT Auth</div>
              <div className="rounded-2xl bg-white/10 p-4">Stripe Checkout</div>
              <div className="rounded-2xl bg-white/10 p-4">Cloudinary Uploads</div>
              <div className="rounded-2xl bg-white/10 p-4">Admin Controls</div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Featured collection</p>
            <h2 className="text-3xl font-black text-slate-900">Customer favorites</h2>
          </div>
          <Link to="/products" className="btn-secondary">
            View all
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Shop by category</p>
          <h2 className="text-3xl font-black text-slate-900">Something for every kind of shopper</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          {shoppingCategories.map((category) => (
            <Link
              key={category.name}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="card group p-6 transition duration-200 hover:-translate-y-1 hover:border-brand-100"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-brand-600">{category.name}</p>
              <h3 className="mt-3 text-2xl font-black text-slate-900">{category.name} Essentials</h3>
              <p className="mt-2 text-slate-500">{category.blurb}</p>
              <span className="mt-5 inline-flex text-sm font-semibold text-brand-700 group-hover:text-brand-900">
                Explore category
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
