import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';
import {persistStore, persistCombineReducers} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
const config = {
    key: 'root',
    storage,
};

export default function configureStore(){
    let reducer = persistCombineReducers(config, rootReducer);
    let store = createStore(reducer, compose(applyMiddleware(thunk)));
    let persistor = persistStore(store);
    return { persistor, store }
}
// export default createStore(rootReducer, compose(applyMiddleware(thunk)));
