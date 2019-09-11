import React from 'react';
import { compose } from 'redux';

// api
import apiGetFrontPage from '../api/pages/getFrontPage';

// redux
import * as PostListActions from '../store/actions/posts/postList.actions';
import store from '../store';

// components
import PostListing from '../modules/PostListing/PostListing';

// hoc
import withPageInit from '../hoc/withPageInit';

// layout
import withDefaultLayout from '../page-layouts/withDefaultLayout';

//
class Home extends React.Component {
	static async GetInitialProps({ req, res, routeParams }) {
		const { posts, ...pageData } = await apiGetFrontPage({ routeParams });

		//
		store.dispatch(PostListActions.getPostsSuccess(posts));

		//
		return {
			...pageData,
		};
	}

	render() {
		const { title, postPageCount } = this.props.pageData;
		return (
			<div className="container">
				<main>
					<h1>{title}</h1>
					<PostListing pageCount={postPageCount} paginationPrefix="/page" />
				</main>
			</div>
		);
	}
}

//
export default compose(
	withPageInit,
	withDefaultLayout,
)(Home);
