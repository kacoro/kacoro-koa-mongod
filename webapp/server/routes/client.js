import Router from 'koa-router';
import {getUser,signIn,signUp} from '../controllers/user.js';
import {getNews,getNewsById} from '../controllers/news';
import {getCommentByArticleId,addCommentByArticleId} from '../controllers/comment';
import passport from '../module/passport'
const router = new Router();
import auth from '../middlewares/auth'
router.get('/user', getUser);
router.post('/signin',signIn)

router.post('/signup',passport.authenticate('jwt', { session: false }),async (ctx)=> {
    console.log(ctx.state.user)
})

router.post('/comment/article/:id',passport.authenticate('jwt', { session: false }),addCommentByArticleId)
router.get('/news', auth,getNews);
router.get('/news/:id',auth, getNewsById);
router.get('/comment/article/:id', getCommentByArticleId);

export default router.routes();
