import {
    createStore,
    combineReducers,
    compose,
    applyMiddleware
} from 'redux'
import thunk from 'redux-thunk';

import userReducer from './reducers/user';
import messageReducer from './reducers/message';
import productReducer from './reducers/product';

const reducers = combineReducers({
    user: userReducer,
    message: messageReducer,
    product: productReducer
});

const storeConfig = () =>{
    return createStore(reducers, compose(applyMiddleware(thunk)));
}

export default storeConfig;