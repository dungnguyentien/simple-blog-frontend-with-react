import React from 'react';
import NProgress from 'nprogress';

// api
import apiGetCategory from '../../api/categories/getCategory';

// redux
import * as PostListActions from '../../store/actions/posts/postList.actions';
import store from '../../store';

// components
import PostListing from '../../modules/PostListing/PostListing';

// hoc
import withPageInit from '../../hoc/withPageInit';

//
class PageCategory extends React.Component {
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
		const { title, slug, postPageCount } = this.props.pageData;
		return (
			<div className="container">
				<main>
					<h1>{title}</h1>
					<PostListing pageCount={postPageCount} paginationPrefix={`/category/${slug}/page`} category={slug} />
				</main>
			</div>
		);
	}
}

export default withPageInit(PageCategory);
