import { takeLatest, put, call } from 'redux-saga/effects';
import * as Actions from '../../actions/posts/postList.actions';
import apiGetPosts from '../../../api/posts/getPosts';

function* getPosts(action) {
	try {
		const { posts } = yield call(apiGetPosts, action.payload);
		yield put(Actions.getPostsSuccess(posts));
	} catch (error) {
		yield put(Actions.getPostsFailure(error));
	}
}

export default function* postListWatcher() {
	yield takeLatest(Actions.GET_POSTS_REQUEST, getPosts);
}
