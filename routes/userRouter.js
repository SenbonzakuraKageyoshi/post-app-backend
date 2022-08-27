import { Router } from "express";
import { register, login, getMe } from "../controllers/userController.js";
import authCheck from "../utils/authCheck.js";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/me', getMe);
router.post('/user-likes', authCheck, getMe);

export default router;