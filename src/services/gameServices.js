import * as repo from "../repositories/gameRepo.js";

export const create = async (data) => {
  return repo.create(data);
};

export const getAll = async () => {
  return repo.findAll();
};

export const getById = async (id) => {
  return repo.findById(Number(id));
};

export const update = async (id, data) => {
  if (!data || Object.keys(data).length === 0) {
    throw new Error("No update data provided");
  }

  return repo.update(Number(id), data);
};

export const remove = async (id) => {
  return repo.remove(Number(id));
};