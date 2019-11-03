import Router from 'koa-router';
import {getUser,signIn,signUp} from '../controllers/user.js';
import {getNews,getNewsById} from '../controllers/news';
const router = new Router({ prefix: '/api' });

router.get('/user', getUser);
router.post('/signin', signIn);
router.post('/signup', signUp);

router.get('/news', getNews);
router.get('/news:id', getNewsById);
export default router;
