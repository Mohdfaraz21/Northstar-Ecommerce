import { Link } from 'react-router-dom';
import { currency } from '../utils/format';

function ProductCard({ product }) {
  return (
    <article className="card group overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/70">
      <Link to={`/products/${product._id}`} className="block aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="space-y-3 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
          <span>{product.category}</span>
          <span>{product.brand}</span>
        </div>
        <Link
          to={`/products/${product._id}`}
          className="block text-lg font-bold text-slate-900 transition duration-300 group-hover:text-brand-700"
        >
          {product.name}
        </Link>
        <p className="min-h-[60px] text-sm leading-6 text-slate-500">
          {product.description.length > 90
            ? `${product.description.slice(0, 90)}...`
            : product.description}
        </p>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xl font-black text-brand-900">{currency(product.price)}</span>
          <span className="text-sm text-slate-500">{product.countInStock} in stock</span>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
