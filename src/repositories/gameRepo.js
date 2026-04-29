import prisma from "../config/prisma.js";

export const create = (data) => {
  return prisma.game.create({ data });
};

export const findAll = () => {
  return prisma.game.findMany();
};

export const findById = (id) => {
  return prisma.game.findUnique({
    where: { id: Number(id) },
  });
};

export const update = (id, data) => {
  return prisma.game.update({
    where: { id: Number(id) },
    data,
  });
};

export const remove = (id) => {
  return prisma.game.delete({
    where: { id: Number(id) },
  });
};