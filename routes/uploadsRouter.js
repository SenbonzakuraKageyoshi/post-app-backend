import { Router } from "express";
import { avatarUpload, removeAvatar } from "../controllers/uploadsController.js";

const router = Router();

router.post('/avatar-upload', avatarUpload);
router.post('/avatar-remove', removeAvatar);

export default router;