import { Router } from "express";
import { subscribe, unSubscribe, getSubscribers } from "../controllers/subscribeController.js";
import authCheck from "../utils/authCheck.js";

const router = Router();

router.post('/subscribe', authCheck, subscribe);
router.post('/unsubscribe', authCheck, unSubscribe);
router.post('/get-subscribers', authCheck, getSubscribers);

export default router;