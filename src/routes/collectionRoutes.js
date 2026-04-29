import { Router } from "express";
import * as controller from "../controllers/collectionController.js";
import auth from "../middleware/authMiddleware.js";

const router = Router();

router.use(auth);

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

export default router;