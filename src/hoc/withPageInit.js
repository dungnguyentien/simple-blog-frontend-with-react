import React from 'react';

import Page404 from '../pages/404';

function withPageInit(PageComponent) {
	class WithPageInit extends React.Component {
		constructor(props) {
			super(props);
		}

		static async GetInitialProps(context) {
			return PageComponent.GetInitialProps(context)
				.then(data => data)
				.catch(error => {
					console.log(error);
					Page404.GetInitialProps(context);
				})
				.then(data => {
					if (typeof window !== 'undefined') {
						const {
							title: { rendered: title },
							seo: { title: seoTitle } = {},
						} = data;
						document.title = seoTitle || title;
					}
					return data;
				});
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
