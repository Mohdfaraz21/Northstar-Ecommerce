import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Order from '../models/Order.js';
import users from './users.js';
import products from './products.js';

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = [];
    for (const user of users) {
      const createdUser = await User.create(user);
      createdUsers.push(createdUser);
    }
    const adminUser = createdUsers.find((user) => user.role === 'admin');

    for (const product of products) {
      await Product.create({
        ...product,
        user: adminUser?._id
      });
    }

    console.log('Data imported');
    await mongoose.connection.close();
  } catch (error) {
    console.error(`Seed import failed: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log('Data destroyed');
    await mongoose.connection.close();
  } catch (error) {
    console.error(`Seed destroy failed: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  await destroyData();
} else {
  await importData();
}
