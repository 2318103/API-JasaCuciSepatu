import Joi from 'joi';

export const createServiceSchema = Joi.object({
  name: Joi.string().required().max(100),
  price: Joi.number().required().positive(),
  duration: Joi.number().required().integer().min(1),
  description: Joi.string().max(500).optional()
});

export const updateServiceSchema = Joi.object({
  name: Joi.string().max(100),
  price: Joi.number().positive(),
  duration: Joi.number().integer().min(1),
  description: Joi.string().max(500)
}).min(1); // Minimal 1 field di-update