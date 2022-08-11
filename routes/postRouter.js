import { Router } from "express";
import { create } from "../controllers/postController.js";

const router = Router();

router.post('/create-post', create);

export default router;