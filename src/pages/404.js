import React from 'react';

import withDefaultLayout from '../page-layouts/withDefaultLayout';

class Page404 extends React.Component {
	static async GetInitialProps({ req, res }) {
		return new Promise((resolve, reject) => {
			// server-side
			if (typeof window === 'undefined') {
				res.statusCode = 404;
			}

			resolve({
				is404: true,
				title: {
					rendered: '404 - Page not found',
				},
				seo: {
					title: '404 - Page not found',
					description: '',
				},
			});
		});
	}

	render() {
		return (
			<React.Fragment>
				<div>404 - page not found</div>
			</React.Fragment>
		);
	}
}

//
export default withDefaultLayout(Page404);
