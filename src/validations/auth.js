import Joi from 'joi';

export const loginAdmin = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
})

export const loginUser = Joi.object({
  usernameOrEmail: Joi.string().required(),
  password: Joi.string().required()
})

