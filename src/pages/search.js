import React from 'react';
import { compose } from 'redux';

// api
import apiSearchPosts from '../api/posts/getPosts';

// redux
import * as PostListActions from '../store/actions/posts/postList.actions';
import store from '../store';

// components
import PostListing from '../modules/PostListing/PostListing';
import SearchBox from '../components/Header/SearchBox';

// hoc
import withPageInit from '../hoc/withPageInit';

// layout
import withDefaultLayout from '../page-layouts/withDefaultLayout';

//
class SearchPage extends React.Component {
	static async GetInitialProps({ req, res, routeParams }) {
		// extract query params
		const { params: { page = 1, slug: search = '' } = {} } = routeParams || {};

		// call api
		const { posts, ...pageData } = await apiSearchPosts({ queryArgs: { page, search } });
		// console.log(posts, pageData);

		// update posts state
		store.dispatch(PostListActions.getPostsSuccess(posts));

		//
		return {
			search,
			...pageData,
			title: {
				rendered: `Search Results for: ${search}`,
			},
		};
	}

	render() {
		const { postPageCount, search } = this.props.pageData;
		return (
			<React.Fragment>
				{postPageCount < 1 && (
					<React.Fragment>
						<h2>Nothing Found</h2>
						<p>Sorry, but nothing matched your search terms. Please try again with some different keywords.</p>
						<SearchBox />
					</React.Fragment>
				)}
				{postPageCount > 0 && <PostListing pageCount={postPageCount} paginationPrefix={`/search/${search}/page`} queryArgs={{ search }} />}
			</React.Fragment>
		);
	}
}

//
export default compose(
	withPageInit,
	withDefaultLayout,
)(SearchPage);
