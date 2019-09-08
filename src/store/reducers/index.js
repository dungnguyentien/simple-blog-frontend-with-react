import { combineReducers } from 'redux';
import posts from './posts';

const createReducer = asyncReducers =>
	combineReducers({
		posts,
		...asyncReducers,
	});

export default createReducer;
