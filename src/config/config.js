import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const JWT_SECRET = process.env.JWT_SECRET || 'your-very-secure-secret';
export const JWT_EXPIRES_IN = '1d';
export const BCRYPT_SALT_ROUNDS = 10;
export default prisma;

