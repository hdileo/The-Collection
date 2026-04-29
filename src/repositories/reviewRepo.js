import prisma from "../config/prisma.js";

export const create = (data) => {
  return prisma.review.create({ data });
};

export const findAll = () => {
  return prisma.review.findMany();
};

export const findById = (id) => {
  return prisma.review.findUnique({
    where: { id: Number(id) },
  });
};

export const update = (id, data) => {
  return prisma.review.update({
    where: { id: Number(id) },
    data,
  });
};

export const remove = (id) => {
  return prisma.review.delete({
    where: { id: Number(id) },
  });
};

export const findByUserAndGame = (userId, gameId) => {
  return prisma.review.findFirst({
    where: {
      userId: Number(userId),
      gameId: Number(gameId),
    },
  });
};