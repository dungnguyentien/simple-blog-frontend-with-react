import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

// api
import apiGetPosts from '../api/posts/getPosts';

//
function withPostListing(WrappedComponent) {
	//
	function WithPostListingComponent({ currentPage: initialCurrentPage, posts: intialPosts, ...rest }) {
		const {
			match: {
				params: { page = initialCurrentPage },
			},
		} = rest;

		//
		const [currentPage, updateCurrentPage] = React.useState(parseInt(initialCurrentPage));
		const [posts, updatePosts] = React.useState(intialPosts);
		const [loadingPosts, updateLoadingPostsStatus] = React.useState(false);
		const [error, updateError] = React.useState(null);

		//
		React.useEffect(() => {
			if (currentPage == parseInt(page)) {
				return;
			}

			// console.log({ page });
			new Promise(async (resolve, reject) => {
				// start loading posts
				updateLoadingPostsStatus(true);

				const { success, message, posts: newPosts } = await apiGetPosts({ currentPage });

				// success
				if (success) {
					updateCurrentPage(parseInt(page));
					updatePosts(newPosts);
				}
				// failure
				else {
					updateError(message);
				}

				// end loading posts
				updateLoadingPostsStatus(false);
			});
		}, [page]);

		//
		return <WrappedComponent currentPage={currentPage} loadingPostsError={error} loadingPosts={loadingPosts} posts={posts} {...rest} />;
	}

	// copy all WrappedComponent static functions
	hoistNonReactStatic(WithPostListingComponent, WrappedComponent);

	//
	return WithPostListingComponent;
}

//
export default withPostListing;
