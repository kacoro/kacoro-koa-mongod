import Router from 'koa-router';
import {getUserInfo,list} from '../controllers/user.js';

const router = new Router({ prefix: '/api' });

 router.get('/user/', getUserInfo);
 router.get('/user/list', getUserInfo);
export default router;
