import { Router } from 'express';
import { createService, getServices, getService, updateService, deleteService } from '../controllers/service.js';
import { validate } from '../middlewares/validate.js';
import { createServiceSchema, updateServiceSchema } from '../validations/service.js';
import { needAdmin } from '../middlewares/auth.js';

const router = Router();

// Public routes
router.get('/', getServices);
router.get('/:id', getService);

// Admin routes
router.post('/', needAdmin, validate(createServiceSchema), createService);
router.put('/:id', needAdmin, validate(updateServiceSchema), updateService);
router.delete('/:id', needAdmin, deleteService);

export default router;