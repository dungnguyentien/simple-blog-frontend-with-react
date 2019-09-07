import React from 'react';
import { withRouter } from 'react-router';

// components
import PostPreview from '../common/PostPreview';
import Pagination from '../common/Pagination';

//
function PostListing({ currentPage, pageCount, posts, paginationPrefix, loadingPosts }) {
	return (
		<React.Fragment>
			{posts && posts.map(post => <PostPreview key={post.id} {...post} />)}
			<Pagination currentPage={currentPage} pageCount={pageCount} paginationPrefix={paginationPrefix} />
			{loadingPosts && <div>loading...</div>}
		</React.Fragment>
	);
}

//
export default PostListing;
