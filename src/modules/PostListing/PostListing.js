import React from 'react';
import { withRouter } from 'react-router';

// api
import apiGetPosts from '../../api/posts/getPosts';

// components
import PostPreview from '../../components/common/PostPreview';
import Pagination from '../../components/common/Pagination';

//
function PostListing({ pageCount, posts: initialPosts, paginationPrefix, match }) {
	const { params: { page = 1 } = {} } = match;

	//
	const [currentPage, updateCurrentPage] = React.useState(parseInt(page));
	const [posts, updatePosts] = React.useState(initialPosts);
	const [isLoading, setLoadingStatus] = React.useState(false);
	const [error, setError] = React.useState(null);

	//
	React.useEffect(() => {
		if (currentPage == parseInt(page)) {
			return;
		}

		// console.log({ page });
		new Promise(async (resolve, reject) => {
			// start loading posts
			setLoadingStatus(true);

			const { success, message, posts: newPosts } = await apiGetPosts({
				currentPage,
			});

			// success
			if (success) {
				updateCurrentPage(parseInt(page));
				updatePosts(newPosts);
			}
			// failure
			else {
				setError(message);
			}

			// end loading posts
			setLoadingStatus(false);
		});
	}, [page]);

	return (
		<React.Fragment>
			{posts && posts.map(post => <PostPreview key={post.id} {...post} />)}
			<Pagination currentPage={currentPage} pageCount={pageCount} paginationPrefix={paginationPrefix} />
			{isLoading && <div>loading...</div>}
		</React.Fragment>
	);
}

//
export default withRouter(PostListing);
