import Router from 'koa-router';
import {getNews,getNewsById,putNewsById} from '../controllers/news';
import {getUser,signIn,signUp} from '../controllers/user.js';
import passport from '../module/passport'

const router = new Router({ prefix: '/admin' });
router.use('*',passport.authenticate('jwt', { session: false }))
router.get('/news', getNews);
router.get('/news/:id',getNewsById);
router.put('/news/:id',putNewsById);

export default router.routes();
