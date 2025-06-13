import prisma from '../config/config.js';

export const createService = async (req, res) => {
  const { name, price, duration, description } = req.body;
  
  const service = await prisma.service.create({
    data: { name, price, duration, description }
  });

  res.status(201).json({ service });
};

export const getServices = async (req, res) => {
    const services = await prisma.service.findMany();
    res.json({ services });
};

export const getService = async (req, res) => {
    const { id } = req.params;
    const service = await prisma.service.findUnique({
        where: { id: parseInt(id, 10) }
    });

    if (!service) {
        return res.status(404).json({ message: 'Service not found' });
    }

    res.json({ service });
};

export const updateService = async (req, res) => {
const { id } = req.params;

const service = await prisma.service.update({
    where: { id: parseInt(id, 10) },
    data: req.body
});

  res.json({ service });
};

export const deleteService = async (req, res) => {
  await prisma.service.delete({
    where: { id: parseInt(req.params.id) },
  });
  
  res.json({ message: 'Service deleted' });
};