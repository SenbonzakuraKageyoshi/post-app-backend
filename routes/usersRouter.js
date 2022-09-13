import { Router } from "express";
import { getAllUsers, getUser } from "../controllers/usersController.js";
import authCheck from "../utils/authCheck.js";

const router = Router();

router.post('/get-users', getAllUsers);
router.post('/get-user', getUser);

export default router;