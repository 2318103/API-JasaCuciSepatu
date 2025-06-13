import jwt from 'jsonwebtoken';
import prisma from '../config/config.js';
import { JWT_SECRET } from '../config/config.js';

// Middleware dasar untuk verifikasi token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: 'Access denied. No token provided.' 
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ 
      success: false,
      message: 'Invalid token.' 
    });
  }
};

// Middleware khusus admin
export const needAdmin = async (req, res, next) => {
  verifyToken(req, res, async () => {
    if (req.user?.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. Admin access required.'
      });
    }

    // Optional: Verifikasi admin exists di database
    const admin = await prisma.admin.findUnique({
      where: { id: req.user.sub }
    });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found.'
      });
    }

    next();
  });
};

// Middleware untuk auth umum (user atau admin)
export const needAuth = (roles = []) => (req, res, next) => {
  verifyToken(req, res, () => {
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. Insufficient permissions.'
      });
    }
    next();
  });
};