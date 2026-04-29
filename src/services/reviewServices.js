import * as repo from "../repositories/reviewRepo.js";

export const create = (data) => repo.create(data);

export const getAll = () => repo.findAll();

export const getById = (id) => repo.findById(Number(id));

export const update = (id, data) => {
  if (!data || Object.keys(data).length === 0) {
    throw new Error("No update data provided");
  }

  return repo.update(Number(id), data);
};

export const remove = (id) => repo.remove(Number(id));

export const findDuplicate = (userId, gameId) =>
  repo.findByUserAndGame(userId, gameId);