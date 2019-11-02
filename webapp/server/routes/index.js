import Router from 'koa-router';
import {getUser,signIn,signUp} from '../controllers/user.js';

const router = new Router({ prefix: '/api' });

router.get('/user', getUser);
router.post('/signin', signIn);
router.post('/signup', signUp);
export default router;
