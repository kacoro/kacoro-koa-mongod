import reduxTypes from './types';
import request from '@app/common/request';
import Toast from '@app/UI/Toast'
export async function handlePost (payload){
    payload.url ='/api/' + payload.url
    try{
        var res = await request.config({ type: 'post',...payload})
        Toast.success(res.msg)
        return res
    }catch(err){
        Toast.err("登陆超时，无权限访问！")
        if(err.response.status==401){
          this.props.dispatch({
               type: reduxTypes.USER_LOGOUT
          });
          return null
        }
    }
}
export async function handlePut (payload){
    try{
        payload.url ='/api/' + payload.url
        var res = await request.config({ type: 'put',...payload})
        Toast.success(res.msg)
        return res
    }catch(err){
        var status = err.response.status
        if(status==401){
          Toast.err("登陆超时，无权限访问！")
          this.props.dispatch({
               type: reduxTypes.USER_LOGOUT
          });
          return null
        }
    }
}
export async function handleGet (payload){
    try{
        payload.url ='/api/' + payload.url
        var res = await request.config({type: 'get',...payload})
        return res
    }catch(err){
        var status = err.response.status
        if(status==401){
            Toast.err("登陆超时，无权限访问！")
            try{
                this.props.dispatch({
                    type: reduxTypes.USER_LOGOUT
               });
            }catch(err){

            }
          return null
        }
    }
}

