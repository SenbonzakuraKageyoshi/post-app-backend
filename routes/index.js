import Router from 'express';
import userRouter from './userRouter.js';
import uploadsRouter from './uploadsRouter.js'

const router = Router();

router.use('/auth', userRouter);
router.use('/uploads', uploadsRouter);

export default router;