import Router from 'koa-router';
import {getUser,signIn,signUp} from '../controllers/user.js';
import {getNews,getNewsById} from '../controllers/news';
import {getComment,getCommentById,getCommentByArticleId,addCommentByArticleId} from '../controllers/comment';
import passport from '../module/passport'
const router = new Router({ prefix: '/api' });
import auth from '../middlewares/auth'
import adminRouter from './admin'
router.get('/user', getUser);
router.post('/signin',signIn)

router.post('/signup',passport.authenticate('jwt', { session: false }),async (ctx)=> {
    console.log(ctx.state.user)
})

router.post('/comment/article/:id',passport.authenticate('jwt', { session: false }),addCommentByArticleId)

router.get('/news', auth,getNews);
router.get('/news/:id',auth, getNewsById);

router.get('/comment/article/:id', getCommentByArticleId);

router.use(adminRouter)
export default router;
