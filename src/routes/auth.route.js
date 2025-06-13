import express from 'express';
import { needAdmin, needAuth } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { adminLogin, userLogin, registerUser } from '../controllers/auth.js';
import { adminLoginSchema, userLoginSchema, createUserSchema } from '../validations/auth.js';

const router = express.Router();

// Public routes
router.post('/admin/login', validate(adminLoginSchema), adminLogin);
router.post('/user/login', validate(userLoginSchema), userLogin);

// Protected routes
router.post('/user/register', needAdmin, validate(createUserSchema), registerUser);

export default router;