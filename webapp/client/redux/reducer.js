import { combineReducers } from 'redux';
import types from './types';
import request from '@app/common/request';
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
            return action.payload;
        case types.USER_LOGOUT:
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
