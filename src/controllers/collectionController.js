import * as service from "../services/collectionServices.js";

export const create = async (req, res) => {
  try {
    const { gameId, status, hoursPlayed } = req.body;

    if (!gameId || !status) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const collection = await service.add({
      userId: req.user.id,
      gameId: Number(gameId),
      status,
      hoursPlayed: hoursPlayed ? Number(hoursPlayed) : null,
    });

    res.status(201).json(collection);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Bad request" });
  }
};

export const getAll = async (req, res) => {
  const data = await service.getUser(req.user.id);
  res.json(data);
};

export const getOne = async (req, res) => {
  const item = await service.getById(req.params.id);

  if (!item) {
    return res.status(404).json({ message: "Not found" });
  }

  if (item.userId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  res.json(item);
};

export const update = async (req, res) => {
  try {
    const item = await service.getById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Not found" });
    }

    if (item.userId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No update data provided" });
    }

    const updated = await service.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Update failed" });
  }
};

export const remove = async (req, res) => {
  try {
    const item = await service.getById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Not found" });
    }

    if (item.userId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await service.remove(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed" });
  }
};