import * as service from "../services/gameServices.js";

export const create = async (req, res) => {
  try {
    const { title, genre, platform, releaseYear } = req.body;

    if (!title || !genre || !platform || !releaseYear) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const game = await service.create({
      title,
      genre,
      platform,
      releaseYear: Number(releaseYear),
    });

    res.status(201).json(game);
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

export const getAll = async (req, res) => {
  const games = await service.getAll();
  res.json(games);
};

export const getOne = async (req, res) => {
  const game = await service.getById(req.params.id);

  if (!game) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(game);
};

export const update = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No update data provided" });
    }

    const updated = await service.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Update failed" });
  }
};

export const remove = async (req, res) => {
  try {
    const deleted = await service.remove(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(400).json({ message: "Delete failed" });
  }
};