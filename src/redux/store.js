import {createStore,applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
/*this is something that is nice for us to use
when debugging our redux code*/
import {persistStore} from 'redux-persist';
/*allows our browser to actually cache our store*/

import rootReducer from './root-reducer';

const middlewares = [thunk];

if(process.env.NODE_ENV === 'development'){
  middlewares.push(logger);
}/*we just want logger in development not in production or test*/

export const store = createStore(rootReducer,applyMiddleware(...middlewares));
/*applyMiddleware(...middlewares) for know the prev state,action,next state*/
export const persistor = persistStore(store);