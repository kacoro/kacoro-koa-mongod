

import reduxTypes from './types';
import request from '@app/common/request';
// export default handleGet (data) {
//     return dispatch => {
//         axios.get(list).then()
//     }
// }
export async function handlePost (payload){
    var res = await request.config({ type: 'post',...payload})
    console.log(res)
    // this.props.dispatch({
    //     type: reduxTypes.USER_LOGOUT
    // });
}
