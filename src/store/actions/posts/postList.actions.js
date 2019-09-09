export const GET_POSTS_REQUEST = 'POSTS/GET_POSTS_REQUEST';
export const GET_POSTS_SUCCESS = 'POSTS/GET_POSTS_SUCCESS';
export const GET_POSTS_FAILURE = 'POSTS/GET_POSTS_FAILURE';
export const EMPTY_POSTS = 'POSTS/EMPTY_POSTS';

export const getPostsRequest = (data, useCache = getPostsSuccess) => ({
	type: GET_POSTS_REQUEST,
	payload: data,
	useCache,
	cacheKey: 'postList',
});

export const getPostsSuccess = (data, saveCache = true) => ({
	type: GET_POSTS_SUCCESS,
	payload: data,
	saveCache,
	cacheKey: 'postList',
});

export const getPostsFailure = data => ({
	type: GET_POSTS_FAILURE,
	payload: data,
});

export const emptyPosts = () => ({
	type: EMPTY_POSTS,
});
