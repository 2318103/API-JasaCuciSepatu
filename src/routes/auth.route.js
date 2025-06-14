import express from 'express';
import { needAdmin, needAuth } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { adminLogin, userLogin, registerUser } from '../controllers/auth.js';
import { adminLoginSchema, userLoginSchema, createUserSchema } from '../validations/auth.js';
import { getAllUsers } from '../controllers/user.js';

const router = express.Router();

// Public routes
router.post('/admin/login', validate(adminLoginSchema), adminLogin);
router.post('/login', validate(userLoginSchema), userLogin);
router.get('/customers', needAdmin, getAllUsers);

// Protected routes
router.post('/admin/register-user', needAdmin, validate(createUserSchema), registerUser);

export default router;