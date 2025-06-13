import app from './app.js';
import prisma from './config/config.js';

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle Prisma shutdown
process.on('SIGTERM', () => {
  prisma.$disconnect()
    .then(() => {
      server.close(() => {
        console.log('Server closed');
      });
    });
});