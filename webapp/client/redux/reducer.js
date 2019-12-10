import { combineReducers } from 'redux';
import types from './types';
import request from '@app/common/request';
import Cookie from 'js-cookie'
function count(state = 0, action) {
    switch (action.type) {
        case types.ADD_COUNTER:
            return state + 1;
        case types.DEL_COUNTER:
            return state - 1;
        default:
            return state;
    }
}

function menu(state = false, action) {
    switch (action.type) {
        case types.CHANGE_MENU:
            return !state;
        default:
            return state;
    }
}

function user(state = null, action) {
    switch (action.type) {
        case types.USER_LOGIN:
            Cookie.set('token', action.payload.token)
            console.log('token')
            return action.payload;
        case types.USER_LOGOUT:
            Cookie.remove('token')
            return null;
        default:
        
            return state;
    }
}




// export default combineReducers({
//     count,menu
// });

export default {
    count, menu, user
};
