import { combineReducers } from 'redux';
import list from './postList.reducer';

const posts = combineReducers({
	list,
});

export default posts;
