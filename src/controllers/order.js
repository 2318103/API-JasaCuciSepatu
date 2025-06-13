import prisma from '../config/config.js';

// Helper: Cari user by username/phone
const findUser = async (identifier) => {
  return await prisma.user.findFirst({
    where: {
      OR: [
        { username: identifier },
        { phone: identifier }
      ]
    }
  });
};

// 1. BUAT ORDER (Admin Only)
export const createOrder = async (req, res, next) => {
  try {
    const { userIdentifier, serviceId, notes } = req.body; // Gunakan userIdentifier (username/phone)

    // Validasi service
    const service = await prisma.service.findUnique({ 
      where: { id: serviceId } 
    });
    if (!service) {
      return res.status(404).json({ 
        error: 'Service tidak ditemukan',
        solution: 'Pastikan serviceId valid'
      });
    }

    // Cari user by username/phone
    const user = await findUser(userIdentifier);
    if (!user) {
      return res.status(404).json({ 
        error: 'Customer tidak terdaftar',
        solution: 'Daftarkan customer via POST /auth/user/register'
      });
    }

    // Buat order
    const order = await prisma.order.create({
      data: {
        userId: user.id, // Simpan userId internal
        serviceId,
        notes,
        status: 'RECEIVED',

      },
      include: {
        service: { select: { name: true, price: true } },
        user: { select: { username: true, phone: true } }
      }
    });

    res.status(201).json({ 
      success: true,
      data: {
        ...order,
        customer: order.user // Tambahkan alias untuk response
      }
    });

  } catch (error) {
    next(error);
  }
};

// 2. GET ALL ORDERS (Admin: semua order, User: order miliknya)
export const getOrders = async (req, res, next) => {
  try {
    const whereClause = req.user.role === 'ADMIN' 
      ? {} 
      : { userId: req.user.sub };

    const orders = await prisma.order.findMany({
      where: whereClause,
      include: {
        service: { select: { name: true, price: true } },
        user: { select: { name: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ 
      success: true,
      data: orders 
    });
  } catch (error) {
    next(error);
  }
};

// 3. GET ORDER DETAIL (Admin atau User pemilik order)
export const getOrderDetail = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: {
        service: { select: { name: true, duration: true } },
        user: { select: { name: true, phone: true } }
      }
    });

    // Validasi kepemilikan order (khusus user)
    if (req.user.role === 'USER' && order.userId !== req.user.sub) {
      return res.status(403).json({ 
        success: false,
        error: 'Akses ditolak. Order tidak ditemukan atau bukan milik Anda' 
      });
    }

    if (!order) {
      return res.status(404).json({ 
        success: false,
        error: 'Order tidak ditemukan' 
      });
    }

    res.json({ 
      success: true,
      data: order 
    });
  } catch (error) {
    next(error);
  }
};

// 4. UPDATE STATUS (Admin Only)
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { status },
      include: { service: { select: { name: true } } }
    });

    res.json({ 
      success: true,
      data: order,
      message: 'Status order berhasil diperbarui'
    });
  } catch (error) {
    next(error);
  }
};

// 5. DELETE ORDER (Admin Only)
export const deleteOrder = async (req, res, next) => {
  try {
    await prisma.order.delete({
      where: { id: parseInt(req.params.id) }
    });

    res.json({ 
      success: true,
      message: 'Order berhasil dihapus' 
    });
  } catch (error) {
    next(error);
  }
};