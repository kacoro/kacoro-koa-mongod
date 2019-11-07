import Router from 'koa-router';
import {getUser,signIn,signUp} from '../controllers/user.js';
import {getNews,getNewsById} from '../controllers/news';
import {getComment,getCommentById,getCommentByArticleId} from '../controllers/comment';
import passport from '../module/passport'
const router = new Router({ prefix: '/api' });

router.get('/user', getUser);
router.post('/signin',async (ctx)=> {
    return passport.authenticate('local',
      function(err, user, msg, status) {
        if(user){
            console.log(user)
            let {password,...data} = user._doc
            ctx.body = {data:data, msg,status}
            return ctx.login(user)
        }else{
            ctx.body = {data:null, msg, status}
        }
      })(ctx)
  })
router.post('/signup', signUp);

router.get('/news', getNews);
router.get('/news/:id', getNewsById);

//
router.get('/comment/article/:id', getCommentByArticleId);
export default router;
