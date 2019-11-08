

import reduxTypes from './types';
import request from '@app/common/request';

// export default handleGet (data) {
//     return dispatch => {
//         axios.get(list).then()
//     }
// }


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
