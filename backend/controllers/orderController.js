import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentResult
  } = req.body;

  const updatedProducts = [];

  try {
    if (!orderItems || orderItems.length === 0) {
      res.status(400);
      throw new Error('No order items');
    }

    for (const item of orderItems) {
      const product = await Product.findById(item.product);

      if (!product || product.countInStock < item.qty) {
        res.status(400);
        throw new Error(`Insufficient stock for ${item.name}`);
      }

      product.countInStock -= item.qty;
      await product.save();
      updatedProducts.push({ product, qty: item.qty });
    }

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentResult,
      isPaid: Boolean(paymentResult?.id),
      paidAt: paymentResult?.id ? new Date() : null,
      status: paymentResult?.id ? 'Paid' : 'Processing'
    });

    res.status(201).json(order);
  } catch (error) {
    for (const entry of updatedProducts) {
      entry.product.countInStock += entry.qty;
      await entry.product.save();
    }
    throw error;
  }
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'name email')
    .populate('orderItems.product', 'name image');

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not allowed to access this order');
  }

  res.json(order);
});

const getOrders = asyncHandler(async (_req, res) => {
  const orders = await Order.find({})
    .populate('user', 'name email')
    .sort({ createdAt: -1 });

  res.json(orders);
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  const { status, isDelivered, isPaid } = req.body;

  if (status) {
    order.status = status;
  }

  if (typeof isDelivered === 'boolean') {
    order.isDelivered = isDelivered;
    order.deliveredAt = isDelivered ? new Date() : null;
  }

  if (typeof isPaid === 'boolean') {
    order.isPaid = isPaid;
    order.paidAt = isPaid ? new Date() : null;
  }

  const updatedOrder = await order.save();
  res.json(updatedOrder);
});

export { addOrderItems, getMyOrders, getOrderById, getOrders, updateOrderStatus };
