import * as authService from '../services/auth.js';
import { adminLoginSchema, userLoginSchema, createUserSchema } from '../validations/auth.js';

export const adminLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    
    const { token, admin } = await authService.loginAdmin(username, password);
    
    res.json({ 
      success: true,
      data: { token, admin }
    });
  } catch (error) {
    next(error);
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    
    const { token, user } = await authService.loginUser(username, password);
    
    res.json({ 
      success: true,
      data: { token, user }
    });
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (req, res, next) => {
  try {
    const userData = req.body;
    
    const user = await authService.createUser(userData);
    
    res.status(201).json({
      success: true,
      data: { 
        id: user.id,
        username: user.username,
        name: user.name
      }
    });
  } catch (error) {
    next(error);
  }
};