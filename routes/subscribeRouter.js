import { Router } from "express";
import { subscribe, unSubscribe } from "../controllers/subscribeController.js";
import authCheck from "../utils/authCheck.js";

const router = Router();

router.post('/subscribe', authCheck, subscribe);
router.post('/unsubscribe', authCheck, unSubscribe);

export default router;