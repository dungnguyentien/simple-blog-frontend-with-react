import React from 'react';
import { matchPath } from 'react-router';

// api
import apiGetFrontPage from '../api/pages/getFrontPage';

// redux
import * as PostListActions from '../store/actions/posts/postList.actions';

// components
import PostListing from '../modules/PostListing/PostListing';

//
class Home extends React.Component {
	static async GetInitialProps({ req, res, routeParams, store }) {
		const { posts, ...pageData } = await apiGetFrontPage({ routeParams });

		//
		store.dispatch(PostListActions.getPostsSuccess(posts));

		//
		return {
			...pageData,
		};
	}

	render() {
		const { title, postPageCount } = this.props;
		return (
			<div className="container">
				<h1>{title}</h1>
				<PostListing pageCount={postPageCount} paginationPrefix="/page" />
			</div>
		);
	}
}

//
export default Home;
