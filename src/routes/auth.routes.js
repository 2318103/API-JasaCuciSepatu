import express from 'express'
import { validate } from '../middlewares/validate.js'
import { loginAdminController, loginUserController } from '../controllers/auth.js'
import { loginAdmin, loginUser } from '../validations/auth.js'

const router = express.Router()

router.post('/admin/login', 
  validate(loginAdmin), 
  loginAdminController
)

router.post('/user/login',
  validate(loginUser),
  loginUserController
)

export default router