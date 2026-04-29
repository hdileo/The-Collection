import { Router } from "express";
import * as controller from "../controllers/authController.js";

const router = Router();

router.post("/signup", controller.signup);
router.post("/login", controller.login);

export default router;