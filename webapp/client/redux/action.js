

import reduxTypes from './types';
import request from '@app/common/request';

export async function handlePost (payload){
    try{
        var res = await request.config({ type: 'post',...payload})
        return res
    }catch(err){
        var status = err.response.status
        if(status==401){
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
        return res
    }catch(err){
        console.log(err)
        // var status = err.response.status
        // if(status==401){
        //   this.props.dispatch({
        //        type: reduxTypes.USER_LOGOUT
        //   });
        //   return null
        // }
    }
}
export async function handleGet (payload){
    try{
        payload.url ='/api/' + payload.url
        var res = await request.config({type: 'get',...payload})
        return res
    }catch(err){
        console.log(err)
        var status = err.response.status
        if(status==401){
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

