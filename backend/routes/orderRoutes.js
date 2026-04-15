import express from 'express';
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderStatus
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, addOrderItems);
router.get('/my-orders', protect, getMyOrders);
router.get('/admin/all', protect, admin, getOrders);
router.route('/:id').get(protect, getOrderById).put(protect, admin, updateOrderStatus);

export default router;
