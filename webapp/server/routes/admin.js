import Router from 'koa-router';
import News,{getNews,getNewsById,putNewsById} from '../controllers/news';
import NewsCate from '../controllers/newscate';
import Upload from '../controllers/Upload';
import {getUser,signIn,signUp} from '../controllers/user.js';
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

//
router.post('/upload',Upload.single);
router.post('/upload/multiple',Upload.multiple);

export default router.routes();
