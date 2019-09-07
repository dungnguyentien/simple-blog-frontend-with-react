import React from 'react';
import { matchPath } from 'react-router';

// api
import apiGetFrontPage from '../api/page/getFrontPage';

// hoc
import withPostListing from '../hoc/withPostListing';

// components
import PostListing from '../components/PostListing/PostListing';

//
class Home extends React.Component {
	static async GetInitialProps({ req, res, routeParams }) {
		const pageData = await apiGetFrontPage({ routeParams });

		//
		return {
			...pageData,
		};
	}

	render() {
		const { title, currentPage, postPageCount, posts, loadingPosts } = this.props;
		return (
			<div className="container">
				<h1>{title}</h1>
				<PostListing currentPage={currentPage} pageCount={postPageCount} loadingPosts={loadingPosts} paginationPrefix="/page" posts={posts} />
			</div>
		);
	}
}

//
export default withPostListing(Home);
