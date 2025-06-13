import Joi from 'joi';

export const adminLoginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const userLoginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const createUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().optional(),
  phone: Joi.string().required(),
  name: Joi.string().required(),
  password: Joi.string().min(6).required(),
});