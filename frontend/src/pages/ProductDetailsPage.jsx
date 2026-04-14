import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails } from '../features/product/productSlice';
import { addToCart } from '../features/cart/cartSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { currency } from '../utils/format';

function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.products);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        ...product,
        qty
      })
    );
  };

  if (loading || !product) {
    return <Loader text="Loading product details" />;
  }

  return (
    <div className="container-page space-y-8">
      {error ? <Message variant="error">{error}</Message> : null}

      <Link to="/products" className="btn-secondary">
        Back to products
      </Link>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="card overflow-hidden">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>
        <div className="card space-y-6 p-6">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-600">{product.category}</p>
            <h1 className="text-4xl font-black text-slate-900">{product.name}</h1>
            <p className="text-slate-500">{product.brand}</p>
          </div>
          <p className="text-base leading-7 text-slate-600">{product.description}</p>
          <div className="grid grid-cols-2 gap-4 rounded-3xl bg-slate-50 p-5">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Price</p>
              <p className="text-2xl font-black text-brand-900">{currency(product.price)}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Availability</p>
              <p className="text-lg font-bold text-slate-900">{product.countInStock} in stock</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            <select
              className="input md:max-w-[150px]"
              value={qty}
              onChange={(event) => setQty(Number(event.target.value))}
              disabled={product.countInStock === 0}
            >
              {Array.from({ length: product.countInStock }, (_, index) => index + 1).map((count) => (
                <option key={count} value={count}>
                  Qty: {count}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="btn-primary flex-1"
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
            >
              {product.countInStock === 0 ? 'Out of stock' : 'Add to cart'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetailsPage;
