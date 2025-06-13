import { Router } from 'express';
import { createOrder, getOrders, getOrderDetail, updateOrderStatus, deleteOrder } from '../controllers/order.js';
import { validate } from '../middlewares/validate.js';
import { createOrderSchema, updateOrderSchema } from '../validations/order.js';
import { needAuth, needAdmin } from '../middlewares/auth.js';

const router = Router();

// User Routes
router.get('/', needAuth(), getOrders);
router.get('/:id', needAuth(), getOrderDetail);

// Admin Routes
router.post('/', needAdmin, validate(createOrderSchema), createOrder);
router.patch('/:id/status', needAdmin, validate(updateOrderSchema), updateOrderStatus);
router.delete('/:id', needAdmin, deleteOrder);

export default router;