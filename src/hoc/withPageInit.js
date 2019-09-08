import React from 'react';
import NProgress from 'nprogress';

import Page404 from '../pages/404';

function withPageInit(PageComponent) {
	class WithPageInit extends React.Component {
		constructor(props) {
			super(props);

			this.state = {
				pageData: {},
			};
		}

		static async GetInitialProps(context) {
			const { res } = context;
			try {
				const data = await PageComponent.GetInitialProps(context);
				return {
					...data,
				};
			} catch (error) {
				// server-side
				if (typeof window === 'undefined') {
					res.statusCode = 404;
				}
				return {
					...Page404.GetInitialProps(context),
					is404: true,
				};
			}
		}

		static getDerivedStateFromProps(props, state) {
			if (typeof window !== 'undefined' && window.isNotFirstAccessingSite) {
				NProgress.start();
			}
			return props;
		}

		// client-side - load data after the component is mounted
		componentDidMount() {
			// do not load data on client-side on first accessing the site
			if (!window.isNotFirstAccessingSite) {
				window.isNotFirstAccessingSite = true;
				return;
			}

			const { match: routeParams } = this.props;
			WithPageInit.GetInitialProps({ routeParams }).then(pageData => {
				this.setState({ pageData });
				NProgress.done();
			});
		}

		render() {
			const { is404 } = this.props;
			const {
				pageData: { is404: is404State },
			} = this.state;

			if (is404State || is404) {
				return <Page404 {...this.props} {...this.state.pageData} />;
			}
			return <PageComponent {...this.props} {...this.state.pageData} />;
		}
	}

	//
	return WithPageInit;
}

export default withPageInit;
