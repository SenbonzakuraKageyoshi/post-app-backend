import { Router } from "express";
import { getAllUsers } from "../controllers/usersController.js";
import authCheck from "../utils/authCheck.js";

const router = Router();

router.post('/get-users', getAllUsers);

export default router;