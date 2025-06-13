import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export const verifyToken = (role) => (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  
  if (!token) {
    return res.status(401).json({ error: 'Akses ditolak, token diperlukan' })
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret)
    
    if (decoded.role !== role) {
      return res.status(403).json({ error: 'Akses terlarang untuk role ini' })
    }

    req[role] = decoded
    next()
  } catch (err) {
    res.status(401).json({ error: 'Token tidak valid' })
  }
}

export const verifyAdmin = verifyToken('admin')
export const verifyUser = verifyToken('user')