import * as Actions from '../../actions/posts/postList.actions';

const initialState = {
	data: [],
	isLoading: false,
	error: null,
};

const postListReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_POSTS_REQUEST:
			return {
				...state,
				isLoading: true,
				error: null,
			};
		case Actions.GET_POSTS_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.payload,
			};
		case Actions.GET_POSTS_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default postListReducer;
