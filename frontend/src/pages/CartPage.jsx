import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../features/cart/cartSlice';
import { currency } from '../utils/format';

function CartPage() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="container-page page-section grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="space-y-5">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Cart</p>
          <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">Your selected items</h1>
        </div>

        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty.{' '}
            <Link to="/products" className="font-semibold text-brand-700">
              Browse products
            </Link>
            .
          </Message>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                onQtyChange={(product, qty) => dispatch(addToCart({ ...product, qty }))}
                onRemove={(id) => dispatch(removeFromCart(id))}
              />
            ))}
          </div>
        )}
      </section>

      <aside className="card h-fit space-y-4 p-5 sm:p-6 lg:sticky lg:top-28">
        <h2 className="text-2xl font-black text-slate-900">Order summary</h2>
        <div className="flex justify-between text-slate-600">
          <span>Items</span>
          <span>{cartItems.reduce((sum, item) => sum + item.qty, 0)}</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Subtotal</span>
          <span>{currency(subtotal)}</span>
        </div>
        <button
          type="button"
          className="btn-primary w-full"
          disabled={!cartItems.length}
          onClick={() => navigate(userInfo ? '/checkout' : '/login')}
        >
          Proceed to checkout
        </button>
      </aside>
    </div>
  );
}

export default CartPage;
