import chai from 'chai';

import * as PostListActions from '../actions/posts/postList.actions';
import { fakePostPreviews } from '../../utils/fakeDataHelpers';
import cacheMiddleware from './cache.middleware';

describe('cache middleware', () => {
	const doDispatch = () => {};
	const doGetState = () => {};
	const nextHandler = cacheMiddleware({
		dispatch: doDispatch,
		getState: doGetState,
	});

	test('should load cache', () => {
		const actionHandler = nextHandler(action => {});

		const posts = fakePostPreviews();
		actionHandler(PostListActions.getPostsSuccess(posts));
		const { payload } = actionHandler(PostListActions.getPostsRequest());

		//
		chai.assert.equal(posts, payload);
	});
});
