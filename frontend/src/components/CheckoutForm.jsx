import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import Message from './Message';

const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#0f172a',
      '::placeholder': { color: '#94a3b8' }
    }
  }
};

function CheckoutForm({ clientSecret, billingName, billingEmail, onPaymentSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setSubmitting(true);
    setError('');

    const cardElement = elements.getElement(CardElement);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: billingName,
          email: billingEmail
        }
      }
    });

    setSubmitting(false);

    if (result.error) {
      setError(result.error.message || 'Payment failed');
      return;
    }

    onPaymentSuccess(result.paymentIntent);
  };

  return (
    <form className="space-y-4" onSubmit={submitHandler}>
      {error && <Message variant="error">{error}</Message>}
      <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
        <CardElement options={cardElementOptions} />
      </div>
      <button type="submit" className="btn-primary w-full" disabled={!stripe || submitting}>
        {submitting ? 'Processing payment...' : 'Pay and place order'}
      </button>
    </form>
  );
}

export default CheckoutForm;
