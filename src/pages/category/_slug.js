import React from 'react';
import { compose } from 'redux';

// api
import apiGetCategory from '../../api/categories/getCategory';

// redux
import * as PostListActions from '../../store/actions/posts/postList.actions';
import store from '../../store';

// components
import PostListing from '../../modules/PostListing/PostListing';

// hoc
import withPageInit from '../../hoc/withPageInit';
import withDefaultLayout from '../../page-layouts/withDefaultLayout';

//
class CategoryPage extends React.Component {
	// constructor(props) {
	// 	super(props);

	// 	// client-side - empty post on constructor if not first time accessing site
	// 	if (typeof window !== 'undefined' && !window.isFirstTimeAccessingSite) {
	// 		store.dispatch(PostListActions.emptyPosts());
	// 	}
	// }

	static async GetInitialProps({ req, res, routeParams }) {
		const { params: { slug } = {} } = routeParams;

		const { posts, ...pageData } = await apiGetCategory({ slug });

		//
		store.dispatch(PostListActions.getPostsSuccess(posts));

		//
		return {
			slug,
			...pageData,
		};
	}

	render() {
		const { slug: category, postPageCount } = this.props.pageData;
		return (
			<React.Fragment>
				<PostListing pageCount={postPageCount} paginationPrefix={`/category/${slug}/page`} queryArgs={{ category: slug }} />
			</React.Fragment>
		);
	}
}

export default compose(
	withPageInit,
	withDefaultLayout,
)(CategoryPage);
