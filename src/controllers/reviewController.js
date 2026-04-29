import * as service from "../services/reviewServices.js";

export const create = async (req, res) => {
  try {
    const { gameId, rating, comment } = req.body;

    const existing = await service.findDuplicate(req.user.id, gameId);
    if (existing) {
      return res.status(409).json({ message: "Already reviewed" });
    }

    const review = await service.create({
      userId: req.user.id,
      gameId: Number(gameId),
      rating: Number(rating),
      comment,
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

export const getAll = async (req, res) => {
  const reviews = await service.getAll();
  res.json(reviews);
};

export const getOne = async (req, res) => {
  const review = await service.getById(req.params.id);

  if (!review) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(review);
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
  await service.remove(req.params.id);
  res.json({ message: "Deleted" });
};