import React from 'react';

// api
import apiGetPost from '../../api/posts/getPost';

// hoc
import withPageInit from '../../hoc/withPageInit';

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
		const { title, content } = this.props.pageData;
		return (
			<div className="container">
				<main>
					<article>
						<h1>{title}</h1>
						<div dangerouslySetInnerHTML={{ __html: content }} />
					</article>
				</main>
			</div>
		);
	}
}

export default withPageInit(BlogPost);
