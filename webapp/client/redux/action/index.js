import reduxTypes from '../types';
import request from '@app/common/request';
// import Toast from '@app/UI/Toast/noSSR'
// import Toast from '@app/UI/Toast'
const handlePost = async function(payload) {
    console.log(this)
    payload.url ='/api/' + payload.url
    try{
        var res = await request.config({ type: 'post',...payload})
        alert(res.msg)
        // Toast.success(res.msg)
        return res
    }catch(err){
        alert(err.response.data)
        // Toast.error(err.response.data)
        if(err.response.status==401){
            console.log(this)
          this.props.dispatch({
               type: reduxTypes.USER_LOGOUT
          });
          return null
        }
    }
}

const handleDelete  = async function(payload) {
    try{
        payload.url ='/api/' + payload.url
        var res = await request.config({ type: 'delete',...payload})
        // Toast.success(res.msg)
        return res
    }catch(err){
        var status = err.response.status
        if(status==401){
          await Toast.error("登陆超时，无权限访问！")
          await this.props.dispatch({
               type: reduxTypes.USER_LOGOUT
          });
          return null
        }
    }
}
const handlePut = async function(payload){
    try{
        payload.url ='/api/' + payload.url
        var res = await request.config({ type: 'put',...payload})
        // Toast.success(res.msg)
        return res
    }catch(err){
        var status = err.response.status
        if(status==401){
          Toast.error("登陆超时，无权限访问！")
          await this.props.dispatch({
               type: reduxTypes.USER_LOGOUT
          });
          return null
        }
    }
}
const handleGet = async function(payload){
    try{
        payload.url ='/api/' + payload.url
        var res = await request.config({type: 'get',...payload})
        return res
    }catch(err){
        var status = err.response.status
        if(status==401){
            // Toast.error("登陆超时，无权限访问！")
            try{
                await this.props.dispatch({
                    type: reduxTypes.USER_LOGOUT
               });
            }catch(err){

            }
          return null
        }
    }
}

export default {
    get:handleGet,
    put:handlePut,
    delete:handleDelete,
    post:handlePost
}

