import Router from 'koa-router';
import News,{getNews,getNewsById,putNewsById} from '../controllers/news';
import NewsCate from '../controllers/newscate';
import Upload from '../controllers/upload';
import User from '../controllers/user.js';
import Comment from '../controllers/comment';
import passport from '../module/passport'

const router = new Router({ prefix: '/admin' });
router.use('*',passport.authenticate('jwt', { session: false }))
router.get('/news', getNews);
router.get('/news/:id',getNewsById);

router.post('/news',News.post);
router.put('/news/:id',putNewsById);
router.delete('/news/:id',News.remove);
router.delete('/news',News.remove);

// newscate
router.get('/newscate',NewsCate.get);
router.get('/newscate/:id',NewsCate.getById);
router.post('/newscate',NewsCate.post);
router.put('/newscate/:id',NewsCate.put);
router.delete('/newscate/:id',NewsCate.remove);

// users
router.get('/user',User.get);
router.get('/user/:id',User.getById);
router.post('/user',User.post);
router.put('/user/:id',User.put);
router.delete('/user/:id',User.remove);

// comment
router.get('/comment',Comment.get);
router.get('/comment/:id',Comment.getById);
router.post('/comment',Comment.post);
router.put('/comment/:id',Comment.put);
router.delete('/comment/:id',Comment.remove);

//upload
router.post('/upload',Upload.single);
router.post('/upload/multiple',Upload.multiple);

export default router.routes();
