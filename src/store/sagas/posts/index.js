import { all } from 'redux-saga/effects';
import postListSaga from './postList.saga';

export default function* postsSaga() {
	yield all([postListSaga()]);
}
