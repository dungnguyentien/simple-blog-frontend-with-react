import React from 'react';
import { withRouter, matchPath } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import NProgress from 'nprogress';

// redux
import * as postListActions from '../../store/actions/posts/postList.actions';

// components
import PostPreview from '../../components/common/PostPreview';
import Pagination from '../../components/common/Pagination';

// routes
import routes from '../../config/routes';

// utils
import { progressStart, progressDone } from '../../utils/nprogressHandler';

function isTheSameRoute(route, match) {
	// single route
	if (typeof route.path === 'string' && route.path === match.path) {
		// console.log('is the same route');
		return true;
	}

	// multiple route
	if (typeof route.path === 'object' && route.path.includes(match.path)) {
		// console.log('is the same route');
		return true;
	}

	//
	// console.log('not the same route');
	return false;
}

//
function PostListing({ pageCount, posts, paginationPrefix, match, loadPosts, queryArgs }) {
	// console.log(match);
	let { params: { page = 1 } = {} } = match;

	// current page state
	const [currentPage, updateCurrentPage] = React.useState(parseInt(page));

	// find current page on client-side
	if (typeof window !== 'undefined') {
		routes.find(route => {
			const routeParams = matchPath(window.location.pathname, route);

			if (routeParams) {
				// console.log(route, match);
				// console.log(routeParams);
				if (isTheSameRoute(route, match)) {
					const { params: { page: newPage = 1 } = {} } = routeParams;
					page = newPage;
				} else {
					page = currentPage; // do not load new posts
				}
			}
			return routeParams;
		});
	}

	// convert page to integer
	page = parseInt(page);

	// listen to page change
	React.useEffect(() => {
		if (currentPage !== parseInt(page)) {
			updateCurrentPage(parseInt(page));

			// NProgress.start();
			progressStart();

			loadPosts({
				queryArgs,
				page,
			});
		}
	}, [page]);

	return (
		<React.Fragment>
			{posts && posts.map(post => <PostPreview key={post.id} {...post} />)}

			{pageCount > 1 && <Pagination currentPage={currentPage} pageCount={pageCount} paginationPrefix={paginationPrefix} />}

			{/* {isLoading && <div>loading...</div>} */}
		</React.Fragment>
	);
}

const mapStateToProps = state => {
	const {
		list: { data: posts, isLoading },
	} = state.posts;

	if (!isLoading) {
		// NProgress.done();
		progressDone();
	}

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
