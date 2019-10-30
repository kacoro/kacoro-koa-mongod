import Router from 'koa-router';
import {getUser} from '../controllers/user.js';

const router = new Router({ prefix: '/api' });

 router.get('/user', getUser);
export default router;
