import React from 'react';
import { compose } from 'redux';
// import Loadable from 'react-loadable';

// api
import apiGetFrontPage from '../api/pages/getFrontPage';

// redux
import * as PostListActions from '../store/actions/posts/postList.actions';
import store from '../store';

// components
import PostListing from '../modules/PostListing/PostListing';
// import Loader from '../components/common/Loader';

// hoc
import withPageInit from '../hoc/withPageInit';

// layout
import withDefaultLayout from '../page-layouts/withDefaultLayout';

// const LoadablePostListing = Loadable({
// 	loader: () => import('../modules/PostListing/PostListing'),
// 	loading: Loader,
// });

//
class Home extends React.Component {
	static async GetInitialProps({ req, res, routeParams }) {
		// extract query params
		const { params: { page = 1 } = {} } = routeParams || {};

		// call api
		const { posts, ...pageData } = await apiGetFrontPage({ page });

		// update posts state
		store.dispatch(PostListActions.getPostsSuccess(posts));

		//
		return {
			...pageData,
		};
	}

	render() {
		const { postPageCount } = this.props.pageData;
		return (
			<div className="container">
				<PostListing pageCount={postPageCount} paginationPrefix="/page" />
			</div>
		);
	}
}

//
export default compose(
	withPageInit,
	withDefaultLayout,
)(Home);
