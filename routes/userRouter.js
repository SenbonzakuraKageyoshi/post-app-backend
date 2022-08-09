import { Router } from "express";
import { register, getMe } from "../controllers/userController.js";

const router = Router();

router.post('/register', register);
router.post('/me', getMe);

export default router;