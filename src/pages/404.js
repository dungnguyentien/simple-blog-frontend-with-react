import React from 'react';

import './404.scss';

class Page404 extends React.Component {
	static GetInitialProps({ req, res }) {
		// server-side
		if (typeof window === 'undefined') {
			res.statusCode = 404;
		}

		return {
			is404: true,
			title: {
				rendered: '404 - Page not found',
			},
			seo: {
				title: '404 - Page not found',
				description: '',
			},
		};
	}

	render() {
		return (
			<div className="container">
				<main>
					<h1>404 - page not found</h1>
				</main>
			</div>
		);
	}
}

//
export default Page404;
