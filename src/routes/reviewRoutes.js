import { Router } from "express";
import * as controller from "../controllers/reviewController.js";
import auth from "../middleware/authMiddleware.js";

const router = Router();

// Public
router.get("/", controller.getAll);
router.get("/:id", controller.getOne);

// Protected
router.post("/", auth, controller.create);
router.put("/:id", auth, controller.update);
router.delete("/:id", auth, controller.remove);

export default router;