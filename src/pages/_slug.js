import React from 'react';
import { compose } from 'redux';

// api
import apiGetPage from '../api/pages/getPage';

// hoc
import withPageInit from '../hoc/withPageInit';

// layout
import withDefaultLayout from '../page-layouts/withDefaultLayout';

//
class PageComponent extends React.Component {
	static async GetInitialProps({ routeParams }) {
		const {
			params: { slug },
		} = routeParams;

		const pageData = await apiGetPage(slug);
		console.log(pageData);

		return {
			...pageData,
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
)(PageComponent);
