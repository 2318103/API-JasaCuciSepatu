import prisma from '../config/config.js';

export const createOrder = async (req, res) => {
  const { serviceId, notes } = req.body;

  // Validasi service aktif
  const service = await prisma.service.findUnique({
    where: { id: serviceId, isActive: true }
  });

  if (!service) {
    return res.status(400).json({
      error: 'Service tidak tersedia atau tidak aktif'
    });
  }

  // Buat order
  const order = await prisma.order.create({
    data: {
      userId: req.user.sub,
      serviceId,
      notes,
      status: 'RECEIVED'
    },
    include: {
      service: true,  // Include data service
      user: { select: { name: true, phone: true } }
    }
  });

  res.status(201).json({ order });
};

export const getOrders = async (req, res) => {
  const orders = await prisma.order.findMany({
    where: {
      // Filter berdasarkan role:
      ...(req.user.role === 'USER' ? { userId: req.user.sub } : {})
    },
    include: {
      service: { select: { name: true, price: true, duration: true } },
      user: { select: { name: true, phone: true } }
    },
    orderBy: { createdAt: 'desc' }
  });

  res.json({ orders });
};