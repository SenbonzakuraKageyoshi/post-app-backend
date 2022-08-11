import { Router } from "express";
import { avatarUpload, removeAvatar, postImagesUpload, removePostImg } from "../controllers/uploadsController.js";

const router = Router();

router.post('/avatar-upload', avatarUpload);
router.post('/avatar-remove', removeAvatar);
router.post('/post-img-upload', postImagesUpload);
router.post('/post-img-remove', removePostImg);

export default router;