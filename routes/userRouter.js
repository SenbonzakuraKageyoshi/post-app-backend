import { Router } from "express";
import { register, upload } from "../controllers/userController.js";

const router = Router();

router.post('/register', register);
router.post('/upload', upload);

export default router;