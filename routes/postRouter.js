import { Router } from "express";
import { create, getAll, getPost, likePost, dislikePost } from "../controllers/postController.js";
import authCheck from "../utils/authCheck.js";

const router = Router();

router.post('/create-post', authCheck, create);
router.post('/get-posts', authCheck, getAll);
router.post('/get-post', authCheck, getPost);
router.post('/like-post', authCheck, likePost);
router.post('/dislike-post', authCheck, dislikePost);

export default router;