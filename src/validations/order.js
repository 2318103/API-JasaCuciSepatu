import Joi from 'joi';

export const createOrderSchema = Joi.object({
  userIdentifier: Joi.string().required().max(50),
  serviceId: Joi.number().integer().positive().required(),
  notes: Joi.string().max(500).optional()
});

export const updateOrderSchema = Joi.object({
  status: Joi.string().valid(
    'RECEIVED', 
    'IN_PROGRESS', 
    'READY_FOR_PICKUP', 
    'COMPLETED', 
    'CANCELLED'
  ).required()
});