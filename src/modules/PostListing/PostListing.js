import React from 'react';
import { withRouter, matchPath } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';

// api
import apiGetPosts from '../../api/posts/getPosts';

// redux
import * as postListActions from '../../store/actions/posts/postList.actions';

// components
import PostPreview from '../../components/common/PostPreview';
import Pagination from '../../components/common/Pagination';

// routes
import routes from '../../config/routes';

//
function PostListing({ pageCount, posts, isLoading, paginationPrefix, match, loadPosts, category }) {
	let { params: { page = 1 } = {} } = match;

	// find current page on client-side
	if (typeof window !== 'undefined') {
		routes.find(route => {
			const routeParams = matchPath(window.location.pathname, route);
			if (routeParams) {
				// console.log({ routeParams });
				const { params: { page: newPage = 1 } = {} } = routeParams;
				page = newPage;
			}
			return routeParams;
		});
	}

	const [currentPage, updateCurrentPage] = React.useState(parseInt(page));

	// listen to page change
	React.useEffect(() => {
		if (currentPage !== parseInt(page)) {
			loadPosts({
				page: currentPage,
				category,
			});
		}
	}, [page]);

	// listen to posts change
	React.useEffect(() => {
		updateCurrentPage(parseInt(page));
	}, [posts]);

	return (
		<React.Fragment>
			{posts && posts.map(post => <PostPreview key={post.id} {...post} />)}

			{pageCount > 1 && <Pagination currentPage={currentPage} pageCount={pageCount} paginationPrefix={paginationPrefix} />}

			{isLoading && <div>loading...</div>}
		</React.Fragment>
	);
}

const mapStateToProps = state => {
	const {
		list: { data: posts, isLoading },
	} = state.posts;

	return {
		posts,
		isLoading,
	};
};

const mapDispatchToProps = {
	loadPosts: postListActions.getPostsRequest,
};

export default compose(
	withRouter,
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
)(PostListing);
