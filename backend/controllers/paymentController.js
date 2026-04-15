import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = asyncHandler(async (req, res) => {
  const { amount } = req.body;

  if (!amount || amount < 1) {
    res.status(400);
    throw new Error('Valid amount is required');
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true
    }
  });

  res.json({
    clientSecret: paymentIntent.client_secret
  });
});

export { createPaymentIntent };
