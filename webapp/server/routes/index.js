import Router from 'koa-router';
import {getUser,signIn,signUp} from '../controllers/user.js';
import {getNews,getNewsById} from '../controllers/news';
import {getComment,getCommentById,getCommentByArticleId} from '../controllers/comment';
const passport=require('koa-passport');
const router = new Router({ prefix: '/api' });
const jwt = require('jsonwebtoken');
router.get('/user', getUser);
router.post('/signin',signIn)
// router.post('/signin',async (ctx)=> {
//     return passport.authenticate('local',
//       function(err, user, msg, status) {
//         if(user){
//             console.log(user)
//             let {password,...data} = user._doc
//             ctx.body = {data:data, msg,status}
//             return ctx.login(user)
//         }else{
//             ctx.body = {data:null, msg, status}
//         }
//       })(ctx)
//   })
router.post('/signup',passport.authenticate('jwt', { session: false }),signUp)

router.post('/comment',passport.authenticate('jwt', { session: false }),async (ctx)=> {
    console.log(ctx.state.user)
})

router.get('/news', getNews);
router.get('/news/:id', getNewsById);



router.get('/comment/article/:id', getCommentByArticleId);
export default router;
