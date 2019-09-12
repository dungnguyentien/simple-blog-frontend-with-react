import React from 'react';

import Page404 from '../pages/404';

function withPageInit(PageComponent) {
	class WithPageInit extends React.Component {
		constructor(props) {
			super(props);
		}

		static async GetInitialProps(context) {
			let data;
			try {
				data = await PageComponent.GetInitialProps(context);
			} catch (error) {
				data = Page404.GetInitialProps(context);
			} finally {
				if (typeof window !== 'undefined') {
					const { title, seo: { title: seoTitle } = {} } = data;
					document.title = seoTitle || title;
				}
				return data;
			}
		}

		render() {
			const { pageData } = this.props;
			const { is404 = false } = pageData;

			// is 404
			if (is404) {
				return <Page404 {...this.props} pageData={pageData} />;
			}

			// page component
			return <PageComponent {...this.props} pageData={pageData} />;
		}
	}

	//
	return WithPageInit;
}

export default withPageInit;
