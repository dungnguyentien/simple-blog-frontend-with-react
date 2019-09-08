import React from 'react';
import { matchPath } from 'react-router';

// api
import apiGetFrontPage from '../api/page/getFrontPage';

// hoc
// import withPostListing from '../hoc/withPostListing';

// components
import PostListing from '../modules/PostListing/PostListing';

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
		const { title, postPageCount, posts } = this.props;
		return (
			<div className="container">
				<h1>{title}</h1>
				<PostListing pageCount={postPageCount} paginationPrefix="/page" posts={posts} />
			</div>
		);
	}
}

//
export default Home;
