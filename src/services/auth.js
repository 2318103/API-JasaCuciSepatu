import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/config.js';
import { JWT_SECRET, JWT_EXPIRES_IN, BCRYPT_SALT_ROUNDS } from '../config/config.js';

export const loginAdmin = async (username, password) => {
  const admin = await prisma.admin.findUnique({ where: { username } });
  
  if (!admin) {
    throw new Error('Admin not found');
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ sub: admin.id, role: 'ADMIN' }, JWT_SECRET, { 
    expiresIn: JWT_EXPIRES_IN 
  });

  return { token, admin: { id: admin.id, username: admin.username } };
};

export const loginUser = async (username, password) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { username },
        { email: username }
      ]
    }
  });

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ sub: user.id, role: 'USER' }, JWT_SECRET, { 
    expiresIn: JWT_EXPIRES_IN 
  });

  return { 
    token, 
    user: { 
      id: user.id, 
      username: user.username,
      name: user.name
    } 
  };
};

export const createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, BCRYPT_SALT_ROUNDS);
  
  return prisma.user.create({
    data: {
      ...userData,
      password: hashedPassword
    }
  });
};