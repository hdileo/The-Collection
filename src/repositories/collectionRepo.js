import prisma from "../config/prisma.js";

export const create = (data) => {
  return prisma.collection.create({ data });
};

export const findByUser = (userId) => {
  return prisma.collection.findMany({
    where: { userId: Number(userId) },
  });
};

export const findById = (id) => {
  return prisma.collection.findUnique({
    where: { id: Number(id) },
  });
};

export const update = (id, data) => {
  return prisma.collection.update({
    where: { id: Number(id) },
    data,
  });
};

export const remove = (id) => {
  return prisma.collection.delete({
    where: { id: Number(id) },
  });
};