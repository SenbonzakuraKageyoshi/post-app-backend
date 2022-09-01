import Router from 'express';
import userRouter from './userRouter.js';
import uploadsRouter from './uploadsRouter.js'
import postRouter from './postRouter.js';
import usersRouter from './usersRouter.js'

const router = Router();

router.use('/auth', userRouter);
router.use('/uploads', uploadsRouter);
router.use('/posts', postRouter);
router.use('/users', usersRouter);

export default router;