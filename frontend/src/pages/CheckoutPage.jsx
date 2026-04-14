import { useEffect, useMemo, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import Message from '../components/Message';
import { saveShippingAddress, clearCart } from '../features/cart/cartSlice';
import { createOrder, createPaymentIntent, resetOrderState } from '../features/order/orderSlice';
import { currency } from '../utils/format';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, shippingAddress } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const { clientSecret, loading, error, success, order } = useSelector((state) => state.orders);
  const [address, setAddress] = useState(
    shippingAddress || {
      fullName: userInfo?.name || '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
      phone: ''
    }
  );

  const itemsPrice = useMemo(
    () => Number(cartItems.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)),
    [cartItems]
  );
  const shippingPrice = itemsPrice > 250 ? 0 : 15;
  const taxPrice = Number((itemsPrice * 0.12).toFixed(2));
  const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

  useEffect(() => {
    if (!cartItems.length) {
      navigate('/cart');
      return;
    }

    dispatch(createPaymentIntent(Math.round(totalPrice * 100)));
    return () => {
      dispatch(resetOrderState());
    };
  }, [cartItems.length, dispatch, navigate, totalPrice]);

  useEffect(() => {
    if (success && order) {
      dispatch(clearCart());
      navigate('/profile');
    }
  }, [success, order, dispatch, navigate]);

  const changeHandler = (event) => {
    setAddress((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const paymentSuccessHandler = async (paymentIntent) => {
    dispatch(saveShippingAddress(address));
    await dispatch(
      createOrder({
        orderItems: cartItems.map((item) => ({
          product: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          qty: item.qty
        })),
        shippingAddress: address,
        paymentMethod: 'Stripe',
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        paymentResult: {
          id: paymentIntent.id,
          status: paymentIntent.status,
          emailAddress: userInfo.email
        }
      })
    );
  };

  return (
    <div className="container-page page-section grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="card space-y-5 p-5 sm:p-6">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Checkout</p>
          <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">Shipping and payment</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <input className="input" name="fullName" value={address.fullName} onChange={changeHandler} placeholder="Full name" required />
          <input className="input" name="phone" value={address.phone} onChange={changeHandler} placeholder="Phone" required />
          <input className="input md:col-span-2" name="address" value={address.address} onChange={changeHandler} placeholder="Street address" required />
          <input className="input" name="city" value={address.city} onChange={changeHandler} placeholder="City" required />
          <input className="input" name="postalCode" value={address.postalCode} onChange={changeHandler} placeholder="Postal code" required />
          <input className="input md:col-span-2" name="country" value={address.country} onChange={changeHandler} placeholder="Country" required />
        </div>

        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-amber-700">Test Payment Details</p>
          <div className="mt-4 grid gap-3 text-sm text-slate-700 md:grid-cols-2">
            <div className="rounded-2xl bg-white px-4 py-3">
              <span className="block text-xs uppercase tracking-[0.2em] text-slate-400">Card number</span>
              <span className="mt-1 block font-semibold">4242 4242 4242 4242</span>
            </div>
            <div className="rounded-2xl bg-white px-4 py-3">
              <span className="block text-xs uppercase tracking-[0.2em] text-slate-400">Expiry</span>
              <span className="mt-1 block font-semibold">Any future date</span>
            </div>
            <div className="rounded-2xl bg-white px-4 py-3">
              <span className="block text-xs uppercase tracking-[0.2em] text-slate-400">CVC</span>
              <span className="mt-1 block font-semibold">Any 3 digits</span>
            </div>
            <div className="rounded-2xl bg-white px-4 py-3">
              <span className="block text-xs uppercase tracking-[0.2em] text-slate-400">Postal code</span>
              <span className="mt-1 block font-semibold">Any valid value</span>
            </div>
          </div>
          <p className="mt-3 text-sm text-amber-800">
            Use these Stripe test details for demo shopping only. No real money is charged in test mode.
          </p>
        </div>

        {error ? <Message variant="error">{error}</Message> : null}

        {clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm
              clientSecret={clientSecret}
              billingName={address.fullName}
              billingEmail={userInfo.email}
              onPaymentSuccess={paymentSuccessHandler}
            />
          </Elements>
        ) : (
          <Message>{loading ? 'Preparing secure payment form...' : 'Stripe is not configured yet.'}</Message>
        )}
      </section>

      <aside className="card h-fit space-y-4 p-5 sm:p-6 lg:sticky lg:top-28">
        <h2 className="text-2xl font-black text-slate-900">Summary</h2>
        {cartItems.map((item) => (
          <div key={item._id} className="flex items-center justify-between text-sm text-slate-600">
            <span>
              {item.name} x {item.qty}
            </span>
            <span>{currency(item.price * item.qty)}</span>
          </div>
        ))}
        <div className="border-t border-slate-200 pt-4 text-sm text-slate-600">
          <div className="flex justify-between">
            <span>Items</span>
            <span>{currency(itemsPrice)}</span>
          </div>
          <div className="mt-2 flex justify-between">
            <span>Shipping</span>
            <span>{currency(shippingPrice)}</span>
          </div>
          <div className="mt-2 flex justify-between">
            <span>Tax</span>
            <span>{currency(taxPrice)}</span>
          </div>
        </div>
        <div className="flex justify-between text-lg font-black text-slate-900">
          <span>Total</span>
          <span>{currency(totalPrice)}</span>
        </div>
      </aside>
    </div>
  );
}

export default CheckoutPage;
