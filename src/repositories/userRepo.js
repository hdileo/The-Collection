import prisma from "../config/prisma.js";

export const findByEmail = (email) =>
  prisma.user.findUnique({ where: { email } });

export const create = (data) =>
  prisma.user.create({ data });