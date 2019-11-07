import Router from 'koa-router';
import {getUser,signIn,signUp} from '../controllers/user.js';
import {getNews,getNewsById} from '../controllers/news';
import {getComment,getCommentById,getCommentByArticleId} from '../controllers/comment';
const router = new Router({ prefix: '/api' });

router.get('/user', getUser);
router.post('/signin', signIn);
router.post('/signup', signUp);

router.get('/news', getNews);
router.get('/news/:id', getNewsById);

//
router.get('/comment/article/:id', getCommentByArticleId);
export default router;
