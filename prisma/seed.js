import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { BCRYPT_SALT_ROUNDS } from '../src/config/config.js';

const prisma = new PrismaClient();

async function main() {
  const adminData = {
    username: 'admin',
    password: await bcrypt.hash('admin123', BCRYPT_SALT_ROUNDS),
  };

  // Cek apakah admin sudah ada
  const existingAdmin = await prisma.admin.findUnique({
    where: { username: adminData.username },
  });

  if (!existingAdmin) {
    await prisma.admin.create({
      data: adminData,
    });
    console.log('Admin seed created successfully');
  } else {
    console.log('Admin already exists');
  }
}

main()
  .catch((e) => {
    console.error('Seeder error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });