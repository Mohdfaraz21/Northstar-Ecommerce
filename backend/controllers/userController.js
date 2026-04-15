import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

const getUsers = asyncHandler(async (_req, res) => {
  const users = await User.find({}).select('-password').sort({ createdAt: -1 });
  res.json(users);
});

export { getUsers };
