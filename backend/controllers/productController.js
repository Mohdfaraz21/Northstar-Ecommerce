import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';

const buildProductQuery = (query) => {
  const filter = {};

  if (query.keyword) {
    filter.name = { $regex: query.keyword, $options: 'i' };
  }

  if (query.category) {
    filter.category = query.category;
  }

  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
  }

  return filter;
};

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.limit) || 8;
  const page = Number(req.query.page) || 1;
  const sort = req.query.sort || 'latest';
  const filter = buildProductQuery(req.query);

  const sortMap = {
    latest: { createdAt: -1 },
    price_asc: { price: 1 },
    price_desc: { price: -1 },
    rating: { rating: -1 }
  };

  const count = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .sort(sortMap[sort] || sortMap.latest)
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  const categories = await Product.distinct('category');

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
    total: count,
    categories
  });
});

const getFeaturedProducts = asyncHandler(async (_req, res) => {
  const products = await Product.find({ featured: true }).limit(4);
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json(product);
});

const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  Object.assign(product, req.body);
  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  await product.deleteOne();
  res.json({ message: 'Product removed' });
});

export {
  getProducts,
  getFeaturedProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
