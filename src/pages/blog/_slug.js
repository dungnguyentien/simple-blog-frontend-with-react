import React from 'react';
import { compose } from 'redux';

// api
import apiGetPost from '../../api/posts/getPost';

// hoc
import withPageInit from '../../hoc/withPageInit';

// layout
import withDefaultLayout from '../../page-layouts/withDefaultLayout';

//
class BlogPost extends React.Component {
	static async GetInitialProps({ req, res, routeParams }) {
		const {
			params: { slug },
		} = routeParams;

		const postData = await apiGetPost({ slug });

		return {
			...postData,
		};
	}

	render() {
		const {
			content: { rendered: content },
		} = this.props.pageData;
		return <div dangerouslySetInnerHTML={{ __html: content }} />;
	}
}

export default compose(
	withPageInit,
	withDefaultLayout,
)(BlogPost);
