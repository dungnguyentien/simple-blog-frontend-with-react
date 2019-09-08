import * as reduxModule from 'redux';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import loggerMiddleware from 'redux-logger';

import rootSaga from './sagas';
import createReducer from './reducers';

// middleware
import cacheMiddleware from './middleware/cache.middleware';

/*
Fix for Firefox redux dev tools extension
https://github.com/zalmoxisus/redux-devtools-instrument/pull/19#issuecomment-400637274
 */
reduxModule.__DO_NOT_USE__ActionTypes.REPLACE = '@@redux/INIT';

const composeEnhancers =
	process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
				// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
		  })
		: compose;

const sagaMiddleware = createSagaMiddleware();

// middleware
const middleware = [];

// logger
if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
	middleware.push(loggerMiddleware);
}

middleware.push(cacheMiddleware);
middleware.push(sagaMiddleware);

//
const enhancer = composeEnhancers(applyMiddleware(...middleware));

const initialState = typeof window !== 'undefined' ? window.__INITIAL_STATE__ : {};
const store = createStore(createReducer(), initialState, enhancer);

store.asyncReducers = {};

export const injectReducer = (key, reducer) => {
	// if (store.asyncReducers[key]) {
	// 	return;
	// }
	store.asyncReducers[key] = reducer;
	store.replaceReducer(createReducer(store.asyncReducers));
	return store;
};

sagaMiddleware.run(rootSaga);

export default store;
