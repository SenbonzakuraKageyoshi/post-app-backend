import Router from 'express';
import userRouter from './userRouter.js';
import uploadsRouter from './uploadsRouter.js'
import postRouter from './postRouter.js';

const router = Router();

router.use('/auth', userRouter);
router.use('/uploads', uploadsRouter);
router.use('/posts', postRouter);

export default router;