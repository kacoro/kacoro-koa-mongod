import Router from 'koa-router';

const router = new Router({ prefix: '/api' });
import clientRouter from './client'
import adminRouter from './admin'
router.use(clientRouter)
router.use(adminRouter)
export default router;
