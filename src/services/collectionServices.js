import * as repo from "../repositories/collectionRepo.js";

export const add = async (data) => {
  return repo.create(data);
};

export const getUser = async (userId) => {
  return repo.findByUser(Number(userId));
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